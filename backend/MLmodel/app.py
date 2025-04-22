from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open('salary_model.pkl', 'rb'))
edu_encoder = pickle.load(open('edu_encoder.pkl', 'rb'))
job_encoder = pickle.load(open('job_encoder.pkl', 'rb'))
loc_encoder = pickle.load(open('loc_encoder.pkl', 'rb'))
mlb = pickle.load(open('skill_encoder.pkl', 'rb'))

skill_weight = {
    'Python': 1.6,
    'Java': 1.5,
    'JavaScript': 1.4,
    'CSS': 1.0,
    'HTML': 1.0,
    'C++': 1.3,
    'Ruby': 1.2,
    'SQL': 1.3,
    'R': 1.4,
    'PHP': 1.1,
    'Swift': 1.3,
    'Go': 1.3,
    'Kotlin': 1.3,
    'TypeScript': 1.3,
    'Dart': 1.2,
}

def apply_skill_bonus(base_salary, skill_list):
    bonus = 0
    if len(skill_list) > 3:
        bonus += 40000
    if 'Python' in skill_list:
        bonus += 25000
    if 'Java' in skill_list:
        bonus += 20000
    return base_salary + bonus

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        experience = float(data.get('experience', 0))
        education = data.get('education', '').strip()
        location = data.get('location', '').strip()
        job_title = data.get('job_title', '').strip()
        skills_raw = data.get('skills', '')

        print(f"Experience: {experience}, Education: {education}, Location: {location}, Job Title: {job_title}, Skills: {skills_raw}")

        skills = [skill.strip() for skill in skills_raw.split(',') if skill.strip()]

        encoded_education = edu_encoder.transform([[education]])
        encoded_location = loc_encoder.transform([[location]])
        encoded_job_title = job_encoder.transform([[job_title]])
        encoded_skills = mlb.transform([skills])
        encoded_skills_weighted = encoded_skills * [skill_weight.get(skill, 1.0) for skill in mlb.classes_]

        features = np.hstack([
            [experience], 
            encoded_education.flatten(), 
            encoded_location.flatten(), 
            encoded_job_title.flatten(), 
            encoded_skills_weighted.flatten()
        ])

        base_salary = model.predict([features])[0]

        final_salary = apply_skill_bonus(base_salary, skills)

        return jsonify({'predicted_salary': round(final_salary, 2)})

    except Exception as e:
        error_message = f"Error during prediction: {str(e)}"
        print(error_message)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)

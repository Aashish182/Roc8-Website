from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load model and encoders
model = pickle.load(open('salary_model.pkl', 'rb'))
edu_encoder = pickle.load(open('edu_encoder.pkl', 'rb'))
job_encoder = pickle.load(open('job_encoder.pkl', 'rb'))
loc_encoder = pickle.load(open('loc_encoder.pkl', 'rb'))
mlb = pickle.load(open('skill_encoder.pkl', 'rb'))

# Define a skill weight map (example)
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

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data
        data = request.get_json()
        experience = float(data.get('experience', 0))
        education = data.get('education', '').strip()
        location = data.get('location', '').strip()
        job_title = data.get('job_title', '').strip()
        skills_raw = data.get('skills', '')

        # Log the incoming data
        print(f"Experience: {experience}, Education: {education}, Location: {location}, Job Title: {job_title}, Skills: {skills_raw}")

        # Convert skills from string to list (assuming comma-separated)
        skills = [skill.strip() for skill in skills_raw.split(',') if skill.strip()]

        # Encode features
        encoded_education = edu_encoder.transform([[education]])
        encoded_location = loc_encoder.transform([[location]])
        encoded_job_title = job_encoder.transform([[job_title]])
        encoded_skills = mlb.transform([skills])

        # Apply skill weight mapping to the skills data
        encoded_skills_weighted = encoded_skills * [skill_weight.get(skill, 1.0) for skill in mlb.classes_]

        # Combine all features into a single input
        features = np.hstack([
            [experience], 
            encoded_education.flatten(), 
            encoded_location.flatten(), 
            encoded_job_title.flatten(), 
            encoded_skills_weighted.flatten()
        ])

        # Predict salary
        prediction = model.predict([features])

        return jsonify({'predicted_salary': round(prediction[0], 2)})

    except Exception as e:
        error_message = f"Error during prediction: {str(e)}"
        print(error_message)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(debug=True)

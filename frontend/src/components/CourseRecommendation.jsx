import React, { useState } from 'react';

const CourseRecommendation = () => {
  // Set of values for select options
  const jobTitles = [
    'AI Engineer', 'Backend Developer', 'Data Scientist', 'DevOps Engineer', 
    'Frontend Developer', 'Full Stack Developer', 'Machine Learning Engineer', 'Mobile App Developer'
  ];
  
  const skills = [
    'aws', 'c++', 'css', 'deep learning', 'django', 'docker', 'flask', 'flutter', 'html', 'java', 'javascript', 
    'kubernetes', 'machine learning', 'mongodb', 'nlp', 'node.js', 'pandas', 'python', 'react', 'sql', 'swift', 'tensorflow'
  ];

  const platforms = [
    'Coursera', 'LinkedIn Learning', 'Pluralsight', 'Udemy', 'edX'
  ];

  const [selectedJobTitle, setSelectedJobTitle] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [error, setError] = useState('');

  const handleJobTitleChange = (e) => setSelectedJobTitle(e.target.value);
  const handleSkillsChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedSkills(value);
  };
  const handlePlatformChange = (e) => setSelectedPlatform(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      knownSkills: selectedSkills,
      jobTitle: selectedJobTitle,
      platform: selectedPlatform,
    };

    try {
      const response = await fetch('http://localhost:5000/recommend-courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
        setRecommendedCourses(result.courses);
        setError('');
      } else {
        setError(result.error || 'An error occurred while fetching courses.');
      }
    } catch (err) {
      setError('Error connecting to the server');
    }
  };

  return (
    <div className="container">
      <h2>Course Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Job Title:</label>
          <select value={selectedJobTitle} onChange={handleJobTitleChange} required>
            <option value="">Select Job Title</option>
            {jobTitles.map((title, index) => (
              <option key={index} value={title}>{title}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Known Skills:</label>
          <select multiple value={selectedSkills} onChange={handleSkillsChange} required>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Preferred Platform:</label>
          <select value={selectedPlatform} onChange={handlePlatformChange} required>
            <option value="">Select Platform</option>
            {platforms.map((platform, index) => (
              <option key={index} value={platform}>{platform}</option>
            ))}
          </select>
        </div>

        <button type="submit">Get Recommendations</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {recommendedCourses.length > 0 && (
        <div>
          <h3>Recommended Courses:</h3>
          <ul>
            {recommendedCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseRecommendation;

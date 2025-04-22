import React, { useState } from 'react';
import SummaryApi from '../common';

const PredictSalary = () => {
  const [formData, setFormData] = useState({
    experience: '',
    education: '',
    location: '',
    job_title: '',
    skills: '',
  });

  const [predictedSalary, setPredictedSalary] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.salaryDetails.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setPredictedSalary(result.predicted_salary);
      } else {
        console.error('Failed to predict salary');
      }
    } catch (error) {
      console.error('Error predicting salary:', error);
    }
  };

  // Predefined options for Location and Job Title
  const jobTitles = [
    'Software Engineer', 'Data Scientist','DevOps Engineer',
    'Full Stack Developer', 'Marketing Manager' ,'Frontend Developer'
  ];

  const locations = [
    'Pune', 'Hyderabad', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60% flex items-center justify-center">
      <div className="container bg-white p-8 rounded-lg shadow-lg w-96 mt-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Predict My Salary</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Experience(0-15):</label>
            <input
              type="number"
              name="experience"
              placeholder="Experience (In Years)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Education:</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Education</option>
              <option value="Bachelor">Bachelors</option>
              <option value="Master">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Job Title:</label>
            <select
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Job Title</option>
              {jobTitles.map((jobTitle, index) => (
                <option key={index} value={jobTitle}>{jobTitle}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Skills:</label>
            <input
              type="text"
              name="skills"
              placeholder="Skills (Python, Java, HTML, CSS)"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-700"
          >
            Predict Salary
          </button>
        </form>

        {predictedSalary && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">Predicted Salary:</h3>
            <p className="text-green-600 text-2xl font-bold">₹{predictedSalary} <span className="text-base font-medium text-gray-600">/ annum</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictSalary;

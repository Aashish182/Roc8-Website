import React, { useState } from 'react';
import SummaryApi from '../common';

const PredictSalary = () => {
    const [formData, setFormData] = useState({
        Age: '',
        Experience: '',
        Education_Level: 'Bachelors',
        Job_Title: 'Engineer'
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
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

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Predict My Salary</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Age:</label>
                        <input 
                            type="number" 
                            name="Age" 
                            value={formData.Age} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Experience (in years):</label>
                        <input 
                            type="number" 
                            name="Experience" 
                            value={formData.Experience} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Education Level:</label>
                        <select 
                            name="Education_Level" 
                            value={formData.Education_Level} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded">
                            <option value="Bachelors">Bachelors</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD">PhD</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Job Title:</label>
                        <select 
                            name="Job_Title" 
                            value={formData.Job_Title} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded">
                            <option value="Engineer">Engineer</option>
                            <option value="Manager">Manager</option>
                            <option value="Analyst">Analyst</option>
                            <option value="Developer">Developer</option>
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-700">
                        Predict Salary
                    </button>
                </form>

                {predictedSalary && (
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-semibold">Predicted Salary:</h3>
                        <p className="text-green-600 text-2xl font-bold">${predictedSalary.toFixed(2)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PredictSalary;       
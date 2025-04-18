const fetch = require('node-fetch');

const salaryPredict = async (req, res) => {
  try {
    // Extract data from the request body
    const { experience, education, location, job_title, skills } = req.body;

    // Call the Python API for prediction
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        experience,
        education,
        location,
        job_title,
        skills,
      }),
    });

    // Check if the response is not OK (status code other than 200-299)
    if (!response.ok) {
      throw new Error(`Python API responded with ${response.status}`);
    }

    // Parse the JSON response from the Python API
    const data = await response.json();

    // Return the prediction result
    res.status(200).json({ predicted_salary: data.predicted_salary });

  } catch (error) {
    // Log the error for debugging
    console.error('Error in salary prediction:', error.message);

    // Send error response with status code 500
    res.status(500).json({ error: 'Failed to fetch salary prediction' });
  }
};

module.exports = salaryPredict;

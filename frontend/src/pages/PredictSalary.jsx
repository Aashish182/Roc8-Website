// import React, { useState } from 'react';
// import SummaryApi from '../common';

// const PredictSalary = () => {
//   const [formData, setFormData] = useState({
//     experience: '',
//     education: '',
//     location: '',
//     job_title: '',
//     skills: '',
//   });

//   const [predictedSalary, setPredictedSalary] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(SummaryApi.salaryDetails.url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setPredictedSalary(result.predicted_salary);
//       } else {
//         console.error('Failed to predict salary');
//       }
//     } catch (error) {
//       console.error('Error predicting salary:', error);
//     }
//   };

//   // Predefined options for Location and Job Title
//   const jobTitles = [
//     'Software Engineer', 'Data Scientist','DevOps Engineer',
//     'Full Stack Developer', 'Marketing Manager' ,'Frontend Developer'
//   ];

//   const locations = [
//     'Pune', 'Hyderabad', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai'
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60% flex items-center justify-center">
//       <div className="container bg-white p-8 rounded-lg shadow-lg w-96 mt-16">
//         <h2 className="text-2xl font-bold mb-4 text-center">Predict My Salary</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Experience(0-15):</label>
//             <input
//               type="number"
//               name="experience"
//               placeholder="Experience (In Years)"
//               value={formData.experience}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Education:</label>
//             <select
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="">Select Education</option>
//               <option value="Bachelor">Bachelors</option>
//               <option value="Master">Masters</option>
//               <option value="PhD">PhD</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Location:</label>
//             <select
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">Select Location</option>
//               {locations.map((location, index) => (
//                 <option key={index} value={location}>{location}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Job Title:</label>
//             <select
//               name="job_title"
//               value={formData.job_title}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             >
//               <option value="">Select Job Title</option>
//               {jobTitles.map((jobTitle, index) => (
//                 <option key={index} value={jobTitle}>{jobTitle}</option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Skills:</label>
//             <input
//               type="text"
//               name="skills"
//               placeholder="Skills (Python, Java, HTML, CSS)"
//               value={formData.skills}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-700"
//           >
//             Predict Salary
//           </button>
//         </form>

//         {predictedSalary && (
//           <div className="mt-6 text-center">
//             <h3 className="text-xl font-semibold">Predicted Salary:</h3>
//             <p className="text-green-600 text-2xl font-bold">₹{predictedSalary} <span className="text-base font-medium text-gray-600">/ annum</span></p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PredictSalary;
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import SummaryApi from '../common';
import { useWindowSize } from 'react-use';
import Footer from "../components/Footer";
import Banner2 from "../components/Banner2";


const PredictSalary = () => {
  const [formData, setFormData] = useState({
    experience: '',
    education: '',
    location: '',
    job_title: '',
    skills: '',
  });

  const [predictedSalary, setPredictedSalary] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(SummaryApi.salaryDetails.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setPredictedSalary(result.predicted_salary);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 8000);
      } else {
        console.error('Failed to predict salary');
      }
    } catch (error) {
      console.error('Error predicting salary:', error);
    }
  };

  const jobTitles = ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Full Stack Developer', 'Marketing Manager', 'Frontend Developer'];
  const locations = ['Pune', 'Hyderabad', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai'];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-100 py-10 px-4">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="max-w-6xl mx-auto text-center mb-12 mt-16">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Discover Your Earning Potential!</h1>
        <p className="text-lg text-gray-700">
          Get a prediction of your expected salary based on your experience, skills, and job title.
        </p>
      </div>

      <div 
        className={`max-w-6xl mx-auto text-center mb-12 mt-16 p-8 rounded-xl transition-all duration-500
          ${predictedSalary ? 'bg-white' : 'bg-green-100'}`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-wrap justify-between gap-4">
            <input
              type="number"
              name="experience"
              placeholder="Experience (0-15 years)"
              value={formData.experience}
              onChange={handleChange}
              className="flex-1 min-w-[200px] p-3 border rounded-lg"
              required
            />

            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="flex-1 min-w-[200px] p-3 border rounded-lg"
              required
            >
              <option value="">Select Education</option>
              <option value="Bachelor">Bachelors</option>
              <option value="Master">Masters</option>
              <option value="PhD">PhD</option>
            </select>

            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="flex-1 min-w-[200px] p-3 border rounded-lg"
              required
            >
              <option value="">Select Location</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap justify-between gap-4">
            <select
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="flex-1 min-w-[200px] p-3 border rounded-lg"
              required
            >
              <option value="">Select Job Title</option>
              {jobTitles.map((job, idx) => (
                <option key={idx} value={job}>
                  {job}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="skills"
              placeholder="Skills (Python, React, etc)"
              value={formData.skills}
              onChange={handleChange}
              className="flex-1 min-w-[200px] p-3 border rounded-lg"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg mt-6 w-full md:w-auto"
            >
              Predict Salary
            </button>
          </div>
        </form>
      </div>

      <div 
        className={`max-w-6xl mx-auto text-center p-4 rounded-xl transition-all duration-500 w-[1000px] 
          ${predictedSalary ? 'bg-green-100' : ''}`}
      >
        {predictedSalary ? (
          <>
            <h3 className="text-xl font-semibold text-gray-800">Predicted Annual Salary:</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">₹{predictedSalary} <span className="text-base text-gray-600">/ annum</span></p>
          </>
        ) : (
          <></>
        )}
      </div>
      <Banner2 />

      {/* FAQ Section */}
      <section className="bg-purple-100 p-8 rounded-xl shadow-xl mt-12">
        <h2 className="text-3xl text-deep-purple-800 mb-4">Frequently Asked Questions</h2>

        <div className="mb-4">
          <h3
            onClick={() => toggleFAQ(0)}
            className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
          >
            How does the salary prediction model work?
            <span className="text-purple-600">{activeIndex === 0 ? '-' : '+'}</span>
          </h3>
          {activeIndex === 0 && (
            <p className="text-gray-600 mt-2 ml-2">It uses machine learning algorithms trained on real-world job and salary data to estimate your expected salary.</p>
          )}
        </div>

        <div className="mb-4">
          <h3
            onClick={() => toggleFAQ(1)}
            className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
          >
            What factors affect the salary prediction?
            <span className="text-purple-600">{activeIndex === 1 ? '-' : '+'}</span>
          </h3>
          {activeIndex === 1 && (
            <p className="text-gray-600 mt-2 ml-2">Your experience, skills, job role, location, and education all influence the prediction.</p>
          )}
        </div>

        <div className="mb-4">
          <h3
            onClick={() => toggleFAQ(2)}
            className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
          >
            Is the prediction 100% accurate?
            <span className="text-purple-600">{activeIndex === 2 ? '-' : '+'}</span>
          </h3>
          {activeIndex === 2 && (
            <p className="text-gray-600 mt-2 ml-2">No, it's an estimate. Actual salaries may vary depending on company, market trends, and negotiation.</p>
          )}
        </div>

        <div className="mb-4">
          <h3
            onClick={() => toggleFAQ(3)}
            className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
          >
            Will I get career suggestions along with salary?
            <span className="text-purple-600">{activeIndex === 3 ? '-' : '+'}</span>
          </h3>
          {activeIndex === 3 && (
            <p className="text-gray-600 mt-2 ml-2">Yes! We provide career growth insights including suggested skills and languages to help you grow.</p>
          )}
        </div>
      </section>
      
    </div>
    <Footer />
    </>
  );
};

export default PredictSalary;

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-16 px-8">
        <h1 className="text-4xl text-purple-800 font-bold text-center">About Us</h1>
        <div className="mt-8 bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl text-purple-700">Our Mission</h2>
          <p className="text-gray-700 mt-4">
            At ROC8 Salary Predictor, we are committed to helping professionals and job seekers make informed career 
            decisions by providing accurate salary predictions based on experience and skills.
          </p>

          <h2 className="text-2xl text-purple-700 mt-8">Why Choose Us?</h2>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>AI-powered salary predictions</li>
            <li>Data-driven insights for career growth</li>
            <li>User-friendly interface</li>
            <li>Secure and private data handling</li>
          </ul>

          <h2 className="text-2xl text-purple-700 mt-8">Our Team</h2>
          <p className="text-gray-700 mt-4">
            Our team consists of AI experts, data scientists, and career analysts who work together to bring you 
            the most accurate salary insights.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;

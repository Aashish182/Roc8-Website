import React from 'react';
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-16 px-8">
        <h1 className="text-4xl text-purple-800 font-bold text-center">Our Services</h1>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl text-purple-700">AI-Powered Salary Prediction</h2>
            <p className="text-gray-700 mt-4">
              Our advanced AI model predicts salaries based on experience, skills, and industry trends.
            </p>
          </div>
          <NavLink to="/CareerInsights">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl text-purple-700">Career Growth Insights</h2>
              <p className="text-gray-700 mt-4">
                We provide data-driven insights to help professionals make strategic career decisions.
              </p>
            </div>
          </NavLink>

          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl text-purple-700">Job Market Trends</h2>
            <p className="text-gray-700 mt-4">
              Stay updated with salary trends and industry demand to make better career choices.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl text-purple-700">Secure & Private</h2>
            <p className="text-gray-700 mt-4">
              Your data is encrypted and protected, ensuring privacy and confidentiality.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
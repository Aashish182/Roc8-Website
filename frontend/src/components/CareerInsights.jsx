import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"; 
import Footer from "../components/Footer";
import skills from "../utils/skills";
import { NavLink } from "react-router-dom";

const CareerInsights = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showAllSkills, setShowAllSkills] = useState(false); 

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="font-sans text-gray-800 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-200">
            <div className="flex justify-center">
                <div className="w-[800px] h-[300px] mt-28 bg-gradient-to-b from-purple-400 to-purple-500 text-center py-20 text-white rounded-2xl shadow-xl">
                    <h1 className="text-5xl">Career Growth Insights</h1>
                    <p className="text-lg mt-4">
                        Stay ahead in your career with industry-demanded skills & technologies.
                    </p>
                    <div className="flex justify-center gap-4 mt-4">
                        <NavLink
                        to="/CourseRecommendation"
                        className="text-white bg-purple-600 hover:bg-[#d8b4fe] hover:text-purple-700 font-bold py-3 px-6 rounded-full transition-all"
                        >
                        Get Recommendation
                        </NavLink>
                        <NavLink
                        to="/Course"
                        className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-200 font-bold py-3 px-6 rounded-full transition-all"
                        >
                        Explore Courses
                        </NavLink>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-16 px-8">
                <section className="bg-purple-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-1">
                    <h2 className="text-3xl text-purple-800 mb-4">In-Demand Skills</h2>
                    <p className="text-gray-700">
                        Industries are evolving rapidly. Learn the latest skills required to stay relevant.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {skills.slice(0, showAllSkills ? skills.length : 6).map((skill, index) => (
                            <div key={index} className="bg-purple-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
                                <h3 className="text-xl text-purple-600">{skill.name}</h3>
                                <p className="text-gray-600">{skill.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
                            onClick={() => setShowAllSkills(!showAllSkills)}
                        >
                            {showAllSkills ? "Show Less" : "Show More"}
                            {showAllSkills ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
                        </button>
                    </div>
                </section>

                <section className="bg-purple-100 p-8 rounded-2xl shadow-xl mt-12">
                    <h2 className="text-3xl text-purple-800 mb-4">Frequently Asked Questions</h2>
                    <div className="mb-4">
                        <h3
                            onClick={() => toggleFAQ(0)}
                            className="text-lg font-semibold p-3 bg-purple-200 rounded-md hover:bg-purple-300 transition-colors cursor-pointer flex justify-between items-center"
                        >
                            Why should I learn new skills?
                            <span className="text-purple-600">{activeIndex === 0 ? "-" : "+"}</span>
                        </h3>
                        {activeIndex === 0 && (
                            <p className="text-gray-600 mt-2 ml-2">
                                Learning new skills ensures career growth and better salary opportunities.
                            </p>
                        )}
                    </div>
                    <div>
                        <h3
                            onClick={() => toggleFAQ(1)}
                            className="text-lg font-semibold p-3 bg-purple-200 rounded-md hover:bg-purple-300 transition-colors cursor-pointer flex justify-between items-center"
                        >
                            Which skills are most in demand?
                            <span className="text-purple-600">{activeIndex === 1 ? "-" : "+"}</span>
                        </h3>
                        {activeIndex === 1 && (
                            <p className="text-gray-600 mt-2 ml-2">
                                Software development, AI/ML, cloud computing, and cybersecurity are highly in demand.
                            </p>
                        )}
                    </div>
                </section>

                <section className="bg-gradient-to-br from-purple-300 to-purple-500 text-white text-center py-12 rounded-xl mt-12">
                    <h2 className="text-4xl mb-6">Boost Your Career with New Skills</h2>
                    <p className="text-lg mb-4">Start learning today to stay ahead in your career.</p>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
                        Explore Courses
                    </button>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default CareerInsights;

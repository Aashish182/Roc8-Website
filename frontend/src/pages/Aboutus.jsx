// import React, { useState } from "react";
// import Footer from "../components/Footer";
// import Banner from "../components/Banner";

// const Aboutus = () => {
    

//     return (
//         <>
//         <div className="h-[650px] bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60% ">
//             <div className="container mx-auto py-16 px-8">
//                 <h1 className="text-4xl text-purple-800 mt-16 text-center">About Us</h1>
//                 <div className="mt-8 bg-white p-8 rounded-lg shadow-xl">
//                 <h2 className="text-2xl text-purple-700">Our Mission</h2>
//                 <p className="text-gray-700 mt-4">
//                     At ROC8 Salary Predictor, we are committed to helping professionals and job seekers make informed career 
//                     decisions by providing accurate salary predictions based on experience and skills.
//                 </p>

//                 <h2 className="text-2xl text-purple-700 mt-8">Why Choose Us?</h2>
//                 <ul className="list-disc list-inside mt-4 text-gray-700">
//                     <li>AI-powered salary predictions</li>
//                     <li>Data-driven insights for career growth</li>
//                     <li>User-friendly interface</li>
//                     <li>Secure and private data handling</li>
//                 </ul>

//                 <h2 className="text-2xl text-purple-700 mt-8">Our Team</h2>
//                 <p className="text-gray-700 mt-4">
//                     Our team consists of AI experts, data scientists, and career analysts who work together to bring you 
//                     the most accurate salary insights.
//                 </p>
//                 </div>
            
//             <Banner />
//             </div>
//             </div>
            
            
//         <Footer />
//         </>
//     );
// };

// export default Aboutus;

import React from "react";
import Footer from "../components/Footer";
import Banner from "../components/Banner"; // Make sure this path is correct

const Aboutus = () => {
    return (
        <>
            <div className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-100 min-h-screen">
                <div className="container mx-auto px-8 pt-16">
                    <h1 className="text-4xl text-purple-800 mt-16 text-center">About Us</h1>

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

                    {/* 👇 This is where the Banner is called correctly */}
                    <div className="mt-16">
                        <Banner />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Aboutus;

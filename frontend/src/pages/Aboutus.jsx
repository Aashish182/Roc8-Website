// import React from "react";
// import Footer from "../components/Footer";
// import Banner from "../components/Banner"; // Make sure this path is correct

// const Aboutus = () => {
//     return (
//         <>
//             <div className="bg-gradient-to-br from-purple-100 via-purple-200 to-purple-100 min-h-screen">
//                 <div className="container mx-auto px-8 pt-16">
//                     <h1 className="text-4xl text-purple-800 mt-16 text-center">About Us</h1>

//                     <div className="mt-8 bg-white p-8 rounded-lg shadow-xl">
//                         <h2 className="text-2xl text-purple-700">Our Mission</h2>
//                         <p className="text-gray-700 mt-4">
//                             At ROC8 Salary Predictor, we are committed to helping professionals and job seekers make informed career
//                             decisions by providing accurate salary predictions based on experience and skills.
//                         </p>

//                         <h2 className="text-2xl text-purple-700 mt-8">Why Choose Us?</h2>
//                         <ul className="list-disc list-inside mt-4 text-gray-700">
//                             <li>AI-powered salary predictions</li>
//                             <li>Data-driven insights for career growth</li>
//                             <li>User-friendly interface</li>
//                             <li>Secure and private data handling</li>
//                         </ul>

//                         <h2 className="text-2xl text-purple-700 mt-8">Our Team</h2>
//                         <p className="text-gray-700 mt-4">
//                             Our team consists of AI experts, data scientists, and career analysts who work together to bring you
//                             the most accurate salary insights.
//                         </p>
//                     </div>

//                     {/* 👇 This is where the Banner is called correctly */}
//                     <div className="mt-16">
//                         <Banner />
//                     </div>
//                 </div>
//             </div>

//             <Footer />
//         </>
//     );
// };

// export default Aboutus;

import React from "react";
import Footer from '../components/Footer';
import img1 from '../asset/Images/about-banner.png';
import img2 from '../asset/Images/hero-slide-3.jpg';
import img3 from '../asset/Images/hero-slide-2.jpg';
import img4 from '../asset/Images/feature-banner.png';
import img5 from '../asset/Images/hero-slide-1.jpg';

const sections = [
  {
    title: "Our Mission",
    text: "Empower individuals with data-driven career decisions by providing personalized job trends and salary insights. We aim to remove guesswork and bring transparency to job markets through intelligent technology that understands user potential and market demands.",
    img: img1,
  },
  {
    title: "Who We Are",
    text: "We're a team of passionate developers, data scientists, and career mentors working to create a smarter path to career success. Our diverse background in HR tech, software development, and analytics helps us build user-centric tools with real-world value.",
    img: img2,
  },
  {
    title: "What We Offer",
    text: "From real-time salary prediction to personalized career growth plans, we offer a variety of features tailored to both freshers and experienced professionals. Our recommendation engine adapts as you grow, suggesting new skills and roles for your evolving goals.",
    img: img3,
  },
  {
    title: "Why Choose Us",
    text: "Our platform is not only powerful but easy to use. With advanced AI, secure data handling, and constant improvements based on user feedback, we ensure you stay ahead in your career journey. We’re committed to helping you grow with confidence.",
    img: img4,
  },
  {
    title: "Our Vision",
    text: "To build a world where everyone has access to smart career planning. We envision a global community empowered by insights, growth paths, and clarity—no matter the starting point. Join us as we redefine the future of work and opportunity.",
    img: img5,
  },
];

const Aboutus = () => {
  return (
    <>
      <div className="bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60% px-4 py-12">
        <div className="mx-12">
        <h2 className="text-4xl text-purple-800 text-center mt-16 mb-12">About Us</h2>
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center mb-16 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="md:w-1/2 p-4">
              <img
                src={section.img}
                alt={section.title}
                className="w-full h-[350px] object-cover rounded-2xl shadow-lg"
              />
            </div>
            <div className="md:w-1/2 p-4">
              <h3 className="text-2xl font-semibold mb-4 text-purple-700">{section.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{section.text}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Aboutus;

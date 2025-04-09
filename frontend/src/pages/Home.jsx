import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Link, NavLink, useParams } from 'react-router-dom'
import Footer from '../components/Footer';
import home1 from "../asset/Images/home6.webp";
import img1 from '../asset/Images/predictsalary.jpg';
import img2 from '../asset/Images/career.jpg';
import img3 from '../asset/Images/job1.jpg';
import CountUp from 'react-countup';
import Banner from '../components/Banner';
import Banner1 from '../components/Banner1';
import Banner2 from '../components/Banner2';
import SummaryApi from '../common';
import { formatDate } from '../utils/dateFormator';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [animate, setAnimate] = useState(true); 
  const [countKey, setCountKey] = useState(0);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const fetchFeedbackDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.feedbackDetails.url, {
      method: SummaryApi.feedbackDetails.method,
      headers: {
        "content-type": "application/json",
      },
      credentials: 'include'
    });
    setLoading(false);

    const dataResponse = await response.json();
    setData(dataResponse.data);
    dataResponse.data.forEach(item => {
      if (!creatorNames[item.creator]) {
        fetchUserData(item.creator);
      }
    });    
  };

  const [creatorNames, setCreatorNames] = useState({});
  const fetchUserData = async (userId) => {
    if (!userId || creatorNames[userId]) return; // Avoid fetching if already fetched
  
    const response = await fetch(SummaryApi.feedbackuser.url, {
      method: SummaryApi.feedbackuser.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
  
    const dataResponse = await response.json();
    console.log("Fetched name for", userId, ":", dataResponse.data);
  
    setCreatorNames(prev => ({
      ...prev,
      [userId]: dataResponse.data.name || 'Anonymous',
    }));
  };
  

  useEffect(() => {
    fetchFeedbackDetails();
    const interval1 = setInterval(() => {
      setAnimate(false);
      setTimeout(() => setAnimate(true), 100);
    }, 3000);
    const interval2 = setInterval(() => {
      setCountKey(prevKey => prevKey + 1);
    }, 5000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);
  
  
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="font-sans text-gray-800 bg-gradient-to-br from-purple-100 from-10% via-purple-200 via-40% to-purple-200 to-60% min-h-screen">
        <div className="relative h-[725px] w-[1520px] bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60% text-center py-20 text-white border-b border-gray-300">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${home1})`,
          }}
        ></div>
        </div>
          <div className="z-50 transform -translate-y-[500px] text-center">
          <h1 className={`text-7xl text-purple-500 mb-4 transition-transform duration-700 ${animate ? 'animate-train' : 'opacity-0'}`}>
            Welcome to ROC8
          </h1>
          <div className="w-40 h-1 bg-purple-400 -mt-2 mx-auto"></div>
          <h4 className='text-lg text-purple-400'>Boost your career by predicting salary and get more things.</h4>
          <h4 className="text-lg text-purple-400">Use our AI-powered tool to predict your salary based on experience and skills.</h4>
          <div className="flex justify-center gap-4 mt-4">
            <NavLink
              to="/Services"
              className="text-white bg-purple-600 hover:bg-[#d8b4fe] hover:text-purple-700 font-bold py-3 px-6 rounded-full transition-all"
            >
              Explore Services
            </NavLink>
            <NavLink
              to="/Contact"
              className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-200 font-bold py-3 px-6 rounded-full transition-all"
            >
              Learn More
            </NavLink>
          </div>
          </div>

        <div className="container px-8">
          <div className="grid grid-cols-1 gap-16">
            <section className="bg-purple-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:translate-y-[-5px]">
              <h2 className="text-3xl text-deep-purple-800 mb-4">About Us</h2>
              <p className="text-gray-700 leading-relaxed">ROC8 is dedicated to helping individuals understand their worth in the job market. Our AI-powered tool analyzes various factors to provide accurate salary predictions and many more..</p>
              <div className='bg-[#C7D2FE] rounded-2xl m-4 h-[350px]'>
                <div class="flex items-center gap-3 ml-8">
                  <div class="w-5 h-5 bg-purple-300 rounded-full "></div>
                  <div>
                    <h4 class="text-lg mt-[30px]">We predicted over</h4>
                    <h2 class="text-purple-700 text-2xl ">
                        <span id="count1"><CountUp key={countKey} start={100} end={1200} duration={2}/></span>+ Peoples
                    </h2>
                    <p class="text-gray-400">We have successfully predicted the salary for 1200+ peoples.</p>
                  </div>
                </div>
                <div class="flex items-center gap-3 ml-8">
                    <div class="w-5 h-5 bg-purple-300 rounded-full"></div>
                    <div>
                        <h4 class="text-lg mt-2">We have </h4>
                        <h2 class="text-purple-700 text-2xl">
                          <span id="count2"><CountUp key={countKey} start={0} end={25} duration={2}/></span>+ In demand skills category
                        </h2>
                        <p class="text-gray-400">We have successfully found the 25+ in-demand skills.</p>
                    </div>
                </div>
                <div class="flex items-center gap-3 ml-8">
                    <div class="w-5 h-5 bg-purple-300 rounded-full"></div>
                    <div>
                        <h4 class="text-lg mt-2">We have support of</h4>
                        <h2 class="text-purple-700 text-2xl">
                          <span id="count3"><CountUp key={countKey} start={10} end={100} duration={2}/></span>+ Companies
                        </h2>
                        <p class="text-gray-400 mb-4">We have a huge number of supporters willing to help you.</p>
                    </div>
                </div>
              </div>
              <div className="mr-4 flex justify-end">
                <NavLink to='/Aboutus' className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
                  Know More
                </NavLink>
              </div>
            </section>

            <Banner />

            <section className="bg-purple-100 p-8 h-[500px] rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:translate-y-[-5px]">
              <h2 className="text-3xl text-deep-purple-800 mb-4">How It Works</h2>
              <div className="mt-8 flex justify-between">
                <div className="bg-[#C7D2FE] p-10 rounded-xl w-full md:w-1/3 h-[350px] shadow-md hover:shadow-lg transition-transform hover:translate-y-[-5px] mb-4 md:mb-0 flex flex-col justify-center items-center text-center">
                  <img src={img1} alt="img1" className="h-20 w-20 rounded-full" />
                  <h3 className="text-xl text-deep-purple-600 mb-2">Predict Your Salary</h3>
                  <p className="text-gray-600">Get an estimate of your expected salary based on your skills, experience, and job role</p>
                </div>
                <div className="bg-[#C7D2FE] ml-2 p-10 rounded-xl w-full md:w-1/3 h-[350px] shadow-md hover:shadow-lg transition-transform hover:translate-y-[-5px] mb-4 md:mb-0 flex flex-col justify-center items-center text-center">
                  <img src={img2} alt="img2" className="h-20 w-20 rounded-full" />
                  <h3 className="text-xl text-deep-purple-600 mb-2">Career Growth Insights</h3>
                  <p className="text-gray-600">Discover the most in-demand skills and technologies to boost your career.</p>
                </div>
                <div className="bg-[#C7D2FE] ml-2 p-10 rounded-xl w-full md:w-1/3 h-[350px] shadow-md hover:shadow-lg transition-transform hover:translate-y-[-5px] mb-4 md:mb-0 flex flex-col justify-center items-center text-center">
                  <img src={img3} alt="img3" className="h-20 w-20 rounded-full" />
                  <h3 className="text-xl text-deep-purple-600 mb-2">Job Trends</h3>
                  <p className="text-gray-600">Stay updated with the latest job market trends and hiring demands in your industry.</p>
                </div>
              </div>
            </section>

            <section className="bg-purple-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-transform hover:translate-y-[-5px]">
              <h2 className="text-3xl text-deep-purple-800 mb-4">What Our Users Say </h2>
              {Array.isArray(data) ? (
                data.slice(0,3).map((item, index) => (
                  <div className="bg-[#C7D2FE] p-6 rounded-lg shadow-md mb-4" key={item?._id || index}>
                  <p className="text-gray-800 text-lg mb-2 italic">"{item?.feedback}"</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>- {creatorNames[item?.creator] || 'Anonymous'}</span>
                    <span>{formatDate(item?.submittedAt)}</span>
                  </div>
                </div>
                ))
              ) : (
                <p className="text-gray-600 italic">No feedback submitted yet.</p>
              )}
            </section>

            <Banner1 />

            <section className="bg-purple-100 p-8 rounded-xl shadow-xl">
              <h2 className="text-3xl text-deep-purple-800 mb-4">Frequently Asked Questions</h2>
              <div className="mb-4">
                <h3
                  onClick={() => toggleFAQ(0)}
                  className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
                >
                  Is my data safe?
                  <span className="text-purple-600">{activeIndex === 0 ? '-' : '+'}</span>
                </h3>
                {activeIndex === 0 && (
                  <p className="text-gray-600 mt-2 ml-2"> Your privacy is our priority. We do not store personal data.</p>
                )}
              </div>
              <div className='mb-4'>
                <h3
                  onClick={() => toggleFAQ(1)}
                  className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
                >
                  How accurate are the predictions?
                  <span className="text-purple-600">{activeIndex === 1 ? '-' : '+'}</span>
                </h3>
                {activeIndex === 1 && (
                  <p className="text-gray-600 mt-2 ml-2"> Our predictions are based on extensive industry data and trends.</p>
                )}
              </div>
              <div className='mb-4'>
                <h3
                  onClick={() => toggleFAQ(2)}
                  className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
                >
                  How can ROC8 help me grow my career?
                  <span className="text-purple-600">{activeIndex === 2 ? '-' : '+'}</span>
                </h3>
                {activeIndex === 2 && (
                  <p className="text-gray-600 mt-2 ml-2"> We provide insights into in-demand skills, industry trends, and personalized career recommendations.</p>
                )}
              </div>
              <div className='mb-4'>
                <h3
                  onClick={() => toggleFAQ(3)}
                  className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
                >
                  What skills should I learn to increase my salary?
                  <span className="text-purple-600">{activeIndex === 3 ? '-' : '+'}</span>
                </h3>
                {activeIndex === 3 && (
                  <p className="text-gray-600 mt-2 ml-2"> Our platform suggests high-paying skills based on your current experience and career goals.</p>
                )}
              </div>
              <div className='mb-4'>
                <h3
                  onClick={() => toggleFAQ(4)}
                  className="text-lg font-semibold p-3 bg-[#C7D2FE] rounded-md hover:bg-purple-200 transition-colors cursor-pointer flex justify-between items-center"
                >
                  Can I see which industries are hiring the most?
                  <span className="text-purple-600">{activeIndex === 4 ? '-' : '+'}</span>
                </h3>
                {activeIndex === 4 && (
                  <p className="text-gray-600 mt-2 ml-2"> Yes, we provide insights into high-growth industries and the skills they require.</p>
                )}
              </div>
            </section>
          </div>

          <Banner2/>
          <div className="h-[0.5px] bg-gray-800 w-full"></div>
          {/* Call to Action Section */}
          <section className="bg-deep-purple-600 text-white text-center py-12 rounded-xl">
            <h2 className="text-4xl mb-6">Ready to Find Out Your Worth?</h2>
            <Link to="/PredictSalary" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors inline-block">
              Predict My Salary
            </Link>
          </section>
        </div>

        <Footer />
        <style>
        {`
          @keyframes trainMove {
            0% {
              opacity: 0;
              transform: translateX(-50px);
            }
            50% {
              opacity: 1;
              transform: translateX(0);
            }
            100% {
              opacity: 0;
              transform: translateX(50px);
            }
          }
          .animate-train {
            animation: trainMove 3s ease-in-out infinite;
          }
        `}
      </style>
      

    </div>
  )
}

export default Home

import React, { useContext, useState } from 'react';
import loginimg from "../asset/Images/login.png";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const {fetchUserDetails} = useContext(Context);
  const dispatch = useDispatch();
    
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(SummaryApi.ChangePassword.url, {
              method: SummaryApi.ChangePassword.method,
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ email, oldPassword, newPassword })
          });

          const data = await response.json();

          if (data.success) {
              toast.success("Password changed successfully!");
              navigate('/Login'); 
          } else {
              toast.error(data.message);
          }
      } catch (error) {
          toast.error("An error occurred. Please try again.");
      }
  };

    const [errors, setErrors] = useState({});

    const validateInputs = () => {
      const errors = {};
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
      if (!emailPattern.test(email)) {
          toast.error("Please enter a valid email address.");
          errors.password = "Please enter a valid email address.";
    }
      if (!passpattern.test(oldPassword)) {
        toast.error("Please enter a valid Old Password.");
        errors.password = "Please enter a valid Old Password.";
    }
    if (!passpattern.test(newPassword)) {
        toast.error("Please enter a valid New Password.");
        errors.password = "Please enter a valid Old Password.";
    }

      setErrors(errors);
      return Object.keys(errors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff] flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-lg shadow-lg opacity-70 transform rotate-12"></div>
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#e9d5ff] rounded-lg shadow-lg opacity-70 transform -rotate-12"></div>
      <div className="absolute bottom-20 right-16 w-60 h-60 bg-[#f3e8ff] rounded-lg shadow-lg opacity-80 transform -rotate-6"></div>
      <div className="absolute top-32 right-32 w-52 h-52 bg-[#e9d5ff] rounded-lg shadow-lg opacity-80 transform rotate-3"></div>

      <div className="w-[90%] md:w-[70%] lg:w-[60%] bg-[#C7D2FE] p-10 mt-16 rounded-lg shadow-2xl relative z-10">
        
        <h1 className="text-left text-gray-700 text-3xl font-bold mb-8">Change Password</h1>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="md:w-1/2">
            <img className="w-full rounded-lg" src={loginimg} alt="login-img" />
          </div>
          
          <div className="md:w-1/2 bg-[#C4B5FD] p-10 rounded-lg">
            <h2 className="text-start text-gray-500 text-xl mb-6">Please Enter your Detail..</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="flex items-center border rounded-md p-3 bg-[#faf5ff]">
                <FaUser className="text-gray-500 text-xl mr-3" />
                <input
                  type="text"
                  name='email' value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full focus:outline-none bg-[#faf5ff]"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="flex items-center border rounded-md p-3 bg-[#faf5ff]">
                <FaLock className="text-gray-500 text-xl mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full focus:outline-none bg-[#faf5ff]"
                  placeholder="Enter your old password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 text-xl ml-3 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex items-center border rounded-md p-3 bg-[#faf5ff]">
                <FaLock className="text-gray-500 text-xl mr-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  name='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full focus:outline-none bg-[#faf5ff]"
                  placeholder="Enter your new password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 text-xl ml-3 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700 transition-all"
              >
                Change Password
              </button>
            </form>
            <p className="text-center text-gray-500 mt-6">
              Found your Password ? <NavLink to="/login" className="text-purple-600 font-medium hover:underline">Login here</NavLink>
            </p>
            {/* <p className="text-center text-gray-500 mt-6">
              Don't have an account? <a href="/register" className="text-purple-600 font-medium hover:underline">Register here</a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

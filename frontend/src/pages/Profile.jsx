// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaStarOfLife } from 'react-icons/fa';
// import { useSelector } from 'react-redux';
// import Footer from '../components/Footer';

// const Profile = () => {
//   const user = useSelector((state) => state?.user?.user);

//   return (
//     <div className='mt-8 h-[500px] bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff]'>
//     <div className=" container w-full h-full px-6 md:px-28 pt-20 bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff]">
//       <h1 className="text-3xl font-semibold pb-4">Profile</h1>

//       <div>
//         <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">User</h1>
//         <div className="text-lg pt-4 max-w-4xl">
//           <div className="flex flex-col gap-4 mb-4">
//             <div className="flex gap-2">
//               <span className="font-medium w-40">Email:</span>
//               <span>{user?.email}</span>
//             </div>
//             <div className="flex gap-2">
//               <span className="font-medium w-40">Name:</span>
//               <span>{user?.name}</span>
//             </div>
//             <div className="flex gap-2 items-center">
//               <span className="font-medium w-40">Password:</span>
//               <div className="flex items-center gap-6">
//                 <span className="flex gap-1">
//                   {[...Array(7)].map((_, index) => (
//                     <FaStarOfLife key={index} size={10} />
//                   ))}
//                 </span>
//                 <Link
//                   to="/forgotPassword"
//                   className="text-orange-600 bg-blue-100 hover:bg-purple-300 transition-all px-3 py-2 rounded-xl text-base"
//                 >
//                   Change
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStarOfLife } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [data, setData] = useState({
    feedback: '',
    creator: user?._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
        ...prev,
        [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.feedback.url, {
        method: SummaryApi.feedback.method,
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      setShowFeedback(false); 
      setData({ feedback: '', creator: user?._id });
    } else if (dataApi.error) {
      toast.error(dataApi.message);
    }

    console.log("data", dataApi);
  };

  return (
    <div className='mt-8 bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff]'>
      <div className="container w-full px-6 md:px-28 pt-20">
        <h1 className="text-3xl font-semibold pb-4">Profile</h1>

        {/* User Section */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">User</h1>
          <div className="text-lg pt-4 max-w-4xl">
            <div className="flex flex-col gap-4 mb-4">
              <div className="flex gap-2">
                <span className="font-medium w-40">Email:</span>
                <span>{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium w-40">Name:</span>
                <span>{user?.name}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-medium w-40">Password:</span>
                <div className="flex items-center gap-6">
                  <span className="flex gap-1">
                    {[...Array(7)].map((_, index) => (
                      <FaStarOfLife key={index} size={10} />
                    ))}
                  </span>
                  <Link
                    to="/forgotPassword"
                    className="text-orange-600 bg-blue-100 hover:bg-purple-300 transition-all px-3 py-2 rounded-xl text-base"
                  >
                    Change
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">Give Feedback</h1>
          <div className="pt-4 max-w-4xl">
            <button
              onClick={() => setShowFeedback(!showFeedback)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all mb-4"
            >
              {showFeedback ? 'Close Feedback' : 'Give Feedback'}
            </button>

            {showFeedback && (
              <div className="bg-white p-4 rounded-lg shadow-md">
                <textarea
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-purple-400"
                  placeholder="Enter your feedback here..."
                  name='feedback'
                  value={data.feedback}
                  onChange={handleChange}
                  required
                />
                <button
                  onClick={handleSubmit}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;

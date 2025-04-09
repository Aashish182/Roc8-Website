import React from 'react';
import { Link } from 'react-router-dom';
import { FaStarOfLife } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const Profile = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className='mt-8 h-[500px] bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff]'>
    <div className=" container w-full h-full px-6 md:px-28 pt-20 bg-gradient-to-br from-white via-[#f3e8ff] to-[#e9d5ff]">
      <h1 className="text-3xl font-semibold pb-4">Profile</h1>

      <div>
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
    </div>
    <Footer />
    </div>
  );
};

export default Profile;

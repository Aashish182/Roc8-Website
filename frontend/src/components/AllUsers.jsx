import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from "react-toastify";
import { formatDate } from '../utils/dateFormator';
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include'
    });
    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='overflow-x-auto p-4'>
      <table className='w-full bg-blue-100 border border-gray-300'>
        <thead>
          <tr className='border-b-2 border-gray-400'>
            <th className='text-lg text-purple-700 text-center border-r border-gray-300 p-2'>Sr No.</th>
            <th className='text-lg text-purple-700 text-center border-r border-gray-300 p-2'>Name</th>
            <th className='text-lg text-purple-700 text-center border-r border-gray-300 p-2'>Email</th>
            <th className='text-lg text-purple-700 text-center border-r border-gray-300 p-2'>Role</th>
            <th className='text-lg text-purple-700 text-center border-r border-gray-300 p-2'>Created Date</th>
            <th className='text-lg text-purple-700 text-center p-2'>Action</th>
          </tr>
        </thead>
        <tbody className='border-b-2 border-gray-400'>
          {allUsers.length > 0 &&
            allUsers.map((el, index) => (
              <tr key={el._id || index} className='border-b border-gray-300 text-center text-lg hover:bg-gray-100'>
                <td className='border-r text-purple-700 border-gray-300 p-4'>{index + 1}</td>
                <td className='border-r text-purple-700 border-gray-300 p-4'>{el.name}</td>
                <td className='border-r text-purple-700 border-gray-300 p-4'>{el.email}</td>
                <td className='border-r text-purple-700 border-gray-300 p-4'>{el.role}</td>
                <td className='border-r text-purple-700 border-gray-300 p-4'>{formatDate(el?.createdAt)}</td>
                <td className='p-4'>
                  <div 
                    className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-purple-400'
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <FaEdit />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole 
          onClose={() => setOpenUpdateRole(false)} 
          name={updateUserDetails.name} 
          email={updateUserDetails.email} 
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;

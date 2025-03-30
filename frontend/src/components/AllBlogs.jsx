import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { formatDate } from '../utils/dateFormator';
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const AllBlogs = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState([]);
  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
        const response = await fetch(SummaryApi.blogDetails.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const dataResponse = await response.json();
        console.log("API Response:", dataResponse);

        if (Array.isArray(dataResponse.data)) {
            setData(dataResponse.data); 
        } else {
            setData([]); 
        }

        fetchUserData(dataResponse?.data?.creator);
    } catch (error) {
        console.error("Error fetching blog details:", error);
        setData([]);
    }
    setLoading(false);
};

const [creatorName, setCreatorName] = useState('');
const fetchUserData = async (userId) => {
    if (!userId) return;
    try {
        const response = await fetch(SummaryApi.bloguser.url, {
            method: SummaryApi.bloguser.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId })
        });

        const dataResponse = await response.json();
        setCreatorName(dataResponse.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

useEffect(() => {
    fetchBlogDetails();
}, []);

return (
    <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse border border-gray-300 bg-blue-100">
            <thead className="bg-blue-100">
                <tr className="text-lg text-center border-b-2 border-gray-400">
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Sr_No.</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Image</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Title</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Content</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Created On</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">View</th>
                </tr>
            </thead>
            <tbody className="text-center border-b-2 border-gray-400">
                {data.length > 0 &&
                    data.map((el, index) => (
                    <tr key={el.id || index} className="border-b border-gray-300 text-center text-lg hover:bg-gray-100">
                        <td className="border-r text-purple-700 border-gray-300 p-4">{index + 1}</td>
                        <td className="border-r text-purple-700 border-gray-300 p-4 justify-items-center"><img src={el.image} alt={el.title} className="w-16 h-16 rounded" /></td>
                        <td className="border-r text-purple-700 border-gray-300 p-4">{el.title}</td>
                        <td className="border-r text-purple-700 border-gray-300 p-4">{el.content}</td>
                        <td className="border-r text-purple-700 border-gray-300 p-4">{formatDate(el?.createdAt)}</td>
                        <td className="border-r text-purple-700 border-gray-300 p-4 justify-items-center">
                        <div className='w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:bg-purple-400'>
                            <NavLink className='' to={`/ViewBlog/${el?._id}`} >
                                <FaEye />
                            </NavLink>
                        </div>
                        </td>
                    </tr>
                    ))}
            </tbody>
        </table>
    </div>
)
}

export default AllBlogs;

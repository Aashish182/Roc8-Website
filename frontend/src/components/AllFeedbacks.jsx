import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { formatDate } from '../utils/dateFormator';
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { NavLink, useParams } from 'react-router-dom';

const AllFeedbacks = () => {
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
        if (!userId || creatorNames[userId]) return; 
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
}, []);

return (
    <div className="overflow-x-auto p-4">
        <table className="w-full border-collapse border border-gray-300 bg-blue-100">
            <thead className="bg-blue-100">
                <tr className="text-lg text-center border-b-2 border-gray-400">
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Sr_No.</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Feedback</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">User</th>
                    <th className="text-lg text-purple-700 text-center border-r border-gray-300 p-2">Created On</th>
                </tr>
            </thead>
            <tbody className="text-center border-b-2 border-gray-400">
            {Array.isArray(data) ? (
                data.map((el, index) => (
                    <tr key={el.id || index} className="border-b border-gray-300 text-center text-lg hover:bg-gray-100">
                        <td className="border-r text-purple-700 border-gray-300 p-4">{index + 1}</td>
                        <td className="border-r text-purple-700 border-gray-300 p-4">{el.feedback}</td>
                        <td className="border-r text-purple-700 border-gray-300 p-4">{creatorNames[el?.creator] || 'Anonymous'}</td>
                        <td className="border-r text-purple-700 border-gray-300 p-4">{formatDate(el?.createdAt)}</td>
                    </tr>
                    ))):(
                    <h2 className='mt-16 text-bold'> NO FEEDBACKS</h2>
                    )}
            </tbody>
        </table>
    </div>
)
}

export default AllFeedbacks;

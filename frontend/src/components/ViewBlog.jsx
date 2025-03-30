import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { formatDate } from "../utils/dateFormator";
import { useParams } from "react-router-dom";

const ViewBlog = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState([]);
  const params = useParams();
  const fetchViewBlogDetails = async() =>{
    setLoading(true);
    const response = await fetch(SummaryApi.viewblogDetails.url,{
        method: SummaryApi.viewblogDetails.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
                blogId : params?.id
        })
    })
    setLoading(false);

    const dataResponse = await response.json();
    
    setData(dataResponse.data);
    fetchUserData(dataResponse?.data?.creator);
}

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
        console.log(dataResponse.data);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};

useEffect(() => {
    fetchViewBlogDetails();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 from-25% via-purple-200 via-40% to-purple-400 to-60%">
    <div className="container p-2 mt-16">
      <h2 className="text-center text-2xl font-bold text-purple-600 mb-6">View Blog</h2>
      <div className=" relative flex flex-col gap-6">
        <div key={data.id} className="border border-gray-300 p-4 rounded-lg shadow-md bg-white flex" >
            <div className="w-[500px] h-full"> <img src={data.image} /></div>
            <div className="ml-16">
              <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
              <p className="text-gray-700 mb-2">{data.content}</p>
                <div className="absolute bottom-0 left-[564px] p-4">
                  <p className="text-sm text-gray-500">
                    <strong>Author:</strong> {creatorName}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Published On:</strong> {formatDate(data?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
      </div>
    </div>
    </div>
  );
};

export default ViewBlog;

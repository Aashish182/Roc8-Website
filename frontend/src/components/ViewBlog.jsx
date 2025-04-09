import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { formatDate } from "../utils/dateFormator";
import { useParams } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const ViewBlog = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [creatorNames, setCreatorNames] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const params = useParams();

  const fetchViewBlogDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.viewblogDetails.url, {
      method: SummaryApi.viewblogDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        blogId: params?.id,
      }),
    });
    setLoading(false);

    const dataResponse = await response.json();
    setData(dataResponse.data);
    setEditedTitle(dataResponse.data.title);
    setEditedContent(dataResponse.data.content);
    if (dataResponse.data?.creator && !creatorNames[dataResponse.data.creator]) {
      fetchUserData(dataResponse.data.creator);
    }
  };

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
    fetchViewBlogDetails();
  }, []);

  const handleUpdateBlog = async () => {
    const response = await fetch(SummaryApi.updateBlog.url, {
      method: SummaryApi.updateBlog.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: params?.id,
        title: editedTitle,
        content: editedContent,
      }),
    });

    const result = await response.json();
    if (result.success) {
      toast.success("Blog updated successfully!");
      setIsEditing(false);
      fetchViewBlogDetails(); 
    } else {
      toast.error(result.message || "Failed to update blog");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60%">
    <div className="container p-2">
        <h2 className="text-center text-2xl font-bold text-purple-600 mb-6 mt-24">View Blog</h2>
      <div className=" relative flex flex-col gap-6">
        <div key={data.id} className="border border-gray-300 p-4 rounded-lg shadow-md bg-white flex" >
            <div className="w-[500px] h-full"> <img src={data.image} /></div>
            <div className="ml-16">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full border p-2 rounded text-xl font-semibold mb-2"
                  />
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full border p-2 rounded text-gray-700 mb-2 min-h-[150px]"
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
                  <p className="text-gray-700 mb-2">{data.content}</p>
                </>
              )}
              <div className="absolute bottom-0 left-[564px] p-4">
                <p className="text-sm text-gray-500">
                    <strong>Author:</strong> {creatorNames[data.creator] || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Published On:</strong> {formatDate(data?.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 absolute right-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex items-center gap-2"
            >
              Edit Blog
              <MdEdit className="text-lg text-white" />
            </button>
          ) : (
            <button
              onClick={handleUpdateBlog}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;

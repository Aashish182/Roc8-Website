import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    // Initialize data as an array
    const [data, setData] = useState([]); 

    const [formData, setFormData] = useState({
        title: "",
        image: "",
        content: "",
        creator: user?._id,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const transformFile = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const dataResponse = await fetch(SummaryApi.createBlog.url, {
            method: SummaryApi.createBlog.method,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
    
        const dataApi = await dataResponse.json();
    
        if (dataApi.success) {
            toast.success(dataApi?.message);
            setFormData({ title: "", image: "", content: "", creator: user?._id }); 
            fetchBlogDetails(); 
        } else {
            toast.error(dataApi?.message);
        }
    };
    

    const [loading, setLoading] = useState(false);
    const params = useParams();

    const fetchBlogDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.blogDetails.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify({ blogId: params?.id })
            });

            const dataResponse = await response.json();
            console.log("API Response:", dataResponse);

            if (Array.isArray(dataResponse.data)) {
                setData(dataResponse.data); // Ensure data is an array
            } else {
                setData([]); // Default to an empty array to prevent errors
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
        <div className="min-h-screen bg-gradient-to-br from-purple-300 from-25% via-purple-200 via-40% to-purple-400 to-60% mt-16 ">
            {/* <div className="absolute min-h-64 inset-0 bg-[radial-gradient(white_2px,transparent_2px)] bg-[size:12px_12px] opacity-30"></div> */}
            <div className="container absolute inset-0 bg-[radial-gradient(white_2px,transparent_2px)] bg-[size:12px_12px] opacity-30 z-[-1]"></div>

            <div className="container max-w-5xl mx-auto p-6 z-1000">
                <h1 className="text-3xl text-center mb-6 text-purple-800 font-bold">Latest Blogs on Salary Prediction</h1>

                {/* Blog List Section */}
                <div className="overflow-y-auto min-h-64 bg-white p-4 rounded-lg shadow-md space-y-4 z-50">
                    <h2 className="text-purple-400 text-2xl">Blogs :</h2>
                    <div className="space-y-4">
                        {Array.isArray(data) && data.length > 0 ? (
                            data.map((el, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition">
                                    <div
                                        className="flex items-center space-x-4 cursor-pointer"
                                        onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                        >
                                        <img src={el.image} alt={el.title} className="w-16 h-16 rounded" />
                                        <h2 className="text-lg font-semibold text-gray-800 flex-1">{el.title}</h2>
                                        <span className="text-gray-500 text-xl">
                                            {expandedIndex === index ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />}
                                        </span>
                                        </div>
                                    {expandedIndex === index && (
                                        <p className="mt-2 text-gray-600">{el.content}</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No blogs available...</p>
                        )}
                    </div>
                </div>

                {/* Blog Submission Form */}
                <div className="mt-8 p-6 border rounded-lg shadow-md bg-white z-50">
                    <h2 className="text-xl mb-4 flex items-center text-purple-600">
                        <FaRegEdit className="mr-2" /> Submit Your Blog
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {/* Blog Title */}
                        <label className="block text-sm text-gray-700 mb-2">Blog Title *</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Title Of The Blog"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        {/* Image Upload Section */}
                        <label className="block text-sm text-gray-700 mb-2 mt-4">Upload Image * (Size should be less than 20KB)</label>
                        <input
                            encType="multipart/form-data"
                            type="file"
                            className="w-full p-2 border rounded cursor-pointer"
                            name="image"
                            onChange={transformFile}
                            required
                        />
                        {formData.image && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">Preview:</p>
                                <img src={formData.image} alt="Preview" className="mt-2 w-32 h-32 rounded shadow-md object-cover" />
                            </div>
                        )}

                        {/* Blog Content */}
                        <label className="block text-sm text-gray-700 mb-2 mt-4">Blog Content *</label>
                        <textarea
                            className="w-full p-2 border rounded cursor-pointer"
                            rows="4"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        ></textarea>

                        {/* Submit Button */}
                        <button type="submit" className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 mt-4">
                            Submit Blog
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

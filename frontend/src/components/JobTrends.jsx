import React, { useState, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import { FaSearch } from "react-icons/fa";
import Banner from "./Banner";

const JobTrends = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: "", growth: "", demand: "", category: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const user =useSelector(state => state?.user?.user)

  const navigate = useNavigate();
    const [data, setData] = useState({
        title: "",
        growth: "",
        demand: "",
        category: ""
    });

    const [errors, setErrors] = useState({});
    const validateInputs = () => {
        const errors = {};
        
        if (!/^\d+$/.test(data.growth)) {
            toast.error("growth must be in digits.");
            errors.password = "growth must be in digits.";
        }
        if (!/^\d+$/.test(data.demand)) {
            toast.error("demand must be in digits.");
            errors.password = "demand must be in digits.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name , value } = e.target
        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    };

    const handleDelete = async(id) => {
        const response = await fetch(SummaryApi.DeleteJob.url,{
            method: SummaryApi.DeleteJob.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                    jobId : id
            })
        });

        const dataApi = await response.json();
        if(dataApi.success){
            toast.success(dataApi.message);
            fetchJobDetails();
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
            return;
        }

    const dataResponse = await fetch(SummaryApi.addJob.url,{
        method: SummaryApi.addJob.method,
        headers: {
            "content-type":"application/json"
        },
        credentials : 'include',
        body : JSON.stringify(data)
    })

        const dataApi = await dataResponse.json();

    if(dataApi.success){
        toast.success(dataApi?.message);
        fetchJobDetails();
        setData({ title:"",growth:"",demand:"",category:"" });
    }
    if(dataApi.error){
        toast.error(dataApi?.message)
    }
};

const [loading, setLoading] = useState(false);
    const params = useParams();
    const [jobData, setJobData] = useState([]); 

    const fetchJobDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.jobDetails.url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const dataResponse = await response.json();
            console.log("API Response:", dataResponse);

            if (Array.isArray(dataResponse.data)) {
                setJobData(dataResponse.data); 
            } else {
                setJobData([]); 
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
            setJobData([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJobDetails();
    }, []);

  // Filter jobs based on search
const filteredJobs = jobData.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
);


return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-300 pt-16">
        <div className="container p-6">
        <h1 className="text-4xl text-purple-700 text-center mt-8">Job Market Trends</h1>

        <div className="flex justify-center mt-6">
        <input
            type="text"
            placeholder="Search job roles..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="text-purple-500 w-6 h-6 ml-2 mt-2" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Growth & Demand Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredJobs} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="growth" fill="#6D28D9" barSize={40} name="Growth Rate (%)" />
                <Bar dataKey="demand" fill="#10B981" barSize={40} name="Job Demand (%)" />
            </BarChart>
            </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-5xl mx-auto">
        {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
            filteredJobs.map((el, index) => (
                <div key={el._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition relative">
                    <h2 className="text-2xl font-semibold text-gray-800">{el.title}</h2>
                    <p className="text-gray-500">Category: <span className="text-purple-600">{el.category}</span></p>
                    <p className="text-gray-500">Growth Rate: <span className="font-bold">{el.growth}%</span></p>
                    <p className="text-gray-500">Demand: <span className="font-bold">{el.demand}%</span></p>
                    { user?.role == "ADMIN" ? (
                    <button
                        onClick={() => handleDelete(el._id)}
                        className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs"
                    >
                        Delete
                    </button>
                    ) :(
                        <></>
                    )}
                </div>
            ))
        ) : (
            <p className="text-center text-gray-500 col-span-3">No jobs found.</p>
        )}
        </div>

        { user?.role == "ADMIN" ? (
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl mx-auto mt-12">
                <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Add Job Role</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Job Title"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    name="title"
                    value={data.title} onChange={handleChange} required
                />
                <input
                    type="number"
                    placeholder="Growth Rate (%)"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    name="growth"
                    value={data.growth} onChange={handleChange} required
                />
                <input
                    type="number"
                    placeholder="Job Demand (%)"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    name="demand"
                    value={data.demand} onChange={handleChange} required
                />
                <input
                    type="text"
                    placeholder="Category"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    name="category"
                    value={data.category} onChange={handleChange} required
                />
                </div>
                <button onClick={handleSubmit} className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg w-full">Add Job</button>
            </div>
            ) :(
                <></>
            )}
        </div>
        <Banner />
        <Footer />
    </div>
    );
};

export default JobTrends;

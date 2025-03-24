import React, { useState } from "react";
import Aboutusimg from "../asset/Images/image.png";
import Footer from "../components/Footer";
import { MdMap, MdCall } from "react-icons/md";
import { IoIosMailUnread } from "react-icons/io";
import SummaryApi from "../common";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Aboutus = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        number: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const validateInputs = () => {
        const errors = {};

        if (!/^[A-Za-z\s]{2,}$/.test(data.name)) {
        toast.error("Name must be at least 2 characters and contain only letters.");
        errors.password = "Name must be at least 2 characters and contain only letters.";
        }

        if (!/^[6-9]\d{9}$/.test(data.number)) {
        toast.error("Phone number must be 10 digits.");
        errors.password = "Phone number must be 10 digits.";
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(data.email)) {
        toast.error("Please enter a valid email address.");
        errors.password = "Please enter a valid email address.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) {
        return;
        }

        const dataResponse = await fetch(SummaryApi.aboutusDetail.url, {
        method: SummaryApi.aboutusDetail.method,
        headers: {
            "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
        toast.success(dataApi?.message);
        navigate("/Aboutus");
        setData({ name: "", email: "", number: "", message: "" });
        }
        if (dataApi.error) {
        toast.error(dataApi?.message);
        }
    };

    return (
        <>
        <div className="min-h-screen bg-gradient-to-br from-purple-300 from-25% via-purple-200 via-40% to-purple-400 to-60% mb-10">
            <div className="container mx-auto py-16 px-8">
                <h1 className="text-4xl text-purple-800 font-bold text-center">About Us</h1>
                <div className="mt-8 bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl text-purple-700">Our Mission</h2>
                <p className="text-gray-700 mt-4">
                    At ROC8 Salary Predictor, we are committed to helping professionals and job seekers make informed career 
                    decisions by providing accurate salary predictions based on experience and skills.
                </p>

                <h2 className="text-2xl text-purple-700 mt-8">Why Choose Us?</h2>
                <ul className="list-disc list-inside mt-4 text-gray-700">
                    <li>AI-powered salary predictions</li>
                    <li>Data-driven insights for career growth</li>
                    <li>User-friendly interface</li>
                    <li>Secure and private data handling</li>
                </ul>

                <h2 className="text-2xl text-purple-700 mt-8">Our Team</h2>
                <p className="text-gray-700 mt-4">
                    Our team consists of AI experts, data scientists, and career analysts who work together to bring you 
                    the most accurate salary insights.
                </p>
                </div>
            </div>
            </div>
            <div className="flex items-center justify-center gap-2 border-b border-gray-300 pb-4">
            <h1 className="text-xl font-medium">Need help? Get in touch</h1>
            </div>
            <div className="text-center text-gray-600 text-sm py-4">
            <p>We're here to listen, advise, and help you successfully realize your dreams job</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-10 ">
            <div className="flex items-center gap-4 p-4 rounded-md shadow-md ">
                <MdCall className="text-3xl text-purple-500" />
                <div>
                <h1 className="text-base font-medium">Ring us</h1>
                <a className="text-sm text-gray-700" href="tel:9930089196">
                    (+91) 99300 89196
                </a>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-md shadow-md">
                <MdMap className="text-3xl text-purple-500" />
                <div>
                <h1 className="text-base font-medium">Visit us</h1>
                <p className="text-sm text-gray-700">APSIT, Thane(W) India</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-md shadow-md">
                <IoIosMailUnread className="text-3xl text-purple-500" />
                <div>
                <h1 className="text-base font-medium">Send us an Email</h1>
                <a className="text-sm text-gray-700" href="mailto:help@Roc8.com">
                    help@Roc8.com
                </a>
                </div>
            </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row items-center gap-6 p-4">
            <img className="w-full md:w-1/2 h-{560px}" src={Aboutusimg} alt="Contact" />
            <div className="w-full md:w-1/2 h-{560px}">
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Name *</label>
                    <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-purple-300"
                    placeholder="Apsit Jain"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email *</label>
                    <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-purple-300"
                    placeholder="example@gmail.com"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number *</label>
                    <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-purple-300"
                    placeholder="Phone Number"
                    name="number"
                    value={data.number}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Message *</label>
                    <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring focus:ring-purple-300"
                    placeholder="Start typing..."
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    rows="5"
                    required
                    ></textarea>
                </div>
                <div>
                    <input
                    type="submit"
                    value="Send Message"
                    className="w-full bg-purple-500 text-white text-sm font-medium rounded-lg p-3 border border-gray-700 cursor-pointer hover:bg-purple-600 transition duration-300"
                    />
                </div>
                </form>
            </div>
            </div>
        <Footer />
        </>
    );
};

export default Aboutus;

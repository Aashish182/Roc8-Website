import React, { useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SummaryApi from "../common";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.CourseDetails.url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const dataResponse = await response.json();
      console.log("API Response:", dataResponse);

      if (Array.isArray(dataResponse.data)) {
        setCourses(dataResponse.data);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  return (
    <div className="font-sans flex flex-col min-h-screen text-purple-600 bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60%">
      <div className="container mx-auto px-6 py-16 flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 mt-16 text-purple-600">
          Explore Courses to Upgrade Your Skills
        </h1>

        {loading ? (
          <div className="text-center text-purple-400">Loading Courses...</div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-white/90 text-purple-500 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-transform hover:scale-[1.02]"
              >
                <h2 className="text-2xl font-semibold text-purple-500 mb-3">
                  {course.name}
                </h2>
                <p className="text-purple-500 mb-2">
                  <strong>Platform:</strong> {course.platform}
                </p>
                {course.description && (
                  <p className="text-purple-400 mb-4 text-sm">
                    {course.description}
                  </p>
                )}
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-all font-semibold text-sm flex items-center gap-2 w-max"
                >
                  Study Now <FaExternalLinkAlt size={14} />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-purple-600">
            No courses available at the moment.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Course;

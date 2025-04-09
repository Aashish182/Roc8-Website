
import React, { useEffect, useState } from "react";
import Aboutusimg from "../asset/Images/image.png";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";

const ViewQuery = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const params = useParams();
    console.log(params)
    const fetchViewQueryDetails = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.viewqueryDetails.url, {
          method: SummaryApi.viewqueryDetails.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
          aboutusId: params?.id,
          }),
        });
        setLoading(false);
        const dataResponse = await response.json();
        setData(dataResponse.data);
      };
      useEffect(() => {
        fetchViewQueryDetails();
      }, []);

  return (
    <div className="bg-gradient-to-br from-purple-100 from-25% via-purple-200 via-40% to-purple-100 to-60%">
    <div className="container mt-24 flex flex-col md:flex-row items-center gap-6 p-4">
      <img className="w-full md:w-1/2 h-[560px]" src={Aboutusimg} alt="Query View" />
      <div className="w-full md:w-1/2">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Name</label>
            <div className="p-2 bg-gray-100 mr-8">{data.name}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <div className="p-2 bg-gray-100 mr-8">{data.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
            <div className=" p-2 bg-gray-100 mr-8">{data.number}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Message</label>
            <div className="p-2 bg-gray-100 whitespace-pre-line mr-8">{data.message}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewQuery;

import React, { useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/key";

const CheckReport = ({ selectedJob }) => {
    console.log("jobid in report",selectedJob)
  const [loading, setLoading] = useState(false);
  const [reportUrl, setReportUrl] = useState(null);
  const [error, setError] = useState("");

  // Call FastAPI to get report
  const fetchReport = async () => {
    try {
      setLoading(true);
      setError("");
      setReportUrl(null);

    if(selectedJob){
         // you receive jobId as prop
        const res = await axios.get(
          `${JOB_API_END_POINT}/report/${selectedJob?._id}`
        );
        setReportUrl(res.data.url); // Assuming API response = { url: "https://cloudinary..." }

        console.log("report resp",res.data)
    }

    } catch (err) {
      setError("Failed to fetch report. Try again.");
      console.error("error in fetchReport ",err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <h2 className="text-4xl font-sans font-bold">Recruiter Report</h2>

      {/* Fetch Button */}
     {reportUrl ==null ?  <button
        onClick={fetchReport}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Report"}
      </button> :    <a
            href={reportUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Download Report
          </a>}

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Report Display */}
      {reportUrl && (
        <div className="w-full flex flex-col items-center gap-3">
          <iframe
            src={reportUrl}
            title="Recruiter Report"
            className="w-full h-[500px] border rounded-lg"
          ></iframe>

          {/* Download Button */}
        </div>
      )}
    </div>
  );
};

export default CheckReport;

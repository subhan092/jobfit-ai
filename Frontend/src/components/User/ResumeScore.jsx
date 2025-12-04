import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/key";

const ResumeScore = () => {
  const { user } = useSelector((state) => state.auth);
  const [jobDesc, setJobDesc] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${USER_API_END_POINT}/match-resume`,
        {
          jobDescription: jobDesc,
        }
      );
      setScore(data.score);
    } catch (err) {
      console.error(err);
      alert("Error checking match score");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col mx-8 gap-y-4 my-6">
      <div className="flex flex-col gap-4 ">
        <label htmlFor="">Enter job description</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-700 focus:outline-none"
          rows="5"
          placeholder="Paste job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        ></textarea>
      </div>
      {/* <div className="flex flex-col  gap-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input"
              >
                Upload your Resume
              </label>
              <input
                className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50"
                id="file_input"
                type="file"
                name="file"
              />
            </div> */}
      <button
        onClick={handleCheck}
        className="bg-purple-500 hover:bg-purple-700 transition-all text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Checking..." : "Check Match"}
      </button>
      <div className="space-y-4 shadow-lg shadow-purple-700 rounded-md pl-2 py-8 ">
        <h2 className="text-2xl font-bold  ">
          Resume<span className="text-purple-700 pl-2">Score</span>
        </h2>
        {score && <p className="text-black text-xl font-bold ">{score}%</p>}
      </div>

      <iframe
        src={user?.profile.resume} 
        width="100%"
        height="600px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default ResumeScore;

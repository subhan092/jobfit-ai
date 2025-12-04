import { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { Application_API_END_POINT } from "../utils/key";
import { updateApplicantStatus } from "../redux/AsynThunk/Application";

export default function ManageRanking() {

    const {jobId} = useParams()


  const [candidates, setCandidates] = useState();
  const [status, setStatus] = useState("pending");

  const [loading, setLoading] = useState(false);

const handleStatusChange = async (e, id) => {
      try {
        const newStatus = e.target.value;
        setStatus(newStatus);
        // Call API to update status in DB
        await updateApplicantStatus(id, newStatus);
      } catch (error) {
        console.log("error in ranked candiate staus chanege",error)
      }
  
};


useEffect(() => {
  if (jobId) {
    fetchRankCandidates(jobId);
    console.log("calling ....", jobId)
  }
  }, [jobId]);
  
  // fetch ranked candidates
  const fetchRankCandidates = async (jobId) => {
    try {
      setLoading(true);
      const  {data}  = await axios.get(`${Application_API_END_POINT}/${jobId}/ranked-candidates`);
      console.log("rankedcandiates data",data)
      setCandidates(data);
      console.log("rank state is",candidates)
    } catch (error) {
      console.error("Error fetching ranked candidates:", error);
    toast.error("server error")
    } finally {
      setLoading(false);
    }
    };


  

  

  return (
    <div className="p-6">
      <div className="flex justify-between pb-8">
      <h2 className="text-xl font-bold mb-4">Ranked Candidates of </h2>
      <div className="">
        <Link to={`/admin/reports/${jobId}`}>
          <button
            // onClick={() =>{ setSelect(5), setSelectedJob(selectedJob)}}
            type="button"
            class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Check Report
          </button>
          </Link>
        </div>
      </div>

      {candidates?.length === 0 && !loading ? <p className="text-xl font-bold text-center text-gray-700 ">No candidates found for this job.</p> : 
        <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Resume</th>
            <th className="p-2">Score</th>
            <th className="p-2">Current Status</th>
            <th className="p-2">Update Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <Loader size={30} className="animate-spin text-center p-4"/> : candidates && candidates?.map((c, i) => (
            <tr key={c.application?._id} className="border-t hover:bg-gray-50">
              <td className="p-2">{i + 1}</td>
              <td className="p-2 font-medium">{c.candidate?.name}</td>
              <td className="p-2">{c.candidate?.email}</td>
              <td className="p-2">
                <a
                  href={c.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </td>
              <td className={`p-2 font-bold ${c.score > 50 ? "text-green-500" : "text-red-600"}`}>
                {c.score}%
              </td>
              <td className="p-2">{c.application.status}</td>
              <td className="p-2">
                <select
                  value={c.application?.status}
                  onChange={(e) => handleStatusChange(c.application?._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
              <td className="p-2 flex gap-2">

<a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${c.candidate.email}&su=Regarding%20Your%20Application&body=Hello%20${c.candidate.name},%0D%0AWe%20are%20interested%20in%20your%20profile.`
} target="_blank" rel="noopener noreferrer">
  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-md">
    send email
  </button>
</a>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      } 
    </div>
  );
}


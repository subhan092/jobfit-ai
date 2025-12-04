import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "../ui/shared/Navbar";
import Footer from "../Footer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getJobbyId } from "../../redux/AsynThunk/Job_oprations";
import Looader from "../../Looader";
import { toast } from "react-toastify";
import { jobApply } from "../../redux/AsynThunk/Application";
import { Loader2 } from "lucide-react";


const JobDescription = () => {
  const { jobid } = useParams();
  const dispatch = useDispatch();

  const { job, loading } = useSelector((state) => state.job);
  const { msg, error, load } = useSelector((state) => state.application);
  const { user } = useSelector((state) => state.auth);

  console.log("applyjob msg ", msg);
  console.log("user", user);
  // Check if the user has already applied for this job
  const Applied =
    job?.applications?.some(
      (app) => String(app.applicant) === String(user?._id)
    ) || false;

  console.log("applied", Applied);
  useEffect(
    () => {
      dispatch(getJobbyId(jobid));
    },
    [dispatch, jobid]
  );

  console.log("job",job)
  const handleApplyJob = async (jobid) => {
    try {
      const res = await dispatch(jobApply(jobid)).unwrap(); // 👈 Direct response milega
      toast.success(res.msg || "Applied Successfully! ");
      await dispatch(getJobbyId(jobid))
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Looader />
      ) : (
        <div className="max-w-7xl mx-auto my-12 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-medium">{job?.title}</h1>
              <div className="flex gap-4">
                <Badge>{job?.position}</Badge>
                <Badge>{job?.jobType}</Badge>
                <Badge>{job?.salary}</Badge>
              </div>
            </div>
            <Button
              onClick={() => handleApplyJob(jobid)}
              disabled={Applied || load}
              className={`flex items-center justify-center ${
                Applied ? "bg-gray-800" : "bg-purple-700 hover:bg-purple-500"
              }`}
            >
              {load ? (
                <Loader2 className="w-6 h-6 mx-auto animate-spin" />
              ) : Applied ? (
                "Already Applied"
              ) : (
                "Apply Now"
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Job Description</h2>
            <hr />
            <div className="flex gap-2">
              <h2 className="font-bold">Role:</h2>
              <h3 className="text-gray-800">{job?.title}</h3>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Location:</h2>
              <h3 className="text-gray-800">{job?.location}</h3>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Description:</h2>
              <h3 className="text-gray-800">{job?.description}</h3>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Requirements:</h2>
              <ul className="list-disc pl-5 text-gray-800">
                {job?.requirments?.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Experience:</h2>
              <h3 className="text-gray-800">{job?.experiencelevel}</h3>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Salary:</h2>
              <h3 className="text-gray-800">{job?.salary}</h3>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Total Applicants:</h2>
              <h3 className="text-gray-800">{job?.applications?.length}</h3>
            </div>
            <div className="flex gap-2">
              <h2 className="font-bold">Posted date:</h2>
              <h3 className="text-gray-800">23-02-2025</h3>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default JobDescription;

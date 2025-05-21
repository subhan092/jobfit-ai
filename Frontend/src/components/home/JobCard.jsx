import React from 'react'


const JobCard = ({ job ,index }) => {
    return (
        <div key={index} className="shadow-lg rounded-md p-4 border">
            <h2 className="text-xl font-bold">{job.company?.name}</h2>
            <p className="text-gray-600">{job.location}</p>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-700">{job.description}</p>
            <p className="font-semibold">Positions: <span className="font-light"> {job.position} </span></p>
            <p className="font-semibold">Salary: <span className="font-light"> {job.salary}</span> </p>
            <p className="font-semibold">Job Mode: <span className="font-light"> {job.jobType} </span></p>
            <div className="mt-2">
              {job.jobType}
            </div>
          </div>
    );
  };
  
  export default JobCard;
  
import React, { useEffect } from 'react'
import JobCard from './JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../redux/AsynThunk/Job_oprations';

// const jobs = [
//   {
//     companyName: "Google",
//     country: "USA",
//     jobTitle: "Software Engineer",
//     description: "Develop scalable web applications using modern technologies.",
//     positions: 5,
//     jobType: ["Full-time", "Remote"],
//     jobMode: "Full-time",
//     salary: "$120,000 - $150,000 per year"
//   },
//   {
//     companyName: "Microsoft",
//     country: "Canada",
//     jobTitle: "Frontend Developer",
//     description: "Work on UI/UX for enterprise applications.",
//     positions: 3,
//     jobType: ["Full-time", "Hybrid"],
//     jobMode: "Full-time",
//     salary: "$90,000 - $120,000 per year"
//   },
//   {
//     companyName: "Amazon",
//     country: "UK",
//     jobTitle: "Backend Developer",
//     description: "Design and maintain scalable backend systems.",
//     positions: 4,
//     jobType: ["Full-time", "Remote"],
//     jobMode: "Full-time",
//     salary: "$100,000 - $130,000 per year"
//   },
//   {
//     companyName: "Tesla",
//     country: "Germany",
//     jobTitle: "AI Engineer",
//     description: "Work on AI-powered automation and robotics.",
//     positions: 2,
//     jobType: ["Full-time", "On-site"],
//     jobMode: "Full-time",
//     salary: "$130,000 - $160,000 per year"
//   },
//   {
//     companyName: "Meta",
//     country: "USA",
//     jobTitle: "Data Scientist",
//     description: "Analyze and process big data for insights.",
//     positions: 6,
//     jobType: ["Full-time", "Remote"],
//     jobMode: "Full-time",
//     salary: "$110,000 - $140,000 per year"
//   },
//   {
//     companyName: "Netflix",
//     country: "France",
//     jobTitle: "UI/UX Designer",
//     description: "Create intuitive and visually appealing interfaces.",
//     positions: 2,
//     jobType: ["Part-time", "Remote"],
//     jobMode: "Part-time",
//     salary: "$60,000 - $90,000 per year"
//   },
//   {
//     companyName: "IBM",
//     country: "India",
//     jobTitle: "Cloud Engineer",
//     description: "Manage and optimize cloud infrastructure.",
//     positions: 4,
//     jobType: ["Full-time", "Hybrid"],
//     jobMode: "Full-time",
//     salary: "$80,000 - $110,000 per year"
//   },
//   {
//     companyName: "Adobe",
//     country: "Australia",
//     jobTitle: "DevOps Engineer",
//     description: "Automate and streamline development processes.",
//     positions: 3,
//     jobType: ["Full-time", "Remote"],
//     jobMode: "Full-time",
//     salary: "$100,000 - $130,000 per year"
//   },
//   {
//     companyName: "SAP",
//     country: "Germany",
//     jobTitle: "Cybersecurity Analyst",
//     description: "Ensure the security of enterprise software solutions.",
//     positions: 5,
//     jobType: ["Full-time", "On-site"],
//     jobMode: "Full-time",
//     salary: "$90,000 - $120,000 per year"
//   },
//   {
//     companyName: "Spotify",
//     country: "Sweden",
//     jobTitle: "Mobile App Developer",
//     description: "Develop and enhance mobile applications.",
//     positions: 2,
//     jobType: ["Part-time", "Remote"],
//     jobMode: "Part-time",
//     salary: "$70,000 - $100,000 per year"
//   }
// ];



const LatestJobs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllJobs())
  }, [])
  
 const {jobs} =  useSelector((state)=>state.job)
  return (
    <div className='w-full px-12 my-20 flex flex-col gap-8 '>
      <h2 className='text-4xl font-bold'> <span className='text-purple-700'>Latest & top</span> jobs Opening</h2>
      <div className="grid gap-8  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jobs?.length < 0 ? "no jobs found" : jobs?.slice(0,6).map((item,index)=>
      <JobCard job={item} index={index} />)}
      </div>
    </div>
  )
}

export default LatestJobs
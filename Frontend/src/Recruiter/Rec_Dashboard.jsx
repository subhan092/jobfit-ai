import React, { useState } from 'react'
import Navbar from '../components/ui/shared/Navbar'
import Sidbar from '../components/User/Sidbar'
import CompaniesTable from './CompaniesTable'
import PostedJobTable from './PostedJobTable'
import Ranked_Applicant from './Ranked_Applicant'
import { FaWpforms } from "react-icons/fa";
import { AiOutlineDatabase } from "react-icons/ai";
import { GrOrganization } from "react-icons/gr";
import { TbUsersGroup } from "react-icons/tb";
import { PiRankingDuotone } from "react-icons/pi";

import Job_Post from './Job_Post'
import Applicants from './Applicants'
import CheckReport from './CheckReport'
import { File } from 'lucide-react'


const Rec_Dashboard = () => {
    const [ select , setSelect ] = useState(0);
  const sidbar_items= [{"key": "Companies" , "icon": <GrOrganization />
  }, {"key": "Posted jobs" , "icon": <AiOutlineDatabase />
  } , {"key": "New job Post","icon": <FaWpforms />}, {"key": "Candidates" ,"icon":<TbUsersGroup />
  } , {"key": "Ranked Candidate" , "icon": <PiRankingDuotone />
  } ,
  {"key":"Download Report", "icon" : <File/>}

]

  const [selectedJob, setSelectedJob] = useState(null);
  return (
    <>
    <Navbar/>
    <div className='w-full h-screen flex gap-4 '>
      <div className="w-[17rem] max-h-screen">
       {sidbar_items?.map((item ,index) => 
            <Sidbar  select={select} setSelect={setSelect} 
            item={item} index={index}
            />
       )}
      </div>
      <div className="w-[80%]">
       {
         select === 0 ? <CompaniesTable/> : null
       }
       {
         select === 1 ? <PostedJobTable setSelect={setSelect} setSelectedJob={setSelectedJob} /> : null
       }
        {
         select === 2 ? <Job_Post/> : null
       }
        {
         select === 3 ? <Applicants selectedJob={selectedJob}/>  : null
       }
       {
         select === 4 ? <Ranked_Applicant setSelect={setSelect} setSelectedJob={setSelectedJob} selectedJob={selectedJob}/>  : null
       }
       {
        select === 5 ? <CheckReport selectedJob={selectedJob} /> : null
       }
      </div>
   </div>
    </>
)
}

export default Rec_Dashboard
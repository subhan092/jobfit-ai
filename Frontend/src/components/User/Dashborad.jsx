import React, { useState } from 'react'
import Profile from './Profile'
import Sidbar from './Sidbar'
import AppliedJobs from './AppliedJobs'
import Navbar from '../ui/shared/Navbar'
import ResumeScore from './ResumeScore'
import { CgProfile } from "react-icons/cg";
import { FileUser, Route, User } from 'lucide-react'
import { AiOutlineNumber } from "react-icons/ai";

const Dashboard = () => {
  const [select, setSelect] = useState(0)
  const sidebarItems = [
    { key: 'Profile' , icon: <CgProfile /> },
    { key: 'Applied Jobs' ,icon: <FileUser/> },
    { key: 'Resume Score' , icon: <AiOutlineNumber />
    },
  ]

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex gap-4">
          <div className="w-[17rem] max-h-screen">
          {sidebarItems.map((item, index) => (
            <Sidbar
              key={index} // Always provide a unique key
              select={select}
              setSelect={setSelect}
              item={item}
              index={index}
            />
          ))}
        </div>
        
        <div className="w-[80%]">
          {select === 0 && <Profile />}
          {select === 1 && <AppliedJobs />}
          {select === 2 && <ResumeScore />}
        </div>
      </div>
    </>
  )
}

export default Dashboard

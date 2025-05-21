import { useDispatch, useSelector } from 'react-redux';
import Card from './Card'
import React, { useEffect } from 'react'
import { fetchDashboardStats } from '../redux/AsynThunk/DB-Stats';
import { FaUsers, FaWpforms } from "react-icons/fa";
import { UserCircle2Icon } from 'lucide-react';
import { HiOfficeBuilding } from "react-icons/hi";


const AdminHome = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchDashboardStats());
      }, []);
    const { users, jobs, applications, latest } = useSelector((state) => state.dashboard);
    console.log(users.candidates)
  return (
    <div className='mx-auto flex flex-col gap-6 justify-center'>
        <h2 className='font-bold text-2xl shadow-purple-500 '>Admin Dashoard</h2>
        <div className="grid grid-cols-3 gap-6 ">
            <Card icon={<FaUsers size={37} color='purple'/>} color="red"  title={"Total Users"} value={users.total}/>
            <Card icon={<UserCircle2Icon size={37} color='purple'/>} color="purple" title={"Total Candidates"} value={users.candidates}/>
            <Card  icon={<HiOfficeBuilding  size={37} color='purple'/>} color="green" title={"Total Recuriters"} value={users.recruiters}/>

        </div>
    </div>
  )
}

export default AdminHome
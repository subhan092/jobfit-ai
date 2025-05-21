import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
// import { Badge } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import axios from 'axios'
import { Application_API_END_POINT } from '../../utils/key'
import { Loader2 } from 'lucide-react'
  
const AppliedJobs = () => {
  const [job , setJob] = useState([])
  const [Loading ,setLoading] = useState(true)
  const getAppliedJob = async()=>{
    axios.withCredential = true
    try {
      setLoading(true)
      const resp = await axios.get(`${Application_API_END_POINT}/get`)
        if (resp.data) {
          setJob(resp.data.applications)
        }
    } catch (error) {
      console.log("error in get applied jobs",error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
   getAppliedJob()
  }, [])
  console.log("apllid jobs is",job)
  return (
    <div>
   <Table>
  <TableCaption>A list of Applied jobs.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead>Job Role</TableHead>
      <TableHead>Company</TableHead>
      <TableHead className="text-right">Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
     { Loading ? <div className="w-full mx-auto"><Loader2 size={30} className='  w-8 h-8 animate-spin'></Loader2></div> :
       job.length > 0 ?  job.map((item,index)=>(
        <TableRow key={index}>
           <TableCell className="font-medium">23-03-2025</TableCell>
           <TableCell>{item?.job?.title}</TableCell>
           <TableCell>{item?.job?.company?.companyName}</TableCell>
           <TableCell className="text-right"><Badge>{item?.status}</Badge></TableCell>
        </TableRow>
       )) : <div>No jobs found  </div>
     }
  </TableBody>
</Table>

    </div>
  )
}

export default AppliedJobs

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useDispatch, useSelector } from 'react-redux';
import { getApplicants } from '../redux/AsynThunk/Application';
import { MailIcon } from 'lucide-react';


const ManageApplications = () => {
    const {jobid} = useParams()
  const { applicants} = useSelector((state) => state.application);
    const [searchItem , setsearchItem] = useState("")
  
    const searchedApplicant = applicants && applicants?.filter((item)=>item.applicant?.name.toLowerCase().includes(searchItem.toLowerCase()))

  const dispatch = useDispatch()
  useEffect(() => {
    const getapplicants = async () => {
      if (jobid) {
        console.log("Fetching applicants for Job ID:", jobid);
        await dispatch(getApplicants(jobid));
      }
    };
  
    getapplicants();
  }, [dispatch, jobid]); 
  
  

console.log("applicants",applicants)
  return (

      <div className="px-10">
        <div className="flex  pt-8 pb-4  justify-between">
          <div className="">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={searchItem}
                onChange={(e)=>setsearchItem(e.target.value)}
                id="default-search"
                class="block w-full p-4 px-14 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Applicant name..."
                required
              />
              {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </div>
        </div>
        <hr />
        <div>
      {searchedApplicant && searchedApplicant?.length === 0 ? (
        <p className="text-center">No Applicants found for this job.</p>
      ) : (
        <Table>
          <TableCaption>A list of Candidates</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Fullname</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="">Resume</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="text-right">Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {searchedApplicant && searchedApplicant?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.applicant?.name}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="">
                  <a 
                    href={item?.applicant?.profile?.resume} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </TableCell>
                <TableCell className="">{item?.status}</TableCell>
                <TableCell className="text-right">
                  <button className="bg-purple-500 hover:bg-purple-700 transition text-white px-6 py-4 rounded-xl">
                    <MailIcon/>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
      </div>
     )
}

export default ManageApplications
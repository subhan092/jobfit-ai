import React, { useEffect, useState } from 'react'
import { Link, Links } from 'react-router-dom'
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
import { getpostedJob } from '../redux/AsynThunk/Job_oprations';

const PostedJobTable = ({setSelect,setSelectedJob}) => {

  const [searchItem , setsearchItem] = useState("")

  const [error, setError] = useState("");

  const {jobs} = useSelector((state)=>state.job)
    const dispatch = useDispatch()
  useEffect(() => {
    
  dispatch(getpostedJob())
  }, [dispatch]);
 

  const searchedJob = jobs?.filter((job)=>job.title.toLowerCase().includes(searchItem.toLowerCase()))
  return (
<>
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
                placeholder="Search job title..."
                required
              />
              {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </div>
          <div className="">
          <button
          onClick={()=>setSelect(2)}
              type="button"
              class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Post new job
            </button> 

          </div>
        </div>
        <hr />
        <div className="">
          {searchedJob.length === 0 ? (
            <p className='text-center'>No Jobs  found.</p>
          ) : (
            searchedJob &&
            searchedJob.map((item, index) => {
              return (
                <Table>
                  <TableCaption>A list of My posted jobs</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">job Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="">Experience</TableHead>
                      <TableHead className="">Salary</TableHead>
                      <TableHead className="">Candidates</TableHead>
                      <TableHead>Ranking</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="">
                      <TableCell className="font-medium">{item?.title}</TableCell>
                      <TableCell>{item?.company?.name}</TableCell>
                      <TableCell>{item?.location}</TableCell>
                      <TableCell className="">
                        {item?.experiencelevel}
                      </TableCell>
                       <TableCell className="">{item?.salary}</TableCell>
                        <TableCell> <button
          onClick={() => {
            setSelect(3); 
            setSelectedJob(item);
          }}
              type="button"
              class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              View
            </button></TableCell>
            <TableCell><button className='text-blue-500 font-medium hover:underline active:text-purple-700' onClick={()=>setSelect(4)}>Check</button></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              );
            })
          )}
        </div>
      </div>
    </>  )
}

export default PostedJobTable
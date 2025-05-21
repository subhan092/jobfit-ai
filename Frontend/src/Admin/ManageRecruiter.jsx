import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../redux/AsynThunk/usersThunk'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Cross, Delete, Eye, LucideView } from 'lucide-react'
import { Link } from 'react-router-dom'

const ManageRecruiter = () => {

    const dispatch = useDispatch()
     useEffect(() => {
       dispatch(fetchAllUsers())
     }, [])
     
     const {users} = useSelector((state)=>state.users)
        const [searchItem , setsearchItem] = useState("")
        const Recruiters = users && users.recruiters?.filter((item)=>item.name?.toLowerCase().includes(searchItem.toLowerCase()))
        
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
            placeholder="Search Recruiter name..."
            required
          />
        </div>
      </div>

    </div>
    <hr />
    <div>
  {Recruiters.length === 0 ? (
    <p className="text-center">No User found.</p>
  ) : (
    <Table className="overflow-y-scroll mb-6">
      <TableCaption>A list of Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Fullname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="">View Profile</TableHead>
          <TableHead className="">View Jobs</TableHead>
          <TableHead className="">Action</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {Recruiters && Recruiters?.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item?.name}</TableCell>
            <TableCell>{item?.email}</TableCell>
            <TableCell>{item?.phoneNumber}</TableCell>
            <TableCell className="">
              <Link to={`/admin/user/${item._id}`}>
              <button className="bg-purple-500 hover:bg-purple-700 transition text-white p-2 rounded-xl">
                <Eye/>
              </button>
              </Link>
            </TableCell>
            <TableCell className=""> 
            <Link to={`/admin/jobs/${item._id}`}>
              <button className="bg-yellow-300 hover:bg-yellow-400 transition text-black p-2 rounded-xl">
                <Eye/>
              </button>
              </Link>
            </TableCell>
            <TableCell><Delete/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</div>
  </div>
  )
}

export default ManageRecruiter
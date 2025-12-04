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
import { deleteUserbyId } from '../redux/AsynThunk/User_Auth'

const ManageRecruiter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const dispatch = useDispatch()
     useEffect(() => {
       dispatch(fetchAllUsers())
     }, [])

     const handleDelete = async(userid)=>{
         try {
           await dispatch(deleteUserbyId(userid))
           dispatch(fetchAllUsers());
         } catch (error) {
           console.log("error in admin delete recruiter",error)
         }
       }
     
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
          <TableRow key={item?._id || index}>
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
            <TableCell>
                      <button
                        onClick={() =>{
                          setSelectedUserId(item._id)
                          setIsOpen(true)
                          }}
                        className="block text-white bg-red-600 transition-all hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        type="button"
                      >
                        Remove
                      </button>
                      {selectedUserId === item._id && isOpen && (
                        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-200 bg-opacity-50">
                          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md relative">
                            <button
                              onClick={() =>{  setSelectedUserId(null)
                                setIsOpen(false)
                              }}
                              type="button"
                              className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              ✕<span className="sr-only">Close modal</span>
                            </button>
                            <div className="text-center">
                              <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to Remove {item?.name}
                              </h3>
                              <button
                                onClick={() => {
                                  setSelectedUserId(null)
                                  handleDelete(item?._id)
                                }}
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                              >
                                Yes, I'm sure
                              </button>
                              <button
                                onClick={() =>{ 
                                  setSelectedUserId(null)
                                  setIsOpen(false)
                                  }}
                                className="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                              >
                                No, cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
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

export default ManageRecruiter
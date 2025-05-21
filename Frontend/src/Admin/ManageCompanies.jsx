import React, { useEffect, useState } from "react";
import { PiDotsThreeOutline } from "react-icons/pi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, Eye, Loader, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies } from "../redux/AsynThunk/Company";

const ManageCompanies = () => {
  // const [companes, setCompanies] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const {companies , loading} = useSelector((state)=>state.company)
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCompanies())
  }, [dispatch])
  

  

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                id="default-search"
                class="block w-full p-4 px-14 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-700 focus:border-purple-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Companies..."
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </div>
        </div>
        <hr />
        <div className="">
  {loading ? ( 
    <p className="text-center text-purple-700 text-xl font-medium">Loading .... </p> 
  ) : filteredCompanies.length === 0 ? ( 
    <p>No companies found.</p> 
  ) : (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Logo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Website</TableHead>
          <TableHead className="text-right">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredCompanies.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium"><img src={item.logo}></img></TableCell>
            <TableCell>{item?.name}</TableCell>
            <TableCell>{item?.location}</TableCell>
            <TableCell className="text-right">{item?.website}</TableCell>
            <TableCell className="text-right">
              <Link to={`/company/${item._id}`}>
              <button className="bg-purple-500 hover:bg-purple-700 transition text-white p-2 rounded-xl">
                <Eye/>
              </button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}
</div>


      </div>
    </>
  );
};

export default ManageCompanies;

import axios from 'axios';

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Company_API_END_POINT } from '../utils/key';
import Navbar from '../components/ui/shared/Navbar';
// import { setSingleCompany } from '../redux/reducers/companySlice';
import { ArrowLeftIcon, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Registor_Company = () => {
    const [name , setName] = useState("");
    const [file , setfile] = useState(null);
    const [description , setDescription] = useState("");
    const [location , setLocation] = useState("");
    const [website , setWebsite] = useState("");

    const navigate = useNavigate(); 
    
    const dispatch = useDispatch()
    const [loading,setLoading]  = useState(false)
   const handleRegistor = async (e) => {
       setLoading(true)
       e.preventDefault(); 
       const formData = new FormData();
       formData.append("name", name);
       formData.append("location", location);
       formData.append("description", description);
       formData.append("website", website);
       if (file) {
           formData.append("file", file);
       }
       console.log("State values:", { name, description ,website,location,file});
          console.log(formData)
          
       try {
        setLoading(true)
           const response = await axios.post(`${Company_API_END_POINT}/registor`, { name, description ,website,location,file}, {
            headers: { "Content-Type": "multipart/form-data" },
               withCredentials: true,
           });
           if (response.data.success) {
               toast.success(response.data.message);
            //    dispatch(setSingleCompany(response.data.company))
               navigate('/recruiter/dashboard')
           }
           
       } catch (error) {
           toast.error(error.response?.data?.message || "Registration failed");
           console.error("Error in registration", error);
       }
       finally{
        setLoading(false)
       }
   };
   console.log("name",name)

   return (
     <>
     <Navbar/>
     <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
      <div className="self-start">
      <Link to={'/recruiter/dashboard'}>     <ArrowLeftIcon size={33} className='text-purple-700  hover:bg-purple-700 hover:text-white'/>
      </Link>
      </div>
           <form className="w-[80%] md:w-1/2 space-y-[1rem] py-4 mb-[2rem]" onSubmit={handleRegistor}>
               <h2 className="text-[2rem] font-bold font-sans">Company Registoration</h2>
               
               {/* Name Field */}
               <div className="">
                   <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Company Name</label>
                   <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} 
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="" required />
               </div>

               <div className="">
                   <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">Descrition</label>
                   <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" required />
               </div>
              
               <div className="">
                   <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Website</label>
                   <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} 
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="site link" required />
               </div>
                
               <div className="">
                   <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                   <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} 
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="John Doe" required />
               </div>
            
               <div className="">
                   <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Logo</label>
                   <input className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50" id="file_input"
                       type="file" name="file"  onChange={(e) => setfile(e.target.files?.[0])} />
               </div>

               {/* Submit Button */}
               <button type="submit" className="bg-purple-600 w-full text-white py-2 px-4 rounded-lg">
               {loading ? <Loader2 className="w-6 h-6 mx-auto animate-spin"/> : "Registor"}
               </button>
           </form>
       </div>
     </>
   );
};

export default Registor_Company
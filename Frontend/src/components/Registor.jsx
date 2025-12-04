import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { USER_END_POINT } from "../endPoint";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/authslice";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";

const Registor = () => {
    const [role , setRole] = useState("");
    const [name , setName] = useState("");
    const [password , setPassword] = useState("");
    const [file , setfile] = useState(null);
    const [email , setEmail] = useState("");
    const [phoneNumber , setphoneNumber] = useState("");

    const navigate = useNavigate(); 
    const {Loading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()

   const handleRegistor = async (e) => {
       e.preventDefault(); 
       const formData = new FormData();
       formData.append("role", role);
       formData.append("name", name);
       formData.append("email", email);
       formData.append("password", password);
       formData.append("phoneNumber", phoneNumber);
       if (file) {
           formData.append("file", file);
       }
       console.log("State values:", { name, email ,password,phoneNumber,file});
          console.log(formData)
    
       try {
        dispatch(setLoading(true))
           const response = await axios.post(`${USER_END_POINT}/registor`, formData, {
               headers: { "Content-Type": "multipart/form-data" },
               withCredentials: true,
           });
           setEmail("")
           setPassword("")
           setphoneNumber("")
           setName("")
           setfile("")
           setRole("")
           if (response.data.success) {
              toast.success(response.data.message || "hello .........");
              localStorage.setItem("verify-email",response?.data?.user?.email)
              navigate("/verify-email")
           }
           
       } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.error("Error in registration", error);
       }
       finally{
        dispatch(setLoading(false))
       }

   };

   return (
     <>
     <Navbar/>
     <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
           <form className="w-[80%] md:w-1/2 space-y-[1rem] py-4 mb-[2rem]" onSubmit={handleRegistor}>
               <h2 className="text-[2rem] font-bold font-sans">Register</h2>
               
               {/* Name Field */}
               <div className="">
                   <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                   <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} 
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="John Doe" required />
               </div>

               {/* Email Field */}
               <div className="">
                   <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                   <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" placeholder="name@example.com" required />
               </div>

               {/* phoneNumber Number Field */}
               <div className="">
                   <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900">phoneNumber Number</label>
                   <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setphoneNumber(e.target.value)}
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" required />
               </div>

               {/* Password Field */}
               <div className="">
                   <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                   <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                       className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" required />
               </div>

               {/* Role Selection */}
               <div className="flex items-center gap-x-[1.5rem]">
                   <span>Select your role:</span>
                   <div className="flex items-center">
                       <input id="user-role" type="radio" value="user" name="role" checked={role === 'user'} 
                           onChange={(e) => setRole(e.target.value)} className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                       <label htmlFor="user-role" className="ms-2 text-sm font-medium text-gray-900">User</label>
                   </div>
                   <div className="flex items-center">
                       <input id="recruiter-role" type="radio" value="recruiter" name="role" checked={role === 'recruiter'}
                           onChange={(e) => setRole(e.target.value)} className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500" />
                       <label htmlFor="recruiter-role" className="ms-2 text-sm font-medium text-gray-900">Recruiter</label>
                   </div>
               </div>

               {/* Profile Photo Upload */}
               <div className="">
                   <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">Upload Photo</label>
                   <input className="block w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50" id="file_input"
                       type="file" name="file" onChange={(e) => setfile(e.target.files?.[0])} />
               </div>

               {/* Submit Button */}
               <button type="submit" className="bg-purple-600 w-full text-white py-2 px-4 rounded-lg">
               {Loading ? <Loader2 className="w-6 h-6 mx-auto animate-spin"/> : "Registor"}
               </button>

               {/* Login Link */}
               <p className="mt-2 text-sm">
                   Already have an account? 
                   <Link to="/login" className="text-purple-700 underline pl-2">Login</Link>
               </p>
           </form>
       </div>
     <Footer/>
     </>
   );
};

export default Registor;

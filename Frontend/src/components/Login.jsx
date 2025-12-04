import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { USER_END_POINT } from "../endPoint";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/authslice";
import { Loader2 } from "lucide-react";
import Navbar from "./ui/shared/Navbar";
import Footer from "./Footer";


const Login = () => {

  const {Loading } = useSelector((state)=>state.auth)
  const [data,setData] = useState({
    password:"",
    email:"",
    role:""
  })
  const dispatch = useDispatch()


 const handleChange = (e)=>{
  const field = e.target.name; 
  const value = e.target.value;

  setData((prevData) => ({
      ...prevData,  
      [field]: value  
  }));
 }

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      await axios.post(`${USER_END_POINT}/login`,data,{
        headers:{
          "Content-Type":"application/json"
        },withCredentials:true
      }).then((res)=>{
        if (res.data.message) {
          toast.success(res.data.message)
          window.location.reload(true);
        
        }

      })
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log("error in login",error)
    }
    finally{
      dispatch(setLoading(false))
    }
};
console.log("hello")

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto flex flex-col justify-center items-center">
      <form onSubmit={handleLogin} className="w-[80%] md:w-1/2 space-y-[1rem] py-4 mb-[2rem]">
        <h2 className="text-[2rem] font-bold font-sans ">Login</h2>
        <div className="">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="text"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
            />
          </div>
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            name='password'
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            password
          </label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required
          />
        </div>
        <div className="flex  items-center gap-x-[1.5rem] ">
            <span>Select your role:</span>
          <div className="flex items-center ">
            <input
              id="default-radio-1"
              type="radio"
              checked={data.role === 'user'}
              onChange={handleChange}
              value='user'
              // required={true}
              name="role"
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              User
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              checked={data.role === 'recruiter'}
              onChange={handleChange}
              name="role"
              // required={true}
              value='recruiter'
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Recruiter
            </label>
          </div>
          <div className="flex items-center ">
            <input
              id="default-radio-1"
              type="radio"
              checked={data.role === 'admin'}
              onChange={handleChange}
              value='admin'
              // required={true}
              name="role"
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Admin
            </label>
          </div>
        </div>
        <div className="">
          <h3 className="">
            Don'nt have Account?
            <Link className="underline pl-4 text-purple-700" to={"/registor"}>
              Registor
            </Link>{" "}
          </h3>
        </div>
        <div className="">
        <Link className=" hover:underline  text-purple-700" to={"/forgot-password"}>
              Forgot Password?
            </Link>{" "}
        </div>
        
        <button
          type="submit"
          className="text-white bg-gradient-to-r w-full from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          {Loading ? <Loader2 className="w-6 h-6 mx-auto animate-spin"/> : "Login"}
        </button>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Login;

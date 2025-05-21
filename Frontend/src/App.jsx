import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/shared/Navbar"; // Example page
import Home from "./pages/Home";
import Registor from "./components/Registor";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Jobs from "./pages/Jobs";
import Footer from "./components/Footer";
import Browse from "./pages/Browse";
import Profile from "./components/User/Profile";
import JobDespcrition from "./components/Jobs/JobDespcrition";
import Dashborad from "./components/User/Dashborad";
import { useDispatch } from "react-redux";
import { looadUser } from "./redux/AsynThunk/User_Auth";
import Rec_Dashboard from "./Recruiter/Rec_Dashboard";
import Registor_Company from "./Recruiter/Registor_Company";
import Job_Post from "./Recruiter/Job_Post";
import UserRoute from "./Protected_Routes/UserRoute";
import RecruiterRoute from "./Protected_Routes/RecruiterRoute";
import LoginRoute from "./Protected_Routes/LoginRoute";
import Dashboard from "./Admin/AdminDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminHome from "./Admin/AdminHome";
import ManageUser from "./Admin/ManageUser";
import ManageRecruiter from "./Admin/ManageRecruiter";
import AdminProtectedRoute from "./Protected_Routes/AdminProtectedRoute";
import CompanyProfile from "./Recruiter/CompanyProfile";
import GenralRoute from "./Protected_Routes/GenralRoute";
import ManageCompanies from "./Admin/ManageCompanies";
import ManageJobs from "./Admin/ManageJobs";
import ManageApplications from "./Admin/ManageApplications";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(looadUser())
  }, [])
  
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginRoute> <Login/> </LoginRoute>}/>
        <Route path="/registor" element={<LoginRoute> <Registor/> </LoginRoute>}/>
        <Route path="/jobs" element={<Jobs/>}/>
        <Route path="/browse" element={<Browse/>}/>
        <Route path="/dashboard" element={<UserRoute> <Dashborad/> </UserRoute>}/>
        <Route path="/job/:jobid" element={<JobDespcrition/>}/>

        {/* Recruiter  */}
        <Route path="/recruiter/dashboard" element={<RecruiterRoute> <Rec_Dashboard/> </RecruiterRoute>}/>
        <Route path="/registor/company" element={<RecruiterRoute> <Registor_Company/> </RecruiterRoute>}/>
        <Route path="/job-post" element={<RecruiterRoute> <Job_Post/> </RecruiterRoute>}/>

        {/* Admin */}
        <Route path="/admin/" element={<AdminProtectedRoute> <AdminDashboard/></AdminProtectedRoute>}>
          <Route  path="dashboard" index element={<AdminHome/>}></Route>
          <Route path="users" element={<ManageUser/>  }></Route>
          {/* admin view user profile */}
          <Route path="user/:id" element={<Profile adminView={true}/>} ></Route>
          <Route path="recruiters" element={<ManageRecruiter/>  }></Route>
          <Route path="companies" element={<ManageCompanies/>}></Route>
          <Route path="jobs/:id" element={<ManageJobs/>}></Route>
          <Route path="applications/:jobid" element={<ManageApplications/>}></Route>
        </Route>

        {/* genral route */}

        <Route path="/company/:id" element={<GenralRoute><CompanyProfile/></GenralRoute>}></Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;

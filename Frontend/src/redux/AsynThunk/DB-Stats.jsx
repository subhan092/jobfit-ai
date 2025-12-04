import { createAsyncThunk } from "@reduxjs/toolkit";
import { Application_API_END_POINT, JOB_API_END_POINT, USER_API_END_POINT } from "../../utils/key";
import axios from "axios";

export const fetchDashboardStats = createAsyncThunk("admin/fetchStats", async () => {
  axios.defaults.withCredentials = true

    const [userRes, jobRes, appRes, latestRes] = await Promise.all([
      axios.get(`${USER_API_END_POINT}/total-users`),
      axios.get(`${JOB_API_END_POINT}/total-jobs`),
      axios.get(`${Application_API_END_POINT}/total-applications`),
      axios.get(`${JOB_API_END_POINT}/latest-data`),
    ]);
  
    return {
      users: userRes.data,
      jobs: jobRes.data.totalJobs,
      applications: appRes.data.totalApplications,
      latest: latestRes.data,
    };
  });
  
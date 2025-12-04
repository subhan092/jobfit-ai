import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardStats } from "../AsynThunk/DB-Stats";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
      users: {},
      jobs: 0,
      applications: 0,
      latest: { latestJobs: [], latestApplicants: [] },
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchDashboardStats.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchDashboardStats.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload.users;
          state.jobs = action.payload.jobs;
          state.applications = action.payload.applications;
          state.latest = action.payload.latest;
        })
        .addCase(fetchDashboardStats.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
export default  dashboardSlice.reducer
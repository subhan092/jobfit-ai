import { createSlice } from "@reduxjs/toolkit";
import { fetchPendingRecruiters, updateRecruiterStatus } from "../AsynThunk/usersThunk";

const recruiterSlice = createSlice({
  name: "recruiter",
  initialState: {
    loading: false,
    recruiters: [],
    error: null,
    statusUpdateSuccess: false, 

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingRecruiters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingRecruiters.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiters = action.payload;
      })
      .addCase(fetchPendingRecruiters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder
      .addCase(updateRecruiterStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRecruiterStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.statusUpdateSuccess = true;
      })
      .addCase(updateRecruiterStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recruiterSlice.reducer;

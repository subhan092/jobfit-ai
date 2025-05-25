import { createSlice } from "@reduxjs/toolkit";
import { deleteJobbyId, getAllJobs, getJobbyId, getpostedJob, getRecuriterJob } from "../AsynThunk/Job_oprations";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        loading: false,
        job : {}  ,
        msg:"",
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(getAllJobs.pending, (state) => {
            state.loading = true;  
        });
        builder.addCase(getAllJobs.fulfilled, (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
        });
        builder.addCase(getAllJobs.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getJobbyId.pending, (state) => {
            state.loading = true;  
        });
        builder.addCase(getJobbyId.fulfilled, (state, action) => {
            state.job = action.payload;
            state.loading = false;
        });
        builder.addCase(getJobbyId.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getpostedJob.pending, (state) => {
            state.loading = true;  
        });
        builder.addCase(getpostedJob.fulfilled, (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
        });
        builder.addCase(getpostedJob.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(getRecuriterJob.pending, (state) => {
            state.loading = true;  
        });
        builder.addCase(getRecuriterJob.fulfilled, (state, action) => {
            state.jobs = action.payload;
            state.loading = false;
        });
        builder.addCase(getRecuriterJob.rejected, (state) => {
            state.loading = false;
        });

        builder.addCase(deleteJobbyId.pending, (state) => {
            state.loading = true;
          })
        builder.addCase(deleteJobbyId.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload
          })
        builder.addCase(deleteJobbyId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    }
});

export default jobSlice.reducer;

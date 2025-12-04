import { createSlice } from "@reduxjs/toolkit";
import { getApplicants, jobApply } from "../AsynThunk/Application";


const applicationSlice = createSlice({
    name: "application",
    initialState: {
        msg: "",
        load: false,
        error: "" ,
        applicants: []
    },

    extraReducers: (builder) => {
        builder.addCase(jobApply.pending, (state) => {
            state.load = true;
            state.error = ""; 
        });

        builder.addCase(jobApply.fulfilled, (state, action) => {
            state.load = false;
            state.msg = action.payload;
        });

        builder.addCase(jobApply.rejected, (state, action) => {
            state.load = false;
            state.error = action.payload;  
        });

        builder.addCase(getApplicants.pending, (state) => {
            state.load = true;
        });

        builder.addCase(getApplicants.fulfilled, (state, action) => {
            state.load = false;
            state.applicants = action.payload;
        });

        builder.addCase(getApplicants.rejected, (state, action) => {
            state.load = false;
        });
    }
});

export default applicationSlice.reducer;

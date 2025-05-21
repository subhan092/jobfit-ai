import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { JOB_API_END_POINT } from "../../utils/key";




export const getAllJobs = createAsyncThunk("getAllJobs", async (searchTerm, { rejectWithValue }) => {
    try {
        const resp = await axios.get(`${JOB_API_END_POINT}/get/all?keyword=${searchTerm ? searchTerm : ""}`);
        return resp.data.jobs;  
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
});




export const getJobbyId = createAsyncThunk("getJobbyId", async (jobid, { rejectWithValue }) => {
    try {
        const resp = await axios.get(`${JOB_API_END_POINT}/get/${jobid}`);
        return resp.data.job;  // ✅ Correct return
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
});

export const getpostedJob = createAsyncThunk("getpostedJob", async (_, { rejectWithValue }) => {
    try {
        const resp = await axios.get(`${JOB_API_END_POINT}/get`);
        return resp.data.jobs;  
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
});

export const getRecuriterJob = createAsyncThunk("getRecuriterJob", async (id, { rejectWithValue }) => {
    try {
        const resp = await axios.get(`${JOB_API_END_POINT}/get/recruiter/${id}`);
        return resp.data.jobs;  
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
});
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Company_API_END_POINT } from "../../utils/key";

export const fetchCompanies = createAsyncThunk(
    "company/fetchCompanies",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${Company_API_END_POINT}/get`, {
                withCredentials: true
            });
            return data.companes;  
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch companies");
        }
    }
);

export const fetchCompanybyId = createAsyncThunk(
    "company/fetchCompanybyId",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${Company_API_END_POINT}/${id}`, {
                withCredentials: true
            });
            return data.company;  
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch companies");
        }
    }
);


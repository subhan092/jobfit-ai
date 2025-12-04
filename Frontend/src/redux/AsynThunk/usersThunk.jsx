// src/redux/AsynThunk/userThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/key"; // Adjust path accordingly

export const fetchAllUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    axios.defaults.withCredentials = true;
    const res = await axios.get(`${USER_API_END_POINT}/get-all-users`);
    return res.data;  
  } catch (error) {
    return rejectWithValue(error.response.data.message || "Something went wrong");
  }
});


export const fetchUserById = createAsyncThunk("user/fetchById", async (id) => {
  const { data } = await axios.get(`${USER_API_END_POINT}/user/${id}`);
  return data.user;
});

export const updateRecruiterStatus = createAsyncThunk(
  "user/updateRecruiterStatus",
  async ({ status, userId }, { rejectWithValue }) => {
    try {
      axios.defaults.withCredentials = true;

      const res = await axios.put(
        `${USER_API_END_POINT}/update-recruiter-status`,
        { status, userId }
      );

      return res.data;

    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

;

export const fetchPendingRecruiters = createAsyncThunk(
  "recruiter/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${USER_API_END_POINT}/get-pending-recruiters`,
        { withCredentials: true }
      );

      return data.users; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Server error");
    }
  }
);

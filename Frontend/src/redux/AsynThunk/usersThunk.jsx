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

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_END_POINT } from "../../endPoint";

export const looadUser = createAsyncThunk('looadUser',async()=>{
    axios.defaults.withCredentials = true
        try {  
            const response = await axios.get(`${USER_END_POINT}/get/user`);
            console.log("before getting user in frontend ")
            const data = response.data; 
            console.log("get data in frontend",data);
            return  data.user ;

        } catch (error) {
            console.error('Error fetching user data:', error);
        
        }
})

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
    try {
      const response =   await axios.get(`${USER_END_POINT}/logout`, { withCredentials: true });
        return response.data.message; // Success
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to logout");
    }
});

export const deleteUserbyId = createAsyncThunk(
    'deleteUserbyId',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${USER_END_POINT}/user/delete/${id}`);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
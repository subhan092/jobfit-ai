import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Application_API_END_POINT } from "../../utils/key";
import { toast } from "react-toastify";

export const jobApply = createAsyncThunk("jobApply", async (jobId, { rejectWithValue }) => {
    try {
        const resp = await axios.post(
            `${Application_API_END_POINT}/apply/${jobId}`,
            {},  // Empty body
            { withCredentials: true } 
        );
        return resp.data.message;  
    } catch (error) {
        console.log("error in apply job", error);
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
});
export const getApplicants = createAsyncThunk(
  "getApplicants",
  async (jobId, { rejectWithValue }) => {
    try {
      const resp = await axios.get(
        `${Application_API_END_POINT}/get-applicants/${jobId}`,
        {}, // Empty body
        { withCredentials: true } 
      );
      
      
      return resp.data.applicants;  
    } catch (error) {
      
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

export const updateApplicantStatus = async (id,newStatus) => {
  try {
   const resp = await axios.put(`${Application_API_END_POINT}/update/${id}`, { status: newStatus });
   if (resp) {
    toast.success("status updated sucessfully")
   }

  } catch (error) {
     toast.error(error.response?.data?.message || "Network error");
     console.error("Error in updateApplicantStatus", error);
  }
};

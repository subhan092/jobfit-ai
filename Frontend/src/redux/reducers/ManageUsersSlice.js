import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers, fetchUserById } from "../AsynThunk/usersThunk";

const userSlice = createSlice({
    name: "users",
    initialState: {
      users: {
        candidates: [],
        recruiters: [],
      },
      userProfile : {},
      loading: false,
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload; // payload should be { candidates: [], recruiters: [] }
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
        builder
        .addCase(fetchUserById.fulfilled , (state,action)=>{
          state.userProfile = action.payload
        })
    },
  });
export default userSlice.reducer  
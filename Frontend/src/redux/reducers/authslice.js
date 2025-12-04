import { createSlice } from "@reduxjs/toolkit";
import { logoutUser, looadUser } from "../AsynThunk/User_Auth";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        Loading:false,
        user:null,
        error:null,
        msg : ""
    },
    reducers:{
        setLoading:(state,action)=>{
         state.Loading = action.payload
        },
        // setUserAuth:(state,action)=>{
        //  state.user = action.payload
        // }
    },
    extraReducers:(builder)=>{
       builder.addCase(looadUser.fulfilled,(state,action)=>{
        state.user = action.payload
       })
       builder.addCase(looadUser.rejected,(state)=>{
        state.error = action.payload
       })
      
    builder.addCase(logoutUser.fulfilled, (state,action) => {
        state.user = null;
        state.msg = action.payload
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
        state.msg = action.payload
    });
    }
})

export const {setLoading , setUserAuth} = authSlice.actions

export default authSlice.reducer
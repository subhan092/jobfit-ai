import { configureStore } from "@reduxjs/toolkit";
import authSlice from './reducers/authslice'
import jobSlice from './reducers/Jobslice'
import applicationSlice from './reducers/applicationSlice'
import companySlice  from './reducers/companySlice'
import  dashboardSlice from  './reducers/AdminDB-Slice'
import userSlice from './reducers/ManageUsersSlice'
import recruiterSlice from './reducers/PendingRecruiter.Slice'
export const store = configureStore({
    reducer:{
        auth :authSlice,
        job: jobSlice,
        application:applicationSlice,
        company:companySlice,
        dashboard: dashboardSlice,
        users:  userSlice ,
        recruiter: recruiterSlice
    }
})


import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanies, fetchCompanybyId } from "../AsynThunk/Company";

const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: [],
        company:{},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
        builder.addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload;
            })
        builder.addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

       
        builder.addCase(fetchCompanybyId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchCompanybyId.fulfilled, (state, action) => {
            state.loading = false;
            state.company = action.payload;
        })
        builder.addCase(fetchCompanybyId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default companySlice.reducer;

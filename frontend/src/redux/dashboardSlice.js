import {createAsyncThunk, createSlice}  from '@reduxjs/toolkit'
import API from  '../api/axios'

export const fetchAnalytics = createAsyncThunk("dashboard/fetchAnalytics",
    async(thunkAPI)=>{
       try{
        const res = await API.get("dashboard/analytics");
        return res.data;
       }catch(error){
        return thunkAPI.rejectWithValue(
            error.response.data.message
        )
       }
    }
)

const initialState = {
  analytics:[],
  loading: false,
  error: null,
};

const DashboardSlice = createSlice({
    name:"dashboard",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
         .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export default DashboardSlice.reducer;
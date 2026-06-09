
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";


export const registerForEvent = createAsyncThunk("registration/registerForEvent",
    async(evenId,thunkAPI)=>{
       try{
         const res = await API.post(`/events/${evenId}/register`)
        return res.data;
       }catch(error){
        return thunkAPI.rejectWithValue(
            error.response?.data || error.response?.data.message
        )
       }
    }
) 

const initialState = {
    registrations:[],
    loading:false,
    error:null,
    success:false
}

const registrationSlice = createSlice({
    name:"registrations",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerForEvent.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerForEvent.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.registrations = action.payload;
        })
        .addCase(registerForEvent.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload

        })
    }
})

export default registrationSlice.reducer;
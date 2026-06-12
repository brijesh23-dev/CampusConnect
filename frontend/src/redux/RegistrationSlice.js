import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const registerForEvent = createAsyncThunk(
  "registration/registerForEvent",
  async (evenId, thunkAPI) => {
    try {
      const res = await API.post(`/events/${evenId}/register`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.response?.data.message,
      );
    }
  },
);
export const fetchMyregistration = createAsyncThunk(
  "registration/fetchMyregistration",
  async (thunkAPI) => {
    try {
      const res = await API.get("/registration/my-registrations");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchParticipants = createAsyncThunk("registration/fetchParticipants",
  async(eventId,thunkAPI)=>{
    try{
      const res = await API.get(`/registration/participants/${eventId}`);
      return res.data;
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response.data.message
      )
    }
  }
)

const initialState = {
  registrations: [],
  participants:[],
  loading: false,
  error: null,
  success: false,
};

const registrationSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registrations.push(action.payload.registration);
      })
      .addCase(registerForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyregistration.fulfilled, (state, action) => {
        state.registrations = action.payload.registration;
      })
      .addCase(fetchParticipants.fulfilled,(state,action)=>{
        state.participants = action.payload.participants
      })
    
  },
});

export default registrationSlice.reducer;

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
        error.response?.data?.message || "Failed to fetch participants"
      );
    }
  }
);

export const cancelRegistration = createAsyncThunk(
  "registration/cancelRegistration",
  async (registrationId, thunkAPI) => {
    try {
      await API.delete(`/registration/${registrationId}`);
      return registrationId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel registration"
      );
    }
  }
);

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
  reducers: {
    // optimistic removal (if needed elsewhere)
    removeRegistration(state, action) {
      state.registrations = state.registrations.filter(
        (r) => r._id !== action.payload
      );
    },
  },
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
      .addCase(fetchMyregistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyregistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload.registration;
      })
      .addCase(fetchMyregistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload.participants;
      })
      .addCase(fetchParticipants.rejected, (state) => {
        state.loading = false;
      })

      // cancel registration
      .addCase(cancelRegistration.pending, (state) => {
        state.error = null;
      })
      .addCase(cancelRegistration.fulfilled, (state, action) => {
        // remove from local list immediately
        state.registrations = state.registrations.filter(
          (r) => r._id !== action.payload
        );
      })
      .addCase(cancelRegistration.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default registrationSlice.reducer;

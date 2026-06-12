import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await API.get("/events/all");
  return res.data.events;
});

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (formData, thunkApi) => {
    console.log([...formData.entries()]);
    try {
      const res = await API.post("/events/create", formData);
      return res.data.events;
    } catch (error) {
      console.log("error:", error.response?.data);
      return thunkApi.rejectWithValue(
        error.response?.data ||
          error.response ||
          error.response.data.message ||
          "Failed to create event",
      );
    }
  },
);
export const fetchMyEvents = createAsyncThunk(
  "events/fetchMyEvents",
  async (thunkAPI) => {
    try {
      const res = await API.get("/events/my-events");
      console.log(res.data.events);
      return res.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          error.response ||
          error.response.data.message ||
          "Failed to fetch events",
      );
    }
  },
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/events/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          error.response ||
          error.response.data.message ||
          "Failed to delete event",
      );
    }
  },
);

export const fetchSingleEvent = createAsyncThunk(
  "events/fetchSingleEvent",
  async (id) => {
    const res = await API.get(`/events/${id}`);
    return res.data.event;
  },
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, data, thunkAPI }) => {
    try {
      const res = await API.put(`/events/update/${id}`, data);
      return res.data.event;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          error.response ||
          error.response.data.message ||
          "faild to update event",
      );
    }
  },
);


export const fetchParticipants = createAsyncThunk(
  "events/fetchParticipants",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/events/${id}/participants`);
      return res.data.participants;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          error.response ||
          error.response.data.message ||
          "Failed to fetch participants",
      );
    }
  },
);

const eventSlice = createSlice({
  name: "events",

  initialState: {
    events: [],
    eventLoading: false,
    singleEvent: null,
    participants: [],
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.error = action.payload || "Failed to create event";
      })
      .addCase(fetchMyEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchMyEvents.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch events";
        state.events = [];
      })

      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(
          (event) => event._id !== action.payload,
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchSingleEvent.fulfilled, (state, action) => {
        state.singleEvent = action.payload;
      })

      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event,
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.participants = action.payload;
        state.error = null;
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.error = action.payload;
        state.participants = [];
      })
  },
});

export default eventSlice.reducer;

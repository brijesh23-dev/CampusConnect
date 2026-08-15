import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async (params) => {
  const query = new URLSearchParams(params);
  const res = await API.get(`/events/all?${query}`);
  return res.data.events;
});

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/events/create", formData);
      return res.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create event",
      );
    }
  },
);

export const fetchMyEvents = createAsyncThunk(
  "events/fetchMyEvents",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/events/my-events");
      return res.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch events",
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
        error.response?.data?.message || "Failed to delete event",
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

// Sends FormData so multer can parse the optional image on PUT /events/update/:id
export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, data, imageFile }, thunkAPI) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (val !== undefined && val !== null) formData.append(key, val);
      });
      if (imageFile) formData.append("image", imageFile);

      const res = await API.put(`/events/update/${id}`, formData);
      return res.data.event;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update event",
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
        error.response?.data?.message || "Failed to fetch participants",
      );
    }
  },
);

// Quick status-only update (draft / published / cancelled)
export const updateEventStatus = createAsyncThunk(
  "events/updateEventStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const res = await API.patch(`/events/${id}/status`, { status });
      return res.data.event;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

const eventSlice = createSlice({
  name: "events",

  initialState: {
    events: [],
    loading: false,
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
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      })

      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.events.push(action.payload);
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
        state.events = state.events.filter((event) => event._id !== action.payload);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(fetchSingleEvent.pending, (state) => {
        state.eventLoading = true;
        state.singleEvent = null;
        state.error = null;
      })
      .addCase(fetchSingleEvent.fulfilled, (state, action) => {
        state.eventLoading = false;
        state.singleEvent = action.payload;
      })
      .addCase(fetchSingleEvent.rejected, (state, action) => {
        state.eventLoading = false;
        state.singleEvent = null;
        state.error = action.error.message || "Event not found";
      })

      .addCase(updateEvent.fulfilled, (state, action) => {
        state.events = state.events.map((event) =>
          event._id === action.payload?._id ? action.payload : event,
        );
        state.singleEvent = action.payload;
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

      // updateEventStatus: patch the event in both `events` list and `singleEvent`
      .addCase(updateEventStatus.pending, (state, action) => {
        // Optimistic UI: mark the event as updating
        const id = action.meta.arg.id;
        const evt = state.events.find((e) => e._id === id);
        if (evt) evt._statusLoading = true;
      })
      .addCase(updateEventStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        state.events = state.events.map((e) =>
          e._id === updated._id ? { ...updated, _statusLoading: false } : e,
        );
        if (state.singleEvent?._id === updated._id) state.singleEvent = updated;
      })
      .addCase(updateEventStatus.rejected, (state, action) => {
        state.error = action.payload;
        // Clear loading flag
        state.events = state.events.map((e) => ({ ...e, _statusLoading: false }));
      });
  },
});

export default eventSlice.reducer;

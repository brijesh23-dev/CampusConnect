import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// ── Thunks ─────────────────────────────────────────────────────────────────────

export const fetchAdminStats = createAsyncThunk(
  "admin/fetchAdminStats",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/stats");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (params = {}, thunkAPI) => {
    try {
      const query = new URLSearchParams(params);
      const res = await API.get(`/admin/users?${query}`);
      return res.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/admin/users/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

// Dedicated thunk for clubs — stores into state.clubs, not state.users
export const fetchAllClubUsers = createAsyncThunk(
  "admin/fetchAllClubUsers",
  async (params = {}, thunkAPI) => {
    try {
      const query = new URLSearchParams({ role: "club", ...params });
      const res = await API.get(`/admin/users?${query}`);
      return res.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

export const fetchAllAdminEvents = createAsyncThunk(
  "admin/fetchAllAdminEvents",
  async (params = {}, thunkAPI) => {
    try {
      const query = new URLSearchParams(params);
      const res = await API.get(`/admin/events?${query}`);
      return res.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

export const deleteAdminEvent = createAsyncThunk(
  "admin/deleteAdminEvent",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/admin/events/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role }, thunkAPI) => {
    try {
      const res = await API.patch(`/admin/users/${id}/role`, { role });
      return res.data.user; // { _id, role }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update role");
    }
  }
);

export const approveAdminEvent = createAsyncThunk(
  "admin/approveAdminEvent",
  async (id, thunkAPI) => {
    try {
      const res = await API.patch(`/admin/events/${id}/approve`);
      return res.data.event; // { _id, status, ... }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to approve event");
    }
  }
);

export const fetchPlatformAnalytics = createAsyncThunk(
  "admin/fetchPlatformAnalytics",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/admin/analytics");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed");
    }
  }
);

// ── Slice ──────────────────────────────────────────────────────────────────────

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    stats: null,
    users: [],
    clubs: [],
    events: [],
    analytics: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    const setLoading = (state) => { state.loading = true; state.error = null; };
    const setError = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      // stats
      .addCase(fetchAdminStats.pending, setLoading)
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, setError)

      // users
      .addCase(fetchAllUsers.pending, setLoading)
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, setError)
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
        state.clubs = state.clubs.filter((c) => c._id !== action.payload);
      })

      // clubs (separate from users to avoid state conflict)
      .addCase(fetchAllClubUsers.pending, setLoading)
      .addCase(fetchAllClubUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload;
      })
      .addCase(fetchAllClubUsers.rejected, setError)

      // events
      .addCase(fetchAllAdminEvents.pending, setLoading)
      .addCase(fetchAllAdminEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchAllAdminEvents.rejected, setError)
      .addCase(deleteAdminEvent.fulfilled, (state, action) => {
        state.events = state.events.filter((e) => e._id !== action.payload);
      })
      .addCase(approveAdminEvent.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.events.findIndex((e) => e._id === updated._id);
        if (idx !== -1) state.events[idx] = updated;
      })

      // role toggle
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { _id, role } = action.payload;
        const user = state.users.find((u) => u._id === _id);
        if (user) user.role = role;
      })

      // analytics
      .addCase(fetchPlatformAnalytics.pending, setLoading)
      .addCase(fetchPlatformAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchPlatformAnalytics.rejected, setError);
  },
});

export default adminSlice.reducer;

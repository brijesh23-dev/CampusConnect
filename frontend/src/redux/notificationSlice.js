import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/notifications");
      return res.data.notifications;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch notifications");
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (id) => {
    const res = await API.put(`/notifications/${id}`);
    return res.data.notification;
  }
);

const notificationSlice = createSlice({
  name: "notifications",

  initialState: {
    notifications: [],
    loading: false,
  },

  reducers: {
    // Called by useSocket hook when a real-time notification arrives via Socket.IO
    addRealtimeNotification(state, action) {
      // Prepend so the newest notification always appears at the top
      state.notifications.unshift(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })

      .addCase(fetchNotifications.rejected, (state) => {
        state.loading = false;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const updatedNotification = action.payload;
        state.notifications = state.notifications.map((notification) =>
          notification._id === updatedNotification._id
            ? updatedNotification
            : notification
        );
      });
  },
});

export const { addRealtimeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
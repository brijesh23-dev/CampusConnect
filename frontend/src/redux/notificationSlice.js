import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const res = await API.get("/notifications");
    console.log(res.data)
    return res.data.notifications;
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

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
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

export default notificationSlice.reducer;
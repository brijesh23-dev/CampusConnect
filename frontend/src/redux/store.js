import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import eventReducer from "./eventSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    notifications: notificationReducer,
  },
});
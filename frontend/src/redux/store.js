import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import eventReducer from "./eventSlice";
import notificationReducer from "./notificationSlice";
import registerForEvent from "./RegistrationSlice";
import dashboardAnalytics from './dashboardSlice';
import clubReducer from './clubSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    notifications: notificationReducer,
    registrations: registerForEvent,
    dashboard: dashboardAnalytics,
    clubs: clubReducer,
    admin: adminReducer,
  },
});
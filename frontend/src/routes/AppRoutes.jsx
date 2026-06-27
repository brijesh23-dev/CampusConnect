import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { checkUser } from "../redux/authSlice";

import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import StudentDashboard from "../features/student/StudentDashboard";
import AdminDashboard from "../features/admin/AdminDashboard";
import ClubDashboard from "../features/analytics/ClubDashboard";
import Events from "../features/events/Events";
import CreateEvent from "../features/events/CreateEvent";
import Notifications from "../features/notifications/Notifications";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Navbar from "../components/common/Navbar";
import MyEvents from "../features/events/MyEvents";
import EditEvent from "../features/events/EditEvent";
import EventDetails from "../features/events/EventDetails";
import Footer from "../components/common/Footer";
import Layout from "../Layouts/Layout";
import PageNotfound from "../components/common/PageNotfound";
import EventParticipants from "../features/events/EventParticipants";
import MyRegistrations from "../features/registrations/MyRegistrations";
import Participants from "../features/registrations/Participants";
import ManageInterests from "../features/interests/ManageInterests";
import Analytics from "../features/analytics/Dashboard";
import ClubLayout from "../Layouts/ClubLayout";

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/club"
        element={
          <ProtectedRoute role="club">
            <ClubLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClubDashboard />} />
        <Route path="events" element={<MyEvents />} />z
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="edit-event/:id" element={<EditEvent />} />
        <Route path="participants/:eventId" element={<Participants />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route index element={<Events />} />
        <Route path="events" element={<Events />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="participants/:eventId" element={<Participants />} />
        <Route path="manage-interests" element={<ManageInterests />} />
        <Route path="*" element={<PageNotfound />} />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/my-registrations" element={<MyRegistrations />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/club/dashboard"
          element={
            <ProtectedRoute role="club">
              <ClubDashboard />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/create-event"
          element={
            <ProtectedRoute role="club">
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute role="student">
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute role="club">
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-event/:id"
          element={
            <ProtectedRoute role="club">
              <EditEvent />
            </ProtectedRoute>
          }
        />
        <Route path="/events/:id" element={<EventDetails />} />
      </Route>
      <Route
        path="/participants/:id"
        element={
          <ProtectedRoute role="club">
            <EventParticipants />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;

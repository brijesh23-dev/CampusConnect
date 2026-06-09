import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { checkUser } from "./redux/authSlice";

import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ClubDashboard from "./pages/ClubDashboard";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import MyEvents from "./pages/MyEvents";
import EditEvent from "./pages/EditEvent";
import EventDetails from "./pages/EventDetails";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import PageNotfound from "./components/PageNotfound";
import EventParticipants from "./pages/EventParticipants";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="*" element={<PageNotfound />} />
        <Route path="/" element={<Events />} />
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/club/dashboard"
          element={
            <ProtectedRoute role="club">
              <ClubDashboard />
            </ProtectedRoute>
          }
        />

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

export default App;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { checkUser } from "../redux/authSlice";

// Layouts
import PublicLayout from "../Layouts/PublicLayout";
import ClubLayout from "../Layouts/ClubLayout";
import StudentLayout from "../Layouts/StudentLayout";
import AdminLayout from "../Layouts/AdminLayout";

// Public pages
import LandingPage from "../pages/public/LandingPage";
import Events from "../pages/public/Events";
import EventDetails from "../pages/public/EventDetails";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Clubs from "../pages/public/Clubs";
import ClubDetails from "../pages/public/ClubDetails";

// Student pages
import StudentDashboard from "../pages/student/StudentDashboard";
import Notifications from "../pages/student/Notifications";
import ManageInterests from "../pages/student/ManageInterests";
import MyRegistrations from "../pages/student/MyRegistrations";
import StudentSettings from "../pages/student/StudentSettings";
import RecommendedEvents from "../pages/student/RecommendedEvents";

// Club pages
import ClubDashboard from "../pages/club/ClubDashboard";
import MyEvents from "../pages/club/MyEvents";
import CreateEvent from "../pages/club/CreateEvent";
import EditEvent from "../pages/club/EditEvent";
import Participants from "../pages/club/Participants";
import ClubProfile from "../pages/club/ClubProfile";
import ClubNotifications from "../pages/club/ClubNotifications";
import ClubSettings from "../pages/club/ClubSettings";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminSettings from "../pages/admin/AdminSettings";
import AdminAnalytics from "../pages/admin/AdminAnalytics";
import AdminReports from "../pages/admin/AdminReports";

// Common
import ProtectedRoute from "../components/common/ProtectedRoute";
import PageNotfound from "../components/common/PageNotfound";

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <Routes>
      {/* ── Public routes (with Navbar + Footer) ── */}
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="clubs-directory" element={<Clubs />} />
        <Route path="clubs-directory/:id" element={<ClubDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<PageNotfound />} />
      </Route>

      {/* ── Student routes (with StudentSidebar) ── */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="interests" element={<ManageInterests />} />
        <Route path="registrations" element={<MyRegistrations />} />
        <Route path="recommended" element={<RecommendedEvents />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      {/* Backward-compatible student routes */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Notifications />} />
      </Route>

      <Route
        path="/my-registrations"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MyRegistrations />} />
      </Route>

      <Route
        path="/manage-interests"
        element={
          <ProtectedRoute role="student">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ManageInterests />} />
      </Route>

      {/* ── Club routes (with ClubSidebar) ── */}
      <Route
        path="/clubs"
        element={
          <ProtectedRoute role="club">
            <ClubLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClubDashboard />} />
        <Route path="events" element={<MyEvents />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="edit-event/:id" element={<EditEvent />} />
        <Route path="participants/:eventId" element={<Participants />} />
        <Route path="profile" element={<ClubProfile />} />
        <Route path="notifications" element={<ClubNotifications />} />
        <Route path="settings" element={<ClubSettings />} />
      </Route>

      {/* ── Admin routes (with AdminSidebar) ── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;

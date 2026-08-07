import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdPeople, MdEvent, MdGroups, MdPoll, MdWarning } from "react-icons/md";
import { fetchAdminStats, deleteUser, deleteAdminEvent, fetchPlatformAnalytics } from "../../redux/adminSlice";
import DashboardCard from "../../components/common/admin/DashboardCard";
import UsersTable from "../../components/common/admin/UsersTable";
import EventsTable from "../../components/common/admin/EventsTable";
import ClubsTable from "../../components/common/admin/ClubsTable";
import AnalyticsChart from "../../components/common/admin/AnalyticsChart";
import RecentActivity from "../../components/common/admin/RecentActivity";

// ── Confirmation Dialog ────────────────────────────────────────────────────────
function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <MdWarning className="text-red-500 text-xl" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const dispatch = useDispatch();
  const { stats, analytics, loading } = useSelector((state) => state.admin);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    dispatch(fetchAdminStats());
    dispatch(fetchPlatformAnalytics());
  }, [dispatch]);

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  const requestDeleteUser = (id, name) => {
    setConfirmDialog({
      open: true,
      title: "Delete User",
      message: `Permanently delete "${name}"? This action cannot be undone.`,
      onConfirm: () => {
        dispatch(deleteUser(id));
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const requestDeleteEvent = (id, title) => {
    setConfirmDialog({
      open: true,
      title: "Delete Event",
      message: `Permanently delete "${title}"? All registrations will be lost.`,
      onConfirm: () => {
        dispatch(deleteAdminEvent(id));
        setConfirmDialog((prev) => ({ ...prev, open: false }));
      },
    });
  };

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "users", label: "Users" },
    { id: "clubs", label: "Clubs" },
    { id: "events", label: "Events" },
  ];

  return (
    <>
      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
      />

      <div className="max-w-6xl mx-auto space-y-6 py-2">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">System Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Platform overview — manage users, clubs, and events.
          </p>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Users"
            value={loading ? "…" : (stats?.totalUsers ?? 0)}
            subtitle="Registered accounts"
            icon={<MdPeople className="text-2xl" />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <DashboardCard
            title="Active Clubs"
            value={loading ? "…" : (stats?.totalClubs ?? 0)}
            subtitle="Club accounts"
            icon={<MdGroups className="text-2xl" />}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
          <DashboardCard
            title="Total Events"
            value={loading ? "…" : (stats?.totalEvents ?? 0)}
            subtitle="All platform events"
            icon={<MdEvent className="text-2xl" />}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <DashboardCard
            title="Total RSVPs"
            value={loading ? "…" : (stats?.totalRegistrations ?? 0)}
            subtitle="Student registrations"
            icon={<MdPoll className="text-2xl" />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 gap-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                currentTab === tab.id
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="space-y-6 pb-8">
          {currentTab === "overview" && (
            <>
              {/* Analytics + Activity row */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AnalyticsChart analytics={analytics} loading={loading} />
                </div>
                <RecentActivity analytics={analytics} stats={stats} loading={loading} />
              </div>

              {/* Compact tables */}
              <UsersTable compact onDeleteRequest={requestDeleteUser} />
              <ClubsTable compact />
              <EventsTable compact onDeleteRequest={requestDeleteEvent} />
            </>
          )}

          {currentTab === "users" && (
            <UsersTable onDeleteRequest={requestDeleteUser} />
          )}
          {currentTab === "clubs" && <ClubsTable />}
          {currentTab === "events" && (
            <EventsTable onDeleteRequest={requestDeleteEvent} />
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

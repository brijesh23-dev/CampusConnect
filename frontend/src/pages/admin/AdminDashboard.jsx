import { useSearchParams } from "react-router-dom";
import { MdPeople, MdEvent, MdGroups, MdPoll } from "react-icons/md";
import DashboardCard from "../../components/common/admin/DashboardCard";
import UsersTable from "../../components/common/admin/UsersTable";
import EventsTable from "../../components/common/admin/EventsTable";

function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">System Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">
            Welcome back, System Admin. Manage platform users, clubs, and events.
          </p>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Users"
            value={10248}
            subtitle="Registered accounts"
            icon={<MdPeople className="text-2xl" />}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <DashboardCard
            title="Active Clubs"
            value={84}
            subtitle="Approved organizations"
            icon={<MdGroups className="text-2xl" />}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
          <DashboardCard
            title="Total Events"
            value={520}
            subtitle="Hosted this semester"
            icon={<MdEvent className="text-2xl" />}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <DashboardCard
            title="Total RSVPs"
            value={14890}
            subtitle="Student event registrations"
            icon={<MdPoll className="text-2xl" />}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: "overview", label: "Overview" },
            { id: "users", label: "Users List" },
            { id: "events", label: "Events List" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition-all ${
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
        <div className="space-y-6">
          {currentTab === "overview" && (
            <div className="grid grid-cols-1 gap-6">
              <UsersTable />
              <EventsTable />
            </div>
          )}

          {currentTab === "users" && <UsersTable />}

          {currentTab === "events" && <EventsTable />}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

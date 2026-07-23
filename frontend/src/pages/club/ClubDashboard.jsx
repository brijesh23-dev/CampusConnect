import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAnalytics } from "../../redux/dashboardSlice";
import {
  MdPersonAdd,
  MdRemoveRedEye,
  MdFavorite,
  MdArrowForward,
} from "react-icons/md";
import StatCard from "../../components/common/club/StatCard";
import RecentRegistrations from "../../components/common/club/RecentRegistrations";
import AnalyticsChart from "../../components/common/club/AnalyticsChart";

const statCards = (analytics) => [
  {
    id: "registrations",
    title: "Total Registrations",
    value: analytics?.totalRegistrations ?? 1248,
    change: "+12%",
    positive: true,
    icon: <MdPersonAdd className="text-2xl" />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "views",
    title: "Profile Views",
    value: analytics?.profileViews ?? 8592,
    change: "+5%",
    positive: true,
    icon: <MdRemoveRedEye className="text-2xl" />,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    id: "interested",
    title: "Interested Users",
    value: analytics?.interestedUsers ?? 430,
    change: "→ 0%",
    positive: null,
    icon: <MdFavorite className="text-2xl" />,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
];

function ClubDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { analytics, loading } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const stats = statCards(analytics);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Club Overview</h1>
            <p className="text-gray-400 text-sm mt-1">
              Here's what's happening with your events today.
            </p>
          </div>
          <Link
            to="/clubs/create-event"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-sm"
          >
            Create Event
          </Link>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              positive={stat.positive}
              icon={stat.icon}
              iconBg={stat.iconBg}
              iconColor={stat.iconColor}
            />
          ))}
        </div>

        {/* Analytics details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <AnalyticsChart eventStats={analytics?.eventStats || []} />
          </div>

          {/* Recent Registrations list */}
          <div>
            <RecentRegistrations registrations={analytics?.recentRegistrations || []} />
          </div>
        </div>

        {/* Secondary view option */}
        <div className="flex justify-end">
          <Link
            to="/clubs/events"
            className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline"
          >
            Manage Events List <MdArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClubDashboard;

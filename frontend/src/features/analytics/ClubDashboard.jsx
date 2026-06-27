import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StatCard from "../../components/common/dashboard/statCard";
import { useEffect } from "react";
import { fetchAnalytics } from "../../redux/dashboardSlice";
import RecentRegistrations from "../../components/common/dashboard/RecentRegistrations";
import EventStatsTable from "../../components/common/dashboard/EventStatsTable";

function ClubDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { analytics } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnalytics());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 flex flex-col gap-3">
      <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">Club Dashboard</h1>

        <p className="text-gray-600 ">Welcome back, {user?.name}</p>
      </div>
      {/* <div className="max-w-6xl mx-auto my-5">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/club/create-event"
            className="bg-blue-600 text-white rounded-2xl p-6 shadow-md hover:bg-blue-700 transition"
          >
            <h2 className="text-2xl font-bold mb-2">Create Event</h2>
            <p>Add a new college event for students.</p>
          </Link>

          <Link
            to="/club/events"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">My Events</h2>
            <p className="text-gray-600">View, edit, or delete your events.</p>
          </Link>

          <Link
            to="/club/events"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">All Events</h2>
            <p className="text-gray-600">Browse events listed on campus.</p>
          </Link>
        </div>
      </div> */}

      {/* StatCard */}
      <div className="flex flex-col gap-3">
        <StatCard title="Total Events" value={analytics?.totalEvents || 0} />

        <StatCard
          title="Participants"
          value={analytics?.totalRegistrations || 0}
        />

        <StatCard title="Upcoming" value={analytics?.upcomingEvents || 0} />
      </div>
      <div>
        <RecentRegistrations registrations={analytics?.recentRegistrations} />
      </div>
     <div> <EventStatsTable stats={analytics?.eventStats} /></div>
    </div>
  );
}

export default ClubDashboard;

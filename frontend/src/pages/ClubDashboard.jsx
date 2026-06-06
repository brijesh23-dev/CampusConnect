import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ClubDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Club Dashboard
          </h1>

          <p className="text-gray-600">
            Welcome back, {user?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/create-event"
            className="bg-blue-600 text-white rounded-2xl p-6 shadow-md hover:bg-blue-700 transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              Create Event
            </h2>
            <p>Add a new college event for students.</p>
          </Link>

          <Link
            to="/my-events"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              My Events
            </h2>
            <p className="text-gray-600">
              View, edit, or delete your events.
            </p>
          </Link>

          <Link
            to="/events"
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-bold mb-2">
              All Events
            </h2>
            <p className="text-gray-600">
              Browse events listed on campus.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClubDashboard;
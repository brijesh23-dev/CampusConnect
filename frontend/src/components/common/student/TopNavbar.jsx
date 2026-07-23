import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../../redux/authSlice";
import { MdSearch, MdNotifications, MdAddBox } from "react-icons/md";

function TopNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 w-80">
        <MdSearch className="text-gray-400 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="Search events, clubs, people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder:text-gray-400"
        />
      </div>

      {/* Center Nav */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/student/dashboard" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-0.5">
          Dashboard
        </Link>
        <Link to="/events" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">
          Events
        </Link>
        <Link to="/calendar" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">
          Calendar
        </Link>
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <Link
          to="/clubs/create-event"
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition shadow-sm"
        >
          Create Event
        </Link>
        {user ? (
          <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
            Sign In
          </Link>
        )}
        <div className="relative">
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
            <MdNotifications className="text-xl text-gray-600" />
          </button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer overflow-hidden">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;

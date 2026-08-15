import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../../redux/authSlice";
import { MdSearch, MdNotifications, MdMenu } from "react-icons/md";

function TopNavbar({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center gap-3 px-4 sm:px-6 sticky top-0 z-40 shadow-sm flex-shrink-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition flex-shrink-0"
        aria-label="Open navigation menu"
      >
        <MdMenu className="text-2xl" />
      </button>

      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2 flex-1 max-w-xs sm:max-w-sm">
        <MdSearch className="text-gray-400 text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="Search events, clubs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder:text-gray-400"
          aria-label="Search"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Link
          to="/student/notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          aria-label="Notifications"
        >
          <MdNotifications className="text-xl text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </Link>

        {/* Sign Out */}
        {user ? (
          <button
            onClick={handleLogout}
            className="hidden sm:inline-flex text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="hidden sm:inline-flex text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition">
            Sign In
          </Link>
        )}

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer overflow-hidden flex-shrink-0">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}

export default TopNavbar;

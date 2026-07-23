import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/authSlice";
import {
  MdDashboard,
  MdEventNote,
  MdExplore,
  MdPeopleOutline,
  MdNotifications,
  MdSettings,
  MdHelp,
  MdLogout,
  MdAddCircleOutline,
} from "react-icons/md";

const navLinks = [
  { id: "dashboard", name: "Dashboard", path: "/student/dashboard", icon: <MdDashboard className="text-xl flex-shrink-0" /> },
  { id: "my-events", name: "My Events", path: "/my-registrations", icon: <MdEventNote className="text-xl flex-shrink-0" /> },
  { id: "explore", name: "Explore", path: "/events", icon: <MdExplore className="text-xl flex-shrink-0" /> },
  { id: "clubs", name: "Clubs", path: "/clubs", icon: <MdPeopleOutline className="text-xl flex-shrink-0" /> },
  { id: "notifications", name: "Notifications", path: "/notifications", icon: <MdNotifications className="text-xl flex-shrink-0" /> },
  { id: "settings", name: "Settings", path: "/student/settings", icon: <MdSettings className="text-xl flex-shrink-0" /> },
];

const bottomLinks = [
  { id: "help", name: "Help", path: "/help", icon: <MdHelp className="text-xl flex-shrink-0" /> },
];

function StudentSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside className="w-56 h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm flex-shrink-0">
      {/* Logo / Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow">
            {user?.name?.[0]?.toUpperCase() || "C"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name || "Event Manager"}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.role === "student" ? "Student" : "Admin Access"}
            </p>
          </div>
        </div>
      </div>

      {/* New Event CTA */}
      <div className="px-4 pt-4">
        <NavLink
          to="/events"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition shadow-sm"
        >
          <MdAddCircleOutline className="text-lg" />
          New Event
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-violet-600 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Links */}
      <div className="px-3 pb-2 space-y-1 border-t border-gray-100 pt-3">
        {bottomLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <MdLogout className="text-xl flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default StudentSidebar;

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
  MdStar,
  MdClose,
} from "react-icons/md";

const navLinks = [
  { id: "dashboard", name: "Dashboard", path: "/student/dashboard", icon: <MdDashboard className="text-xl flex-shrink-0" /> },
  { id: "recommended", name: "Recommended", path: "/student/recommended", icon: <MdStar className="text-xl flex-shrink-0" /> },
  { id: "my-events", name: "My Events", path: "/my-registrations", icon: <MdEventNote className="text-xl flex-shrink-0" /> },
  { id: "explore", name: "Explore", path: "/events", icon: <MdExplore className="text-xl flex-shrink-0" /> },
  { id: "clubs", name: "Clubs", path: "/clubs-directory", icon: <MdPeopleOutline className="text-xl flex-shrink-0" /> },
  { id: "notifications", name: "Notifications", path: "/notifications", icon: <MdNotifications className="text-xl flex-shrink-0" /> },
  { id: "settings", name: "Settings", path: "/student/settings", icon: <MdSettings className="text-xl flex-shrink-0" /> },
];

const bottomLinks = [
  { id: "help", name: "Help", path: "/help", icon: <MdHelp className="text-xl flex-shrink-0" /> },
];

function StudentSidebar({ open, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const close = () => setOpen?.(false);

  const sidebarContent = (
    <aside className="w-56 h-full bg-white border-r border-gray-100 flex flex-col shadow-sm">
      {/* Logo / Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || "C"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name || "Student"}
            </p>
            <p className="text-xs text-gray-400 truncate">Student</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={close}
          className="lg:hidden ml-2 p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition flex-shrink-0"
          aria-label="Close menu"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            onClick={close}
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
            onClick={close}
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

  return (
    <>
      {/* ── Desktop: always visible static sidebar ──────────────── */}
      <div className="hidden lg:flex h-screen flex-shrink-0">
        {sidebarContent}
      </div>

      {/* ── Mobile: backdrop + slide-in drawer ───────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={close}
          aria-hidden="true"
        />
      )}
      <div
        className={`fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}

export default StudentSidebar;

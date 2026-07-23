import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/authSlice";
import {
  MdDashboard,
  MdPeople,
  MdEvent,
  MdSettings,
  MdLogout,
  MdHelp,
  MdSecurity,
} from "react-icons/md";

const navLinks = [
  { id: "dashboard", name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard className="text-xl flex-shrink-0" /> },
  { id: "users", name: "Users", path: "/admin/dashboard?tab=users", icon: <MdPeople className="text-xl flex-shrink-0" /> },
  { id: "events", name: "Events", path: "/admin/dashboard?tab=events", icon: <MdEvent className="text-xl flex-shrink-0" /> },
  { id: "settings", name: "Settings", path: "/admin/settings", icon: <MdSettings className="text-xl flex-shrink-0" /> },
];

function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside className="w-56 h-screen bg-slate-900 text-slate-300 flex flex-col shadow-lg flex-shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow">
          <MdSecurity className="text-lg" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">
            {user?.name || "Admin Manager"}
          </p>
          <p className="text-xs text-red-400 font-semibold truncate uppercase tracking-wider">
            System Admin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-6 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-red-600 text-white shadow-md shadow-red-900/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 pb-3 space-y-1 border-t border-slate-800 pt-3">
        <NavLink
          to="/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition"
        >
          <MdHelp className="text-xl flex-shrink-0" />
          <span>Help</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/40 hover:text-red-300 transition"
        >
          <MdLogout className="text-xl flex-shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;

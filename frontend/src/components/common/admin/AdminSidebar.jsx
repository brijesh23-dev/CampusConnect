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
  MdAssessment,
  MdInsights,
  MdGroups,
  MdClose,
} from "react-icons/md";

const navLinks = [
  { id: "dashboard", name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard className="text-xl flex-shrink-0" /> },
  { id: "users", name: "Users", path: "/admin/dashboard?tab=users", icon: <MdPeople className="text-xl flex-shrink-0" /> },
  { id: "clubs", name: "Clubs", path: "/admin/dashboard?tab=clubs", icon: <MdGroups className="text-xl flex-shrink-0" /> },
  { id: "events", name: "Events", path: "/admin/dashboard?tab=events", icon: <MdEvent className="text-xl flex-shrink-0" /> },
  { id: "analytics", name: "Analytics", path: "/admin/analytics", icon: <MdInsights className="text-xl flex-shrink-0" /> },
  { id: "reports", name: "Reports", path: "/admin/reports", icon: <MdAssessment className="text-xl flex-shrink-0" /> },
  { id: "settings", name: "Settings", path: "/admin/settings", icon: <MdSettings className="text-xl flex-shrink-0" /> },
];

function AdminSidebar({ open, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const close = () => setOpen?.(false);

  const sidebarContent = (
    <aside className="w-56 h-full bg-slate-900 text-slate-300 flex flex-col shadow-lg">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow flex-shrink-0">
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
        {/* Close button — mobile only */}
        <button
          onClick={close}
          className="lg:hidden ml-2 p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 transition flex-shrink-0"
          aria-label="Close menu"
        >
          <MdClose className="text-xl" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pt-6 space-y-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            onClick={close}
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
          onClick={close}
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

  return (
    <>
      {/* ── Desktop: always visible ──────────────────────────────── */}
      <div className="hidden lg:flex h-screen flex-shrink-0">
        {sidebarContent}
      </div>

      {/* ── Mobile: backdrop + slide-in drawer ───────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
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

export default AdminSidebar;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import {
  MdDashboard,
  MdEventNote,
  MdExplore,
  MdSettings,
  MdHelp,
  MdLogout,
  MdAddCircleOutline,
  MdExpandMore,
  MdExpandLess,
  MdAccountCircle,
  MdNotifications,
  MdClose,
} from "react-icons/md";

const mainLinks = [
  { id: "dashboard", name: "Dashboard", path: "/clubs", exact: true, icon: <MdDashboard className="text-xl flex-shrink-0" /> },
  {
    id: "events",
    name: "My Events",
    icon: <MdEventNote className="text-xl flex-shrink-0" />,
    subItems: [
      { name: "My Events", path: "/clubs/events" },
      { name: "Create Event", path: "/clubs/create-event" },
    ],
  },
  { id: "profile", name: "Club Profile", path: "/clubs/profile", icon: <MdAccountCircle className="text-xl flex-shrink-0" /> },
  { id: "notifications", name: "Notifications", path: "/clubs/notifications", icon: <MdNotifications className="text-xl flex-shrink-0" /> },
  { id: "explore", name: "Explore", path: "/events", icon: <MdExplore className="text-xl flex-shrink-0" /> },
  { id: "settings", name: "Settings", path: "/clubs/settings", icon: <MdSettings className="text-xl flex-shrink-0" /> },
];

function ClubSidebar({ open, setOpen }) {
  const [expandedMenus, setExpandedMenus] = useState({ events: true });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const toggleMenu = (menuId) =>
    setExpandedMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const close = () => setOpen?.(false);

  const sidebarContent = (
    <aside className="w-56 h-full bg-white border-r border-gray-100 flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() || "C"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name || "Club Manager"}
            </p>
            <p className="text-xs text-gray-400 truncate">Club Access</p>
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

      {/* New Event CTA */}
      <div className="px-4 pt-4">
        <NavLink
          to="/clubs/create-event"
          onClick={close}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition shadow-sm"
        >
          <MdAddCircleOutline className="text-lg" />
          New Event
        </NavLink>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pt-4 space-y-1">
        {mainLinks.map((link) =>
          link.subItems ? (
            <div key={link.id}>
              <button
                onClick={() => toggleMenu(link.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                {expandedMenus[link.id] ? (
                  <MdExpandLess className="text-lg" />
                ) : (
                  <MdExpandMore className="text-lg" />
                )}
              </button>

              {expandedMenus[link.id] && (
                <div className="pl-9 mt-1 space-y-1">
                  {link.subItems.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      onClick={close}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-xl text-sm font-medium transition ${
                          isActive
                            ? "bg-violet-600 text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        }`
                      }
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={link.id}
              to={link.path}
              end={link.exact}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          )
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-3 space-y-1 border-t border-gray-100 pt-3">
        <NavLink
          to="/help"
          onClick={close}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
        >
          <MdHelp className="text-xl flex-shrink-0" />
          <span>Help</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
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

export default ClubSidebar;
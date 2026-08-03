import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/authSlice";
import {
  MdDashboard,
  MdEventNote,
  MdExplore,
  MdPeopleOutline,
  MdSettings,
  MdHelp,
  MdLogout,
  MdAddCircleOutline,
  MdChevronRight,
  MdExpandMore,
  MdExpandLess,
  MdAccountCircle,
  MdNotifications,
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

function ClubSidebar() {
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

  return (
    <aside className="w-56 h-screen bg-white border-r border-gray-100 flex flex-col shadow-sm flex-shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow">
            {user?.name?.[0]?.toUpperCase() || "C"}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name || "Event Manager"}
            </p>
            <p className="text-xs text-gray-400 truncate">Admin Access</p>
          </div>
        </div>
      </div>

      {/* New Event CTA */}
      <div className="px-4 pt-4">
        <NavLink
          to="/clubs/create-event"
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
}

export default ClubSidebar;
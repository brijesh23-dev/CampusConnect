import { useState } from "react";
import { NavLink } from "react-router-dom";
import {motion} from "motion/react"
import {
  MdDashboard,
  MdEventNote,
  MdAnalytics,
  MdHome,
  MdChevronRight,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";

function ClubSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const mainLinks = [
    {
      id: "dashboard",
      name: "Dashboard",
      path: "/club",
      icon: <MdDashboard className="text-xl flex-shrink-0" />,
    },
    {
      id: "events",
      name: "Events",
      icon: <MdEventNote className="text-xl flex-shrink-0" />,
      subItems: [
        { name: "My Events", path: "/club/events" },
        { name: "Create Event", path: "/club/create-event" },
      ],
    },
    {
      id: "analytics",
      name: "Analytics",
      path: "/club/analytics",
      icon: <MdAnalytics className="text-xl flex-shrink-0" />,
    },
    {
      id: "home",
      name: "Home",
      path: "/events",
      icon: <MdHome className="text-xl flex-shrink-0" />,
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r border-slate-700`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 p-4 border-b border-slate-700">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg font-bold text-sm">
            CP
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold transition-opacity duration-300 ease-in-out opacity-100">
              Club Panel
            </span>
          )}
        </div>

        <motion.button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-white transition-all duration-200 hover:bg-slate-600 flex-shrink-0"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          <MdChevronRight
            className={`text-xl transition-transform duration-300 ease-in-out ${
              isCollapsed ? "rotate-0" : "-rotate-90"
            }`}
          />
        </motion.button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {mainLinks.map((link) =>
          link.subItems ? (
            <div key={link.id} className="space-y-1">
              <button
                onClick={() => toggleMenu(link.id)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-all duration-200 ease-in-out group"
                title={link.name}
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  {link.icon}
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate opacity-100 transition-opacity duration-300">
                      {link.name}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <span className="transition-transform duration-300">
                    {expandedMenus[link.id] ? (
                      <MdExpandLess className="text-lg" />
                    ) : (
                      <MdExpandMore className="text-lg" />
                    )}
                  </span>
                )}
              </button>

              {expandedMenus[link.id] && !isCollapsed && (
                <div className="pl-4 space-y-1 animate-in fade-in duration-200">
                  {link.subItems.map((subItem, idx) => (
                    <NavLink
                      key={idx}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ease-in-out ${
                          isActive
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-slate-300 hover:bg-slate-600 hover:text-white"
                        }`
                      }
                    >
                      <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                      <span className="truncate">{subItem.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={link.id}
              to={link.path}
              end={link.path === "/club"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
              title={link.name}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              {!isCollapsed && (
                <span className="text-sm font-medium truncate transition-opacity duration-300 opacity-100">
                  {link.name}
                </span>
              )}
            </NavLink>
          )
        )}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4">
        <div className="bg-slate-700 rounded-lg p-3 transition-all duration-300 ease-in-out">
          {isCollapsed ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
                i
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-300">Quick Tip</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Click the arrow to collapse and expand the sidebar.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default ClubSidebar;
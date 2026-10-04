import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { MdSearch, MdMenu, MdClose, MdAddCircleOutline, MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../../contexts/ThemeContext";

const navItems = [
  { label: "Events", path: "/events" },
  { label: "Clubs", path: "/clubs-directory" },
];

const PublicNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/events?q=${encodeURIComponent(query)}` : "/events");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold text-blue-600 flex-shrink-0 tracking-tight"
        >
          CampusConnect
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                    : "text-gray-600 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Search bar */}
        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-xs items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 dark:bg-slate-800">
          <MdSearch className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-slate-100"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-700 transition hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
          </button>
          {user ? (
            <>
              <Link
                to={user.role === "student" ? "/student/dashboard" : user.role === "admin" ? "/admin/dashboard" : "/clubs"}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
              >
                Register
              </Link>
            </>
          )}
          {user?.role === "club" && (
            <Link
              to="/clubs/create-event"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              <MdAddCircleOutline className="text-lg" />
              Create Event
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-600 dark:text-slate-200"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden space-y-2 border-t border-gray-100 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-950">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700 py-2 hover:text-blue-600"
            >
              {item.label}
            </NavLink>
          ))}
          {!user && (
            <>
              <Link to="/login" className="block text-sm text-gray-700 py-2" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/register" className="block text-sm text-blue-600 font-semibold py-2" onClick={() => setMobileOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;

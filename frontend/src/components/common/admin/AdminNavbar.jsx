import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MdNotificationsNone, MdSearch } from "react-icons/md";

const PAGE_TITLES = {
  "/admin/dashboard": "Dashboard",
  "/admin/analytics": "Analytics",
  "/admin/reports": "Reports",
  "/admin/settings": "Settings",
};

function AdminNavbar() {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  const pageTitle = PAGE_TITLES[pathname] || "Admin Portal";
  const initials = user?.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("")
    : "A";

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
      {/* Page title */}
      <div>
        <h1 className="text-base font-bold text-slate-900">{pageTitle}</h1>
        <p className="text-xs text-slate-400 leading-none mt-0.5">CampusConnect Admin</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5">
          <MdSearch className="text-slate-400 text-base flex-shrink-0" />
          <input
            type="text"
            placeholder="Quick search…"
            className="bg-transparent text-xs text-slate-700 w-36 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
          aria-label="Notifications"
        >
          <MdNotificationsNone className="text-xl" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-black">
            {initials}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-800 leading-none">{user?.name || "Admin"}</p>
            <p className="text-xs text-slate-400 leading-none mt-0.5">System Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;

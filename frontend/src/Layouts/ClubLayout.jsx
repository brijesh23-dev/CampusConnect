import { useState } from "react";
import { Outlet } from "react-router-dom";
import ClubSidebar from "../components/common/ClubSidebar";
import { MdMenu } from "react-icons/md";

function ClubLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      <ClubSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile top bar — hamburger only, visible on mobile */}
        <div className="lg:hidden flex items-center gap-3 px-4 h-14 bg-white border-b border-gray-100 shadow-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition"
            aria-label="Open menu"
          >
            <MdMenu className="text-2xl" />
          </button>
          <span className="text-sm font-bold text-gray-900">CampusConnect</span>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClubLayout;

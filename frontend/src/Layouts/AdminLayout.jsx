import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/admin/AdminSidebar";
import AdminNavbar from "../components/common/admin/AdminNavbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

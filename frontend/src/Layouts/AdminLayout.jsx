import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/admin/AdminSidebar";
import AdminNavbar from "../components/common/admin/AdminNavbar";
function AdminLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* page content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

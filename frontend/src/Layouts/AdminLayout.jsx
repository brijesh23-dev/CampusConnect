import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/common/admin/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/common/student/StudentSidebar";
import TopNavbar from "../components/common/student/TopNavbar";

function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <StudentSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;

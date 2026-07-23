import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/common/student/StudentSidebar";
import TopNavbar from "../components/common/student/TopNavbar";

function StudentLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;

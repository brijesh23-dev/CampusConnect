import { Outlet } from "react-router-dom";
import ClubSidebar from "../components/common/ClubSidebar";

function ClubLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar - Flexible Width */}
      <ClubSidebar />
      
      {/* Main Content - Flexible & Expandable */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ClubLayout;

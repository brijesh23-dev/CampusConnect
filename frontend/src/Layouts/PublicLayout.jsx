import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/common/Public/PublicNavbar"
import PublicFooter from "../components/common/Public/PublicFooter"
function PublicLayout() {
  return (
    <>
      <PublicNavbar/>
      <main className="min-h-screen">
        <Outlet />
      </main>

      <PublicFooter/>
    </>
  );
}

export default PublicLayout;
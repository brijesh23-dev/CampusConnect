import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { MdSchool } from "react-icons/md";

function ProtectedRoute({ children, role }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center gap-5">
          {/* Animated logo icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg animate-pulse">
            <MdSchool className="text-3xl text-white" />
          </div>
          {/* Spinner */}
          <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-400 tracking-wide">
            Loading your experience…
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/events" />;
  }

  return children;
}

export default ProtectedRoute;
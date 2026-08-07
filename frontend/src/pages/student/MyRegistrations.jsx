import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMyregistration, cancelRegistration } from "../../redux/RegistrationSlice";
import RegistrationCard from "../../components/common/student/RegistrationCard";
import { Link } from "react-router-dom";
import { MdEventAvailable, MdCalendarToday, MdErrorOutline } from "react-icons/md";

// Loading skeleton card
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="h-3 bg-gray-100 rounded-full w-1/3 mb-4" />
      <div className="h-5 bg-gray-100 rounded-full w-3/4 mb-3" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2 mb-2" />
      <div className="h-3 bg-gray-100 rounded-full w-2/3 mb-6" />
      <div className="h-8 bg-gray-100 rounded-xl w-full" />
    </div>
  );
}

function MyRegistrations() {
  const dispatch = useDispatch();
  const { registrations, loading } = useSelector((state) => state.registrations);
  const [cancelError, setCancelError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyregistration());
  }, [dispatch]);

  const handleCancel = async (registrationId) => {
    setCancelError(null);
    setCancellingId(registrationId);
    const result = await dispatch(cancelRegistration(registrationId));
    setCancellingId(null);
    if (cancelRegistration.rejected.match(result)) {
      setCancelError(result.payload || "Failed to cancel. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {/* Page header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
          <MdEventAvailable className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">My Registrations</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {loading
              ? "Loading your events…"
              : registrations.length > 0
              ? `You are registered for ${registrations.length} event${registrations.length !== 1 ? "s" : ""}`
              : "You haven't registered for any events yet"}
          </p>
        </div>
      </div>

      {/* Cancel error banner */}
      {cancelError && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 mb-4">
          <MdErrorOutline className="text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600 font-medium">{cancelError}</p>
          <button
            onClick={() => setCancelError(null)}
            className="ml-auto text-xs text-red-400 hover:text-red-600 font-semibold"
          >Dismiss</button>
        </div>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && registrations.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <MdCalendarToday className="text-3xl text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No registrations yet</h3>
          <p className="text-sm text-gray-400 mb-6">
            Explore upcoming events and RSVP to add them here.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition shadow"
          >
            Browse Events
          </Link>
        </div>
      )}

      {/* Registrations grid */}
      {!loading && registrations.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg) => (
            <RegistrationCard
              key={reg._id}
              registration={reg}
              onCancel={handleCancel}
              cancelling={cancellingId === reg._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;

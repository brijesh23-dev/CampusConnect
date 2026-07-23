import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyregistration } from "../../redux/RegistrationSlice";
import RegistrationCard from "../../components/common/student/RegistrationCard";

function MyRegistrations() {
  const dispatch = useDispatch();
  const { registrations } = useSelector((state) => state.registrations);

  useEffect(() => {
    dispatch(fetchMyregistration());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">My Registered Events</h1>
        <p className="text-gray-500 mt-1">Here are the events you are currently signed up to attend.</p>
      </div>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
          <p className="text-gray-400 font-medium mb-4">You haven't registered for any events yet.</p>
          <a
            href="/events"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition shadow"
          >
            Browse Events
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((reg) => (
            <RegistrationCard key={reg._id} registration={reg} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRegistrations;

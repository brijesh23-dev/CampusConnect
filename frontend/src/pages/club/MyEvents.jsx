import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchMyEvents, deleteEvent } from "../../redux/eventSlice";
import EventTable from "../../components/common/club/EventTable";

function MyEvents() {
  const dispatch = useDispatch();

  const { events, loading } = useSelector((state) => state.events);
  console.log(events);

  useEffect(() => {
    dispatch(fetchMyEvents());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteEvent(id)).unwrap();
      alert("Event deleted successfully");
    } catch (error) {
      
    }
  };

  if (loading || !events) {
    return (
      <div className="flex justify-center mt-20">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 font-Inter">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">My Events</h1>

          <Link
            to="/clubs/create-event"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-3">No Events Yet</h2>

            <p className="text-gray-600 mb-6">
              Start by creating your first event.
            </p>

            <Link
              to="/clubs/create-event"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Create Event
            </Link>
          </div>
        ) : (
          <EventTable events={events} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}

export default MyEvents;

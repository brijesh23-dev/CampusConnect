import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMyEvents,
  deleteEvent,
} from "../redux/eventSlice";

function MyEvents() {
  const dispatch = useDispatch();

  const { events, loading } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(fetchMyEvents());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await dispatch(deleteEvent(id)).unwrap();
      alert("Event deleted successfully");
    } catch (error) {
      
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            My Events
          </h1>

          <Link
            to="/create-event"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Create Event
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-3">
              No Events Yet
            </h2>

            <p className="text-gray-600 mb-6">
              Start by creating your first event.
            </p>

            <Link
              to="/create-event"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Create Event
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">
                    {event.title}
                  </h2>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {event.category}
                  </span>
                </div>
                <div>
                  {event.image ? (
                    <img
                      src={event.image  }
                      alt="#"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  ):<h1> no image is available</h1>}
                  </div>

                <p className="text-gray-600 mb-4">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    📅{" "}
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </p>

                  <p>⏰ {event.time}</p>

                  <p>📍 {event.venue}</p>

                  <p>
                    👥 Registered:{" "}
                    {event.registeredStudents?.length || 0}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link
                    to={`/edit-event/${event._id}`}
                    className="flex-1 text-center bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(event._id)
                    }
                    className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyEvents;
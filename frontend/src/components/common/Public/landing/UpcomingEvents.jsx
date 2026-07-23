import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../../../redux/eventSlice";
import { MdCalendarToday, MdLocationOn, MdArrowForward } from "react-icons/md";

function UpcomingEvents() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Take the 3 most recent/upcoming events
  const upcoming = (events || []).slice(0, 3);

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Featured Upcoming Events
            </h2>
            <p className="text-gray-500 mt-2">
              Catch the most anticipated gatherings and workshops on campus.
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 transition hover:underline whitespace-nowrap"
          >
            Explore All Events
            <MdArrowForward className="text-lg" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : upcoming.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <p className="text-gray-400 font-medium">No upcoming events listed yet.</p>
            <Link
              to="/clubs/create-event"
              className="mt-4 inline-block text-sm text-blue-600 font-semibold hover:underline"
            >
              Host the first event →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcoming.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Event Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center">
                      <span className="text-4xl">🎓</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {event.category}
                  </span>
                </div>

                {/* Event Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-violet-600 mb-1.5 uppercase tracking-wide">
                    {event.club?.name || "Campus Organizer"}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug line-clamp-2">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-6 text-sm text-gray-500 mt-auto">
                    <div className="flex items-center gap-2">
                      <MdCalendarToday className="text-base text-gray-400" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {event.time && ` • ${event.time}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdLocationOn className="text-base text-gray-400" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  <Link
                    to={`/events/${event._id}`}
                    className="w-full text-center py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default UpcomingEvents;

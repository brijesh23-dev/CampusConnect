import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../redux/eventSlice";
import {
  MdStar,
  MdCalendarToday,
  MdLocationOn,
  MdPeople,
  MdArrowForward,
  MdCategory,
  MdExplore,
} from "react-icons/md";

const categoryColors = {
  academic:      { bg: "bg-blue-50",    text: "text-blue-600",    dot: "bg-blue-500"    },
  workshop:      { bg: "bg-violet-50",  text: "text-violet-600",  dot: "bg-violet-500"  },
  technology:    { bg: "bg-indigo-50",  text: "text-indigo-600",  dot: "bg-indigo-500"  },
  social:        { bg: "bg-pink-50",    text: "text-pink-600",    dot: "bg-pink-500"    },
  sports:        { bg: "bg-orange-50",  text: "text-orange-600",  dot: "bg-orange-500"  },
  music:         { bg: "bg-fuchsia-50", text: "text-fuchsia-600", dot: "bg-fuchsia-500" },
  business:      { bg: "bg-emerald-50", text: "text-emerald-600", dot: "bg-emerald-500" },
  arts:          { bg: "bg-amber-50",   text: "text-amber-600",   dot: "bg-amber-500"   },
};

function getCategoryStyle(cat = "") {
  return categoryColors[cat.toLowerCase()] || { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" };
}

function RecommendedEvents() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  const interests = user?.interests || [];

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Filter events matching user interests
  const recommended = useMemo(() => {
    if (!interests.length) return [];
    return events.filter((e) =>
      interests.some(
        (interest) =>
          e.category?.toLowerCase() === interest.toLowerCase() ||
          e.title?.toLowerCase().includes(interest.toLowerCase())
      )
    );
  }, [events, interests]);

  // Non-recommended events for "Explore more"
  const others = useMemo(() => {
    return events.filter((e) => !recommended.find((r) => r._id === e._id)).slice(0, 6);
  }, [events, recommended]);

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      : "TBA";

  const EventCard = ({ event, featured }) => {
    const style = getCategoryStyle(event.category);
    return (
      <div
        className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden ${featured ? "ring-2 ring-blue-100" : ""}`}
      >
        {/* Event image or gradient fallback */}
        {event.image ? (
          <img src={event.image} alt={event.title} className="h-36 w-full object-cover" />
        ) : (
          <div className={`h-36 w-full bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center text-4xl`}>
            🎓
          </div>
        )}

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${style.bg} ${style.text}`}>
              {event.category || "General"}
            </span>
            {featured && (
              <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <MdStar className="text-sm" /> Matched
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-2 flex-1">
            {event.title}
          </h3>

          <div className="space-y-1 text-xs text-gray-400 mb-4">
            <div className="flex items-center gap-1.5">
              <MdCalendarToday className="text-sm flex-shrink-0" />
              {formatDate(event.date)}
              {event.time && <span>• {event.time}</span>}
            </div>
            <div className="flex items-center gap-1.5">
              <MdLocationOn className="text-sm flex-shrink-0" />
              <span className="truncate">{event.venue || "TBA"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MdPeople className="text-sm flex-shrink-0" />
              {event.registeredStudents?.length || 0} registered
            </div>
          </div>

          <Link
            to={`/events/${event._id}`}
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
          >
            View Event <MdArrowForward className="text-sm" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
          <MdStar className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Recommended For You</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Events curated based on your interests
            {interests.length > 0 && (
              <>
                {" "}—{" "}
                {interests.map((i) => (
                  <span key={i} className="inline-block px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold capitalize mr-1">
                    {i}
                  </span>
                ))}
              </>
            )}
          </p>
        </div>
      </div>

      {/* No interests state */}
      {!loading && interests.length === 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100 rounded-2xl p-10 text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
            <MdCategory className="text-2xl text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Interests Set</h3>
          <p className="text-sm text-gray-500 mb-5">
            Tell us what you love and we'll find the perfect events for you.
          </p>
          <Link
            to="/student/interests"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-bold hover:opacity-90 transition shadow-sm"
          >
            Set My Interests
          </Link>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Recommended grid */}
      {!loading && interests.length > 0 && (
        <>
          {recommended.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-10 text-center mb-10">
              <p className="text-sm text-gray-400 font-medium mb-2">
                No upcoming events match your current interests.
              </p>
              <Link to="/events" className="text-sm text-blue-600 font-semibold hover:underline">
                Browse all events →
              </Link>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {recommended.map((event) => (
                  <EventCard key={event._id} event={event} featured />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Explore more section */}
      {!loading && others.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <MdExplore className="text-xl text-gray-400" />
              Explore More
            </h2>
            <Link to="/events" className="text-sm text-blue-600 font-semibold hover:underline">
              View all
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((event) => (
              <EventCard key={event._id} event={event} featured={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecommendedEvents;

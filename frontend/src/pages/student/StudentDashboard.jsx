import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyregistration } from "../../redux/RegistrationSlice";
import { fetchEvents } from "../../redux/eventSlice";
import {
  MdEventAvailable,
  MdFavoriteBorder,
  MdCalendarToday,
  MdLocationOn,
  MdArrowForward,
  MdStar,
  MdExplore,
  MdSettings,
  MdAdd,
} from "react-icons/md";
import DashboardCard from "../../components/common/student/DashboardCard";
import ProfileCard from "../../components/common/student/ProfileCard";

// Format date helper
function fmtDate(d) {
  if (!d) return "TBA";
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Compact event card for "For You" section
function EventMiniCard({ event, featured }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Image / gradient */}
      {event.image ? (
        <img
          src={event.image}
          alt={event.title}
          className="h-32 w-full object-cover"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      ) : (
        <div className="h-32 w-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-3xl">
          🎓
        </div>
      )}
      <div className="p-4 flex-1 flex flex-col">
        {featured && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 mb-1.5">
            <MdStar className="text-xs" /> Recommended
          </span>
        )}
        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-2 flex-1">
          {event.title}
        </h3>
        <div className="space-y-1 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <MdCalendarToday className="text-sm flex-shrink-0" />
            {fmtDate(event.date)}{event.time && ` · ${event.time}`}
          </div>
          <div className="flex items-center gap-1.5">
            <MdLocationOn className="text-sm flex-shrink-0" />
            <span className="truncate">{event.venue || "TBA"}</span>
          </div>
        </div>
        <Link
          to={`/events/${event._id}`}
          className="mt-3 flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
        >
          View Event <MdArrowForward className="text-sm" />
        </Link>
      </div>
    </div>
  );
}

function StudentDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { registrations } = useSelector((state) => state.registrations);
  const { events } = useSelector((state) => state.events);

  const interests = user?.interests || [];

  useEffect(() => {
    dispatch(fetchMyregistration());
    dispatch(fetchEvents());
  }, [dispatch]);

  // Upcoming registrations (future events only)
  const upcomingRegs = registrations.filter((r) =>
    r.event?.date ? new Date(r.event.date) > new Date() : true
  );

  // Recommended events matching interests (not already registered)
  const registeredIds = new Set(registrations.map((r) => r.event?._id));
  const recommended = events
    .filter(
      (e) =>
        !registeredIds.has(e._id) &&
        interests.some(
          (i) =>
            e.category?.toLowerCase() === i.toLowerCase() ||
            e.title?.toLowerCase().includes(i.toLowerCase())
        )
    )
    .slice(0, 3);

  // Fallback: latest events if no interests or no matches
  const exploreFallback = events
    .filter((e) => !registeredIds.has(e._id))
    .slice(0, 3);

  const forYouEvents = recommended.length > 0 ? recommended : exploreFallback;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main content (2/3) ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Welcome banner */}
            <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-8 border border-blue-100 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-violet-100 opacity-60 blur-3xl" />
              <div className="relative z-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome back, {user?.name?.split(" ")[0] || "there"}! 👋
                </h1>
                <p className="text-gray-500 text-sm max-w-md">
                  {upcomingRegs.length > 0
                    ? `You have ${upcomingRegs.length} upcoming event${upcomingRegs.length !== 1 ? "s" : ""}.`
                    : "Discover events that match your interests below."}
                  {interests.length > 0 &&
                    ` Events tailored to your ${interests[0]} interest are highly recommended.`}
                </p>

                {/* Interest tags */}
                {interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 text-xs font-semibold capitalize"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <DashboardCard
                title="Registered Events"
                value={registrations.length}
                change={upcomingRegs.length > 0 ? `${upcomingRegs.length} upcoming` : "View all"}
                positive={upcomingRegs.length > 0}
                icon={<MdEventAvailable className="text-2xl" />}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
              />
              <DashboardCard
                title="Your Interests"
                value={interests.length}
                change={interests.length > 0 ? "Active" : "Set interests"}
                positive={interests.length > 0 ? null : false}
                icon={<MdFavoriteBorder className="text-2xl" />}
                iconBg="bg-violet-50"
                iconColor="text-violet-600"
              />
              <DashboardCard
                title="Explore Events"
                value={events.length}
                change="Available now"
                positive={true}
                icon={<MdExplore className="text-2xl" />}
                iconBg="bg-green-50"
                iconColor="text-green-600"
              />
            </div>

            {/* For You / Recommended */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {recommended.length > 0 ? "Recommended For You" : "Explore Events"}
                  </h2>
                  {recommended.length > 0 && (
                    <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <MdStar className="text-xs" /> Based on your interests
                    </span>
                  )}
                </div>
                <Link
                  to={recommended.length > 0 ? "/student/recommended" : "/events"}
                  className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1"
                >
                  View all <MdArrowForward className="text-sm" />
                </Link>
              </div>

              {forYouEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {forYouEvents.map((event) => (
                    <EventMiniCard
                      key={event._id}
                      event={event}
                      featured={recommended.some((r) => r._id === event._id)}
                    />
                  ))}
                </div>
              ) : (
                /* No events fallback */
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                  <MdExplore className="text-4xl text-gray-200 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-400 mb-3">
                    No events to show yet.
                  </p>
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                  >
                    Browse all events
                  </Link>
                </div>
              )}
            </div>

            {/* Upcoming Registrations preview */}
            {upcomingRegs.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Your Upcoming Events</h2>
                  <Link
                    to="/student/registrations"
                    className="text-sm text-blue-600 font-semibold hover:underline"
                  >
                    View all →
                  </Link>
                </div>
                <div className="space-y-3">
                  {upcomingRegs.slice(0, 3).map((reg) => {
                    const ev = reg.event || {};
                    return (
                      <div
                        key={reg._id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition"
                      >
                        {/* Date block */}
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex flex-col items-center justify-center text-white flex-shrink-0 shadow-sm">
                          <span className="text-[10px] font-bold uppercase leading-none">
                            {ev.date ? new Date(ev.date).toLocaleString("en-US", { month: "short" }) : "—"}
                          </span>
                          <span className="text-xl font-extrabold leading-tight">
                            {ev.date ? new Date(ev.date).getDate() : "—"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{ev.title || "Event"}</p>
                          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1 truncate">
                            <MdLocationOn className="text-sm flex-shrink-0" />
                            {ev.venue || "TBA"}
                          </p>
                        </div>
                        <Link
                          to={`/events/${ev._id}`}
                          className="text-xs text-blue-600 font-semibold hover:underline flex-shrink-0"
                        >
                          Details
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Browse Events", to: "/events", icon: "🎉" },
                { label: "Clubs Directory", to: "/clubs-directory", icon: "🏛️" },
                { label: "My Interests", to: "/student/interests", icon: "⭐" },
                { label: "Settings", to: "/student/settings", icon: "⚙️" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center flex flex-col items-center gap-2"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-semibold text-gray-600">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* ── Profile sidebar (1/3) ── */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Your Profile</h2>
              <Link
                to="/student/settings"
                className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                title="Settings"
              >
                <MdSettings className="text-lg" />
              </Link>
            </div>
            <ProfileCard user={user} />

            {/* Manage interests CTA */}
            {interests.length === 0 && (
              <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 rounded-2xl p-5 text-center">
                <p className="text-xs text-gray-500 mb-3">
                  Set your interests to get personalized event recommendations.
                </p>
                <Link
                  to="/student/interests"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold hover:opacity-90 transition shadow-sm"
                >
                  <MdAdd className="text-sm" /> Set Interests
                </Link>
              </div>
            )}

            {/* Registration summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-700 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                {[
                  { label: "Total RSVPs", value: registrations.length },
                  { label: "Upcoming", value: upcomingRegs.length },
                  { label: "Interests", value: interests.length },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-sm font-bold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/student/registrations"
                className="mt-4 flex items-center justify-center gap-1 w-full py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                View all registrations <MdArrowForward className="text-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
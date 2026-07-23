import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  MdLocationOn,
  MdAccessTime,
  MdCalendarToday,
  MdPeopleOutline,
  MdArrowBack,
  MdOpenInNew,
} from "react-icons/md";
import { fetchSingleEvent } from "../../redux/eventSlice";
import { registerForEvent, fetchMyregistration } from "../../redux/RegistrationSlice";

const relatedMock = [
  { id: "r1", category: "Workshop", title: "Intro to React Native Mobile Development", time: "6:00 PM", image: "" },
  { id: "r2", category: "Social", title: "Tech Alumni Mixer & Coffee Chat", venue: "Campus Café", image: "" },
  { id: "r3", category: "Hackathon", title: "Fall Campus Hack: Innovate for Good", time: "24 Hour Event", image: "" },
];

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleEvent, eventLoading } = useSelector((state) => state.events);
  const { loading, registrations } = useSelector((state) => state.registrations);

  const isRegistered = registrations?.some(
    (registration) => registration.event._id === id
  );

  useEffect(() => {
    dispatch(fetchSingleEvent(id));
    dispatch(fetchMyregistration());
  }, [dispatch, id]);

  const handleRegister = async () => {
    try {
      await dispatch(registerForEvent(id)).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (eventLoading || !singleEvent) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero image */}
      <div className="relative w-full h-72 md:h-96 bg-gray-200 overflow-hidden">
        {singleEvent.image ? (
          <img
            src={singleEvent.image}
            alt={singleEvent.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center">
            <span className="text-8xl">🎓</span>
          </div>
        )}
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {["Technology", "Networking", "In-Person"].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-green-600">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Registration Open
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
                {singleEvent.title}
              </h1>

              {/* Meta info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <MdCalendarToday className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Date & Time</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(singleEvent.date).toLocaleDateString("en-US", {
                        weekday: "long", month: "long", day: "numeric", year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500">{singleEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                    <MdLocationOn className="text-violet-600 text-lg" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Location</p>
                    <p className="text-sm font-semibold text-gray-900">{singleEvent.venue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About This Event</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {singleEvent.description}
              </p>
            </div>

            {/* You might also like */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">You might also like</h2>
                <Link to="/events" className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                  View all <MdOpenInNew className="text-base" />
                </Link>
              </div>
              <p className="text-sm text-gray-500 mb-5">Discover more events happening around campus.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedMock.map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition group"
                  >
                    <div className="relative h-36 bg-gradient-to-br from-blue-50 to-violet-100">
                      <span className="absolute top-2 left-2 bg-gray-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                        {e.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1 group-hover:text-blue-600 transition">
                        {e.title}
                      </h3>
                      {e.time && (
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MdAccessTime className="text-sm" /> {e.time}
                        </p>
                      )}
                      {e.venue && (
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <MdLocationOn className="text-sm" /> {e.venue}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Registration card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Registration</h3>
              <p className="text-sm text-gray-500 mb-5">
                Spots are filling up fast. Secure your ticket now.
              </p>

              <div className="flex items-center justify-between py-3 border-t border-gray-100 mb-5">
                <span className="text-sm font-medium text-gray-700">General Admission</span>
                <span className="text-sm font-bold text-green-600">Free</span>
              </div>

              <div className="mb-4">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "72%" }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                  <span className="inline-block w-3.5 h-3.5 text-blue-500">ℹ</span>
                  Requires student ID at check-in
                </p>
              </div>

              {isRegistered ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold text-sm cursor-not-allowed"
                >
                  Already Registered ✓
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition shadow-md"
                >
                  {loading ? "Registering..." : "Register Now"}
                </button>
              )}
            </div>

            {/* Organizer card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                Organized by
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {singleEvent.club?.name?.[0] || "C"}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {singleEvent.club?.name || "Campus Club"}
                  </p>
                  <p className="text-xs text-gray-400">450 Followers</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                Empowering students through technology. We organize workshops, hackathons, and networking events for future innovators.
              </p>
              <button className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2">
                <MdPeopleOutline className="text-lg" />
                + Follow Club
              </button>
            </div>

            {/* Back */}
            <Link
              to="/events"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition"
            >
              <MdArrowBack />
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;

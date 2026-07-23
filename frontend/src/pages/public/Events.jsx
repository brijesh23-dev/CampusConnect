import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../redux/eventSlice";
import { MdSearch, MdTune, MdLocationOn, MdCalendarToday, MdPeople } from "react-icons/md";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const CATEGORIES = ["All Events", "Tech Talks", "Career Fairs", "Music Performances", "Hackathons"];
const PAGE_SIZE = 6;

const statusBadge = {
  open:  { label: "Open",  color: "bg-green-500" },
  full:  { label: "Full",  color: "bg-red-500" },
  soon:  { label: "Soon",  color: "bg-yellow-500" },
};

function Events() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);

  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("all");
  const [activeTab, setActiveTab] = useState("All Events");
  const [page, setPage]           = useState(1);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || event.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [events, search, category]);

  const totalPages = Math.ceil(filteredEvents.length / PAGE_SIZE);
  const paged = filteredEvents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getStatus = (event) => {
    if (event.registeredStudents?.length >= event.capacity) return "full";
    return "open";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-1">
          Discover Campus Events
        </h1>
        <p className="text-gray-500">
          Find exactly what you're looking for, from academic workshops to weekend social mixers.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
            <MdSearch className="text-gray-400 text-xl flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by event name or keyword..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Category dropdown */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">Category</option>
            <option value="technology">Technology</option>
            <option value="coding">Coding</option>
            <option value="ai">AI</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="business">Business</option>
            <option value="social">Social</option>
            <option value="arts">Arts & Culture</option>
          </select>

          {/* Date filter */}
          <select className="border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200">
            <option>Date</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>

          {/* More filters */}
          <button className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition">
            <MdTune className="text-lg" />
            More Filters
          </button>
        </div>

        {/* Quick filter tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
          <span className="text-sm text-gray-500">
            Showing {filteredEvents.length} events
          </span>
        </div>

        {paged.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-bold text-gray-300 mb-2">No events found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((event) => {
              const status = getStatus(event);
              return (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col"
                >
                  {/* Card image */}
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
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {event.category}
                    </span>
                    {/* Status indicator */}
                    <span className={`absolute top-3 right-3 flex items-center gap-1.5 text-white text-xs font-semibold px-3 py-1 rounded-full ${statusBadge[status]?.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      {statusBadge[status]?.label}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-violet-600 font-semibold mb-1 truncate">
                      {event.club?.name || "Campus Club"}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug line-clamp-2">
                      {event.title}
                    </h3>

                    <div className="space-y-1.5 mb-5">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MdCalendarToday className="text-base flex-shrink-0" />
                        <span>{new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MdLocationOn className="text-base flex-shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <Link
                        to={`/events/${event._id}`}
                        className="flex-1 text-center py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                      >
                        View Details
                      </Link>
                      {status === "full" ? (
                        <button
                          disabled
                          className="flex-1 text-center py-2.5 rounded-xl bg-gray-100 text-sm font-semibold text-gray-400 cursor-not-allowed"
                        >
                          Waitlist
                        </button>
                      ) : (
                        <Link
                          to={`/events/${event._id}`}
                          className="flex-1 text-center py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                        >
                          Register
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
            >
              <HiChevronLeft />
            </button>

            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition ${
                    page === p
                      ? "bg-blue-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            {totalPages > 5 && (
              <>
                <span className="text-gray-400 text-sm">...</span>
                <button
                  onClick={() => setPage(totalPages)}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
            >
              <HiChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;

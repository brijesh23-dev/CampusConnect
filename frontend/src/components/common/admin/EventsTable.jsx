import { useState } from "react";
import { MdSearch, MdDelete, MdCheckCircle, MdCancel, MdLocationOn } from "react-icons/md";

const mockInitialEvents = [
  { _id: "e1", title: "Future Tech Symposium: AI & Campus Life", category: "technology", date: "2026-07-10", venue: "Grand Hall, Room 402", organizer: "Campus Tech Society", status: "approved" },
  { _id: "e2", title: "Intro to React Native", category: "coding", date: "2026-07-15", venue: "CS Lab B", organizer: "Coding Club", status: "pending" },
  { _id: "e3", title: "Fall Semester Mixer", category: "social", date: "2026-08-05", venue: "Main Quad Garden", organizer: "Student Union", status: "approved" },
  { _id: "e4", title: "Life Drawing Session: Beginners", category: "arts", date: "2026-07-20", venue: "Studio Arts Bldg", organizer: "Fine Arts Collective", status: "approved" },
  { _id: "e5", title: "Spring Tech Career Fair 2026", category: "business", date: "2026-07-28", venue: "Student Union Grand Hall", organizer: "Career Services", status: "approved" },
];

function EventsTable() {
  const [events, setEvents] = useState(mockInitialEvents);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete/cancel this event?")) {
      setEvents(events.filter((e) => e._id !== id));
    }
  };

  const handleApprove = (id) => {
    setEvents(
      events.map((e) => {
        if (e._id === id) {
          return { ...e, status: "approved" };
        }
        return e;
      })
    );
  };

  const filtered = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.organizer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || e.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900 self-start sm:self-auto">Moderated Events ({filtered.length})</h3>
        <div className="flex w-full sm:w-auto gap-2">
          {/* Search */}
          <div className="flex-1 sm:w-64 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
            <MdSearch className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search event title or club..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder:text-gray-400"
            />
          </div>
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm text-gray-700 outline-none font-medium"
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="coding">Coding</option>
            <option value="social">Social</option>
            <option value="arts">Arts</option>
            <option value="business">Business</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Event</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Club / Host</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date & Venue</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Approval Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm">
                  No events found matching queries.
                </td>
              </tr>
            ) : (
              filtered.map((e) => (
                <tr key={e._id} className="hover:bg-gray-50/50 transition">
                  {/* Event Title */}
                  <td className="px-6 py-4">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate max-w-[220px]" title={e.title}>
                        {e.title}
                      </p>
                      <span className="inline-flex mt-1 px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[10px] font-bold uppercase tracking-wider">
                        {e.category}
                      </span>
                    </div>
                  </td>

                  {/* Organizer */}
                  <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                    {e.organizer}
                  </td>

                  {/* Date & Venue */}
                  <td className="px-6 py-4">
                    <div className="space-y-0.5 text-xs text-gray-500">
                      <p>{e.date}</p>
                      <p className="flex items-center gap-0.5 text-gray-400 truncate max-w-[150px]">
                        <MdLocationOn />
                        {e.venue}
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      e.status === "approved"
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        e.status === "approved" ? "bg-green-500" : "bg-amber-500"
                      }`} />
                      {e.status}
                    </span>
                  </td>

                  {/* Action delete/approve */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {e.status === "pending" && (
                        <button
                          onClick={() => handleApprove(e._id)}
                          className="p-1.5 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 transition"
                          title="Approve Event"
                        >
                          <MdCheckCircle className="text-base" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(e._id)}
                        className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                        title="Remove Event"
                      >
                        <MdDelete className="text-base" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventsTable;

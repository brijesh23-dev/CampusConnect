import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllAdminEvents,
  deleteAdminEvent,
  approveAdminEvent,
} from "../../../redux/adminSlice";
import {
  MdSearch,
  MdDelete,
  MdCheckCircle,
  MdLocationOn,
  MdRefresh,
} from "react-icons/md";

function EventsTable({ onDeleteRequest, compact }) {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [approvingId, setApprovingId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllAdminEvents());
  }, [dispatch]);

  const handleDelete = (id, title) => {
    if (onDeleteRequest) {
      onDeleteRequest(id, title);
    } else {
      dispatch(deleteAdminEvent(id));
    }
  };

  const handleApprove = async (id) => {
    setApprovingId(id);
    await dispatch(approveAdminEvent(id));
    setApprovingId(null);
  };

  const handleCategoryFilter = (cat) => {
    setFilterCategory(cat);
    dispatch(fetchAllAdminEvents(cat !== "all" ? { category: cat } : {}));
  };

  const allFiltered = events.filter((e) => {
    const title = (e.title || "").toLowerCase();
    const organizer = (e.club?.name || "").toLowerCase();
    return (
      title.includes(search.toLowerCase()) ||
      organizer.includes(search.toLowerCase())
    );
  });
  const filtered = compact ? allFiltered.slice(0, 5) : allFiltered;

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900 self-start sm:self-auto">
          Moderated Events ({filtered.length})
        </h3>
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
            onChange={(e) => handleCategoryFilter(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm text-gray-700 outline-none font-medium"
          >
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="coding">Coding</option>
            <option value="social">Social</option>
            <option value="arts">Arts</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
          </select>
          <button
            onClick={() => dispatch(fetchAllAdminEvents())}
            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-100 transition"
            title="Refresh"
          >
            <MdRefresh className="text-base" />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">{error}</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Event</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Club / Host</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date &amp; Venue</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm">
                  No events found.
                </td>
              </tr>
            ) : (
              filtered.map((e) => {
                const status = e.status || "approved";
                const isApproving = approvingId === e._id;
                return (
                  <tr key={e._id} className="hover:bg-gray-50/50 transition">
                    {/* Event Title */}
                    <td className="px-6 py-4">
                      <div className="min-w-0">
                        <p
                          className="text-sm font-bold text-gray-900 truncate max-w-[220px]"
                          title={e.title}
                        >
                          {e.title}
                        </p>
                        <span className="inline-flex mt-1 px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[10px] font-bold uppercase tracking-wider">
                          {e.category}
                        </span>
                      </div>
                    </td>

                    {/* Club */}
                    <td className="px-6 py-4 text-sm font-semibold text-gray-600">
                      {e.club?.name || "—"}
                    </td>

                    {/* Date & Venue */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 text-xs text-gray-500">
                        <p>{formatDate(e.date)}</p>
                        <p className="flex items-center gap-0.5 text-gray-400 truncate max-w-[150px]">
                          <MdLocationOn />
                          {e.venue}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          status === "approved"
                            ? "bg-green-50 text-green-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            status === "approved" ? "bg-green-500" : "bg-amber-500"
                          }`}
                        />
                        {status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {status === "pending" && (
                          <button
                            onClick={() => handleApprove(e._id)}
                            disabled={isApproving}
                            className="p-1.5 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 transition disabled:opacity-50"
                            title="Approve Event"
                          >
                            {isApproving ? (
                              <span className="w-3.5 h-3.5 border-2 border-green-400 border-t-transparent rounded-full animate-spin inline-block" />
                            ) : (
                              <MdCheckCircle className="text-base" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(e._id, e.title)}
                          className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                          title="Remove Event"
                        >
                          <MdDelete className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventsTable;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClubUsers, deleteUser } from "../../../redux/adminSlice";
import { MdSearch, MdDelete, MdGroups, MdEvent, MdRefresh } from "react-icons/md";

const categoryColors = {
  Technology: "bg-blue-50 text-blue-600",
  Arts: "bg-pink-50 text-pink-600",
  Music: "bg-violet-50 text-violet-600",
  Business: "bg-emerald-50 text-emerald-600",
  Sports: "bg-orange-50 text-orange-600",
};

function ClubsTable({ compact, onDeleteRequest }) {
  const dispatch = useDispatch();
  const { clubs, loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");

  // Fetch only users with role=club
  useEffect(() => {
    dispatch(fetchAllClubUsers());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    if (onDeleteRequest) {
      onDeleteRequest(id, name);
    } else {
      dispatch(deleteUser(id));
    }
  };

  const allFiltered = clubs.filter((c) => {
    const name = (c.name || "").toLowerCase();
    const email = (c.email || "").toLowerCase();
    return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });
  const filtered = compact ? allFiltered.slice(0, 5) : allFiltered;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900 self-start sm:self-auto">
          Platform Clubs ({filtered.length})
        </h3>
        <div className="flex w-full sm:w-auto gap-2">
          <div className="flex-1 sm:w-64 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
            <MdSearch className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search club name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={() => dispatch(fetchAllClubUsers())}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Club</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Events</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Joined</th>
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
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                  No clubs found.
                </td>
              </tr>
            ) : (
              filtered.map((club) => {
                const category = club.category || club.interests?.[0] || "";
                const joinedDate = club.createdAt
                  ? new Date(club.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "—";

                return (
                  <tr key={club._id} className="hover:bg-gray-50/50 transition">
                    {/* Club name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                          {(club.name || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{club.name}</p>
                          <p className="text-xs text-gray-400">{club.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      {category ? (
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            categoryColors[category] || "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {category}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>

                    {/* Events count (eventsCount comes from club controller public view; may be 0 here) */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-700">
                        <MdEvent className="text-base text-gray-400" />
                        {club.eventsCount ?? 0}
                      </span>
                    </td>

                    {/* Joined date */}
                    <td className="px-6 py-4 text-xs text-gray-400">{joinedDate}</td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(club._id, club.name)}
                        className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                        title="Delete Club"
                      >
                        <MdDelete className="text-base" />
                      </button>
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

export default ClubsTable;

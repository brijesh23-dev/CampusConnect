import { useState } from "react";
import { MdSearch, MdDelete, MdCheckCircle, MdBlock, MdGroups, MdEvent } from "react-icons/md";

const MOCK_CLUBS = [
  { _id: "c1", name: "Campus Tech Society", category: "Technology", eventsCount: 24, membersCount: 312, email: "cts@university.edu", status: "active" },
  { _id: "c2", name: "Fine Arts Collective", category: "Arts", eventsCount: 18, membersCount: 156, email: "arts@university.edu", status: "active" },
  { _id: "c3", name: "Coding Club", category: "Technology", eventsCount: 31, membersCount: 248, email: "code@university.edu", status: "active" },
  { _id: "c4", name: "Music Society", category: "Music", eventsCount: 14, membersCount: 198, email: "music@university.edu", status: "suspended" },
  { _id: "c5", name: "Entrepreneurship Cell", category: "Business", eventsCount: 20, membersCount: 290, email: "ecell@university.edu", status: "active" },
  { _id: "c6", name: "Sports Federation", category: "Sports", eventsCount: 38, membersCount: 420, email: "sports@university.edu", status: "active" },
  { _id: "c7", name: "Photography Club", category: "Arts", eventsCount: 12, membersCount: 134, email: "photo@university.edu", status: "pending" },
];

const categoryColors = {
  Technology: "bg-blue-50 text-blue-600",
  Arts: "bg-pink-50 text-pink-600",
  Music: "bg-violet-50 text-violet-600",
  Business: "bg-emerald-50 text-emerald-600",
  Sports: "bg-orange-50 text-orange-600",
};

function ClubsTable({ compact }) {
  const [clubs, setClubs] = useState(MOCK_CLUBS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleDelete = (id) => {
    setClubs(clubs.filter((c) => c._id !== id));
  };

  const toggleStatus = (id) => {
    setClubs(clubs.map((c) =>
      c._id === id
        ? { ...c, status: c.status === "active" ? "suspended" : "active" }
        : c
    ));
  };

  const handleApprove = (id) => {
    setClubs(clubs.map((c) =>
      c._id === id ? { ...c, status: "active" } : c
    ));
  };

  const allFiltered = clubs.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const filtered = compact ? allFiltered.slice(0, 5) : allFiltered;

  const statusBadge = (status) => {
    const map = {
      active:    "bg-green-50 text-green-600",
      suspended: "bg-red-50 text-red-500",
      pending:   "bg-amber-50 text-amber-600",
    };
    const dot = { active: "bg-green-500", suspended: "bg-red-500", pending: "bg-amber-500" };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${map[status] || "bg-gray-100 text-gray-500"}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dot[status] || "bg-gray-400"}`} />
        {status}
      </span>
    );
  };

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
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm text-gray-700 outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Club</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Events</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Members</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-sm">
                  No clubs found matching your query.
                </td>
              </tr>
            ) : (
              filtered.map((club) => (
                <tr key={club._id} className="hover:bg-gray-50/50 transition">
                  {/* Club name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                        {club.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{club.name}</p>
                        <p className="text-xs text-gray-400">{club.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[club.category] || "bg-gray-100 text-gray-600"}`}>
                      {club.category}
                    </span>
                  </td>

                  {/* Events count */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-700">
                      <MdEvent className="text-base text-gray-400" />
                      {club.eventsCount}
                    </span>
                  </td>

                  {/* Members count */}
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-700">
                      <MdGroups className="text-base text-gray-400" />
                      {club.membersCount}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">{statusBadge(club.status)}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {club.status === "pending" && (
                        <button
                          onClick={() => handleApprove(club._id)}
                          className="p-1.5 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 transition"
                          title="Approve Club"
                        >
                          <MdCheckCircle className="text-base" />
                        </button>
                      )}
                      {club.status !== "pending" && (
                        <button
                          onClick={() => toggleStatus(club._id)}
                          className={`p-1.5 rounded-xl border transition ${
                            club.status === "active"
                              ? "border-amber-200 text-amber-500 hover:bg-amber-50"
                              : "border-green-200 text-green-600 hover:bg-green-50"
                          }`}
                          title={club.status === "active" ? "Suspend Club" : "Activate Club"}
                        >
                          {club.status === "active"
                            ? <MdBlock className="text-base" />
                            : <MdCheckCircle className="text-base" />
                          }
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(club._id)}
                        className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                        title="Delete Club"
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

export default ClubsTable;

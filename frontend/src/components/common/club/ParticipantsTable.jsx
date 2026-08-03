import { MdPerson, MdEmail, MdCalendarToday, MdSearch, MdDownload } from "react-icons/md";
import { useState } from "react";

function ParticipantsTable({ participants = [], eventTitle = "" }) {
  const [search, setSearch] = useState("");

  const filtered = participants.filter((p) => {
    const name = (p?.student?.name || p?.name || "").toLowerCase();
    const email = (p?.student?.email || p?.email || "").toLowerCase();
    return name.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            Participants
            <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
              {participants.length}
            </span>
          </h3>
          {eventTitle && (
            <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{eventTitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
            <input
              type="text"
              placeholder="Search participants…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition w-56 bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Table body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Participant</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider">Registered On</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <MdPerson className="text-2xl text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">
                      {search ? "No participants match your search." : "No participants yet."}
                    </p>
                    {search && (
                      <button
                        onClick={() => setSearch("")}
                        className="text-xs text-blue-600 font-semibold hover:underline mt-1"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((p, idx) => {
                const name = p?.student?.name || p?.name || "Unknown";
                const email = p?.student?.email || p?.email || "—";
                const registeredAt = p?.createdAt || p?.registeredAt;

                return (
                  <tr key={p._id || idx} className="hover:bg-gray-50/60 transition">
                    <td className="px-6 py-4 text-xs text-gray-400 font-semibold">{idx + 1}</td>

                    {/* Avatar + name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {getInitials(name)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <MdEmail className="text-sm text-gray-400 flex-shrink-0" />
                        <span className="truncate max-w-[200px]">{email}</span>
                      </div>
                    </td>

                    {/* Registered date */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <MdCalendarToday className="text-xs text-gray-400 flex-shrink-0" />
                        {formatDate(registeredAt)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Confirmed
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {participants.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400 font-medium">
          Showing {filtered.length} of {participants.length} participant{participants.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

export default ParticipantsTable;
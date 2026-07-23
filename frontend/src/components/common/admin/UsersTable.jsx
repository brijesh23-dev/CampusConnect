import { useState } from "react";
import { MdSearch, MdDelete, MdShield, MdPerson, MdGroups } from "react-icons/md";

const mockInitialUsers = [
  { _id: "u1", name: "Alex Rivera", email: "alex@university.edu", role: "student", status: "active", dateJoined: "2026-01-15" },
  { _id: "u2", name: "Campus Tech Society", email: "cts@university.edu", role: "club", status: "active", dateJoined: "2026-02-10" },
  { _id: "u3", name: "Sarah Jenkins", email: "sarah.j@university.edu", role: "club", status: "active", dateJoined: "2026-02-28" },
  { _id: "u4", name: "System Administrator", email: "admin@university.edu", role: "admin", status: "active", dateJoined: "2025-12-01" },
  { _id: "u5", name: "Michael Chang", email: "mchang@university.edu", role: "student", status: "active", dateJoined: "2026-03-04" },
  { _id: "u6", name: "Emily Chen", email: "emily.arts@university.edu", role: "student", status: "active", dateJoined: "2026-03-12" },
];

function UsersTable() {
  const [users, setUsers] = useState(mockInitialUsers);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u._id !== id));
    }
  };

  const handleToggleRole = (id) => {
    setUsers(
      users.map((u) => {
        if (u._id === id) {
          const nextRole = u.role === "student" ? "club" : u.role === "club" ? "admin" : "student";
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900 self-start sm:self-auto">Platform Users ({filtered.length})</h3>
        <div className="flex w-full sm:w-auto gap-2">
          {/* Search */}
          <div className="flex-1 sm:w-64 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
            <MdSearch className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search user name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder:text-gray-400"
            />
          </div>
          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm text-gray-700 outline-none"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="club">Clubs</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-sm">
                  No users found matching query.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50/50 transition">
                  {/* Name and Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                        u.role === "admin"
                          ? "bg-red-500"
                          : u.role === "club"
                          ? "bg-violet-500"
                          : "bg-blue-500"
                      }`}>
                        {u.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{u.name}</p>
                        <span className="text-[10px] text-gray-400">Joined {u.dateJoined}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {u.email}
                  </td>

                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleRole(u._id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize transition hover:opacity-80 ${
                        u.role === "admin"
                          ? "bg-red-50 text-red-600 border border-red-100"
                          : u.role === "club"
                          ? "bg-violet-50 text-violet-600 border border-violet-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                      title="Click to cycle role"
                    >
                      {u.role === "admin" && <MdShield className="text-xs" />}
                      {u.role === "club" && <MdGroups className="text-xs" />}
                      {u.role === "student" && <MdPerson className="text-xs" />}
                      {u.role}
                    </button>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {u.status}
                    </span>
                  </td>

                  {/* Action delete */}
                  <td className="px-6 py-4 text-right">
                    {u.role !== "admin" ? (
                      <button
                        onClick={() => handleDelete(u._id)}
                        className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                        title="Delete User"
                      >
                        <MdDelete className="text-base" />
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 italic">Protected</span>
                    )}
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

export default UsersTable;

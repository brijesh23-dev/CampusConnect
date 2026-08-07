import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUser, updateUserRole } from "../../../redux/adminSlice";
import { MdSearch, MdDelete, MdShield, MdPerson, MdGroups, MdRefresh, MdSwapHoriz } from "react-icons/md";

function UsersTable({ onDeleteRequest, compact }) {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [togglingId, setTogglingId] = useState(null); // which user's role is being changed

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Re-fetch with server-side filter when role changes
  const handleRoleFilter = (role) => {
    setFilterRole(role);
    dispatch(fetchAllUsers(role !== "all" ? { role } : {}));
  };

  const handleDelete = (id, name) => {
    if (onDeleteRequest) {
      onDeleteRequest(id, name);
    } else {
      dispatch(deleteUser(id));
    }
  };

  const handleRoleToggle = async (user) => {
    const newRole = user.role === "student" ? "club" : "student";
    setTogglingId(user._id);
    await dispatch(updateUserRole({ id: user._id, role: newRole }));
    setTogglingId(null);
  };

  // Client-side search filter on top of server data
  const allFiltered = users.filter((u) => {
    const name = u.name || "";
    const email = u.email || "";
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });
  const filtered = compact ? allFiltered.slice(0, 5) : allFiltered;

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-gray-900 self-start sm:self-auto">
          Platform Users ({filtered.length})
        </h3>
        <div className="flex w-full sm:w-auto gap-2">
          {/* Search */}
          <div className="flex-1 sm:w-64 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-2">
            <MdSearch className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-gray-700 w-full outline-none placeholder:text-gray-400"
            />
          </div>
          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => handleRoleFilter(e.target.value)}
            className="border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm text-gray-700 outline-none"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="club">Clubs</option>
            <option value="admin">Admins</option>
          </select>
          <button
            onClick={() => dispatch(fetchAllUsers())}
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
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
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
                  No users found.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50/50 transition">
                  {/* Name + Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white ${
                        u.role === "admin" ? "bg-red-500" : u.role === "club" ? "bg-violet-500" : "bg-blue-500"
                      }`}>
                        {(u.name || "?")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{u.name}</p>
                        <span className="text-[10px] text-gray-400">{u.interests?.join(", ") || "No interests"}</span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>

                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      u.role === "admin"
                        ? "bg-red-50 text-red-600 border border-red-100"
                        : u.role === "club"
                        ? "bg-violet-50 text-violet-600 border border-violet-100"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                      {u.role === "admin" && <MdShield className="text-xs" />}
                      {u.role === "club" && <MdGroups className="text-xs" />}
                      {u.role === "student" && <MdPerson className="text-xs" />}
                      {u.role}
                    </span>
                  </td>

                  {/* Joined date */}
                  <td className="px-6 py-4 text-xs text-gray-400">{formatDate(u.createdAt)}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    {u.role !== "admin" ? (
                      <div className="flex items-center justify-end gap-2">
                        {/* Role toggle */}
                        <button
                          onClick={() => handleRoleToggle(u)}
                          disabled={togglingId === u._id}
                          title={`Switch to ${u.role === "student" ? "club" : "student"}`}
                          className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border text-xs font-semibold transition ${
                            togglingId === u._id
                              ? "border-gray-100 text-gray-300 cursor-not-allowed"
                              : "border-violet-200 text-violet-600 hover:bg-violet-50"
                          }`}
                        >
                          {togglingId === u._id ? (
                            <span className="w-3 h-3 border-2 border-violet-300 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <MdSwapHoriz className="text-sm" />
                          )}
                          {u.role === "student" ? "→ Club" : "→ Student"}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(u._id, u.name)}
                          className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition"
                          title="Delete User"
                        >
                          <MdDelete className="text-base" />
                        </button>
                      </div>
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

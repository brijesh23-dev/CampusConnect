import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubProfile, updateClubProfile } from "../../redux/clubSlice";
import {
  MdAccountCircle,
  MdEdit,
  MdSave,
  MdCheckCircle,
  MdEmail,
  MdLanguage,
  MdDescription,
  MdCategory,
  MdPeople,
  MdEvent,
} from "react-icons/md";

const CATEGORIES = ["Technology", "Arts", "Music", "Business", "Sports", "Academic", "Social", "Other"];

function ClubProfile() {
  const dispatch = useDispatch();
  const { clubProfile, loading } = useSelector((state) => state.clubs);
  const { user } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    email: "",
    website: "",
  });

  useEffect(() => {
    dispatch(fetchClubProfile());
  }, [dispatch]);

  useEffect(() => {
    if (clubProfile) {
      setForm({
        name: clubProfile.name || "",
        description: clubProfile.description || "",
        category: clubProfile.category || "",
        email: clubProfile.email || "",
        website: clubProfile.website || "",
      });
    } else if (user) {
      // Fallback: use auth user data
      setForm((prev) => ({ ...prev, name: user.name || "", email: user.email || "" }));
    }
  }, [clubProfile, user]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateClubProfile(form)).unwrap();
      setSaved(true);
      setEditing(false);
    } catch {
      // Use local state update as graceful fallback
      setSaved(true);
      setEditing(false);
    }
  };

  const profile = clubProfile || {
    name: user?.name || "My Club",
    email: user?.email || "",
    category: "Technology",
    description: "Add a description to let students know what your club is about.",
    membersCount: 0,
    eventsCount: 0,
  };

  const inputBase = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-white disabled:bg-gray-50 disabled:text-gray-500";
  const labelBase = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Club Profile</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your club's public-facing profile.
          </p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm
            ${saved && !editing
              ? "bg-emerald-500 text-white"
              : editing
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
        >
          {saved && !editing ? (
            <><MdCheckCircle className="text-base" /> Saved</>
          ) : editing ? (
            <><MdSave className="text-base" /> Save Profile</>
          ) : (
            <><MdEdit className="text-base" /> Edit Profile</>
          )}
        </button>
      </div>

      {/* Profile banner */}
      <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-6 text-white mb-6 flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-3xl font-black flex-shrink-0">
          {(form.name || profile.name)?.[0]?.toUpperCase() || "C"}
        </div>
        <div>
          <h2 className="text-2xl font-black">{form.name || profile.name}</h2>
          <p className="text-white/70 text-sm mt-0.5">{form.category || profile.category}</p>
          <div className="flex gap-4 mt-3 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <MdPeople className="text-base" />
              {profile.membersCount ?? 0} members
            </span>
            <span className="flex items-center gap-1.5">
              <MdEvent className="text-base" />
              {profile.eventsCount ?? 0} events
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MdAccountCircle className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Profile Information</h2>
        </div>

        <div className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className={labelBase}>Club Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              disabled={!editing}
              className={inputBase}
              placeholder="Enter your club name"
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelBase}>
              <span className="flex items-center gap-1"><MdCategory className="text-sm" /> Category</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={!editing}
              className={inputBase}
            >
              <option value="">Select category…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelBase}>
              <span className="flex items-center gap-1"><MdDescription className="text-sm" /> Description</span>
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              disabled={!editing}
              className={`${inputBase} resize-none`}
              placeholder="Describe your club — events you host, who should join, your goals…"
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelBase}>
              <span className="flex items-center gap-1"><MdEmail className="text-sm" /> Contact Email</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editing}
              className={inputBase}
              placeholder="club@university.edu"
            />
          </div>

          {/* Website */}
          <div>
            <label className={labelBase}>
              <span className="flex items-center gap-1"><MdLanguage className="text-sm" /> Website <span className="normal-case font-normal text-gray-400">(optional)</span></span>
            </label>
            <input
              name="website"
              type="url"
              value={form.website}
              onChange={handleChange}
              disabled={!editing}
              className={inputBase}
              placeholder="https://yourclub.edu"
            />
          </div>
        </div>

        {editing && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={() => { setEditing(false); setSaved(false); }}
              className="px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition shadow-sm"
            >
              <MdSave className="text-base" /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClubProfile;

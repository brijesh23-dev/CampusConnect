import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInterests } from "../../redux/authSlice";
import InterestCard from "../../components/common/student/InterestCard";
import { MdStar, MdCheck, MdInfo } from "react-icons/md";

const interestOptions = [
  "Coding",
  "AI",
  "Web Development",
  "Cyber Security",
  "Sports",
  "Music",
  "Photography",
  "Business",
  "Design",
  "Robotics",
];

function ManageInterests() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Initialize from user's existing interests
  const [selected, setSelected] = useState(
    () => user?.interests?.map((i) => i.charAt(0).toUpperCase() + i.slice(1)) || []
  );
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const toggleInterest = (interest) => {
    setSaved(false);
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSave = async () => {
    if (selected.length === 0) return;
    setSaving(true);
    try {
      await dispatch(updateInterests(selected.map((i) => i.toLowerCase()))).unwrap();
      setSaved(true);
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center text-white shadow-md">
            <MdStar className="text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Manage Interests</h1>
            <p className="text-sm text-gray-400">
              Select what you love — we'll personalise your event feed.
            </p>
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-8">
        <MdInfo className="text-blue-500 text-lg flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 font-medium">
          Choose at least <strong>1 interest</strong> to receive personalised event recommendations and
          notifications from matching clubs.
        </p>
      </div>

      {/* Interest grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {interestOptions.map((interest) => (
          <InterestCard
            key={interest}
            interest={interest}
            selected={selected.includes(interest)}
            onToggle={toggleInterest}
          />
        ))}
      </div>

      {/* Selected count pill */}
      <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
        <p className="text-sm text-gray-500 font-medium">
          <span className="text-gray-900 font-bold">{selected.length}</span> interest
          {selected.length !== 1 ? "s" : ""} selected
        </p>
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1.5 max-w-xs justify-end">
            {selected.map((item) => (
              <span
                key={item}
                className="px-2.5 py-0.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold capitalize"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving || selected.length === 0}
          className={`flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all shadow-sm
            ${selected.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : saved
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90 shadow-violet-200"
            }`}
        >
          {saving ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving…
            </>
          ) : saved ? (
            <>
              <MdCheck className="text-base" />
              Saved!
            </>
          ) : (
            "Save Interests"
          )}
        </button>

        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => { setSelected([]); setSaved(false); }}
            className="text-sm text-gray-400 hover:text-gray-700 font-medium transition"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

export default ManageInterests;
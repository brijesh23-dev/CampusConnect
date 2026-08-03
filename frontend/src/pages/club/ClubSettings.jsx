import { useState } from "react";
import { MdSettings, MdNotifications, MdSecurity, MdSave, MdCheckCircle, MdPalette } from "react-icons/md";

function ClubSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sectionClass = "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6";
  const sectionHeaderClass = "flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50";
  const inputBase = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-white";
  const labelBase = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  const Toggle = ({ label, defaultChecked }) => (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition">{label}</span>
      <div className="relative flex-shrink-0 ml-4">
        <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-10 h-5 rounded-full bg-gray-200 peer-checked:bg-blue-600 transition cursor-pointer" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
      </div>
    </label>
  );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Club Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Configure your club portal preferences and notification settings.
        </p>
      </div>

      {/* Event Defaults */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MdSettings className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Event Defaults</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className={labelBase}>Default Event Capacity</label>
            <input type="number" min={1} defaultValue={100} className={inputBase} placeholder="e.g. 100" />
          </div>
          <div>
            <label className={labelBase}>Default Venue</label>
            <input type="text" defaultValue="" className={inputBase} placeholder="e.g. Main Auditorium" />
          </div>
          <div>
            <label className={labelBase}>Default Event Category</label>
            <select className={inputBase} defaultValue="">
              <option value="">Select…</option>
              {["Technology", "Workshop", "Social", "Academic", "Sports", "Arts", "Music", "Business"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <MdNotifications className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Notifications</h2>
        </div>
        <div className="p-6 space-y-5">
          <Toggle label="Email notification on new registrations" defaultChecked={true} />
          <Toggle label="Notify when event reaches 80% capacity" defaultChecked={true} />
          <Toggle label="Daily digest of registration activity" defaultChecked={false} />
          <Toggle label="Reminder 24 hours before event starts" defaultChecked={true} />
        </div>
      </div>

      {/* Security */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
            <MdSecurity className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Account Security</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className={labelBase}>Current Password</label>
            <input type="password" placeholder="Enter current password" className={inputBase} />
          </div>
          <div>
            <label className={labelBase}>New Password</label>
            <input type="password" placeholder="Min. 8 characters" className={inputBase} />
          </div>
          <div>
            <label className={labelBase}>Confirm New Password</label>
            <input type="password" placeholder="Repeat new password" className={inputBase} />
          </div>
          <Toggle label="Require approval for new registrations" defaultChecked={false} />
        </div>
      </div>

      {/* Privacy */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <MdPalette className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Privacy & Visibility</h2>
        </div>
        <div className="p-6 space-y-5">
          <Toggle label="Show club profile publicly" defaultChecked={true} />
          <Toggle label="Display member count on public profile" defaultChecked={true} />
          <Toggle label="Allow students to follow club for updates" defaultChecked={true} />
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all
            ${saved
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-blue-200"
            }`}
        >
          {saved ? (
            <><MdCheckCircle className="text-base" /> Saved!</>
          ) : (
            <><MdSave className="text-base" /> Save Settings</>
          )}
        </button>
      </div>
    </div>
  );
}

export default ClubSettings;

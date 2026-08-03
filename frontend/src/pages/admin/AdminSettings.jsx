import { useState } from "react";
import { MdSettings, MdSecurity, MdNotifications, MdPalette, MdStorage, MdSave, MdCheckCircle } from "react-icons/md";

function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sectionClass = "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6";
  const sectionHeaderClass = "flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50";
  const inputBase = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition bg-white";
  const labelBase = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Platform Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Configure platform-wide preferences and security policies.
        </p>
      </div>

      {/* General Settings */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MdSettings className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">General</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className={labelBase}>Platform Name</label>
            <input type="text" defaultValue="CampusConnect" className={inputBase} />
          </div>
          <div>
            <label className={labelBase}>Support Email</label>
            <input type="email" defaultValue="support@campusconnect.edu" className={inputBase} />
          </div>
          <div>
            <label className={labelBase}>Institution Name</label>
            <input type="text" defaultValue="University of Campus" className={inputBase} />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <MdSecurity className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Security & Access</h2>
        </div>
        <div className="p-6 space-y-5">
          {[
            { label: "Require email verification for new users", defaultChecked: true },
            { label: "Enable two-factor authentication option", defaultChecked: false },
            { label: "Auto-deactivate inactive accounts after 6 months", defaultChecked: true },
            { label: "Allow public event browsing (without login)", defaultChecked: true },
          ].map((item, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition">{item.label}</span>
              <div className="relative flex-shrink-0 ml-4">
                <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                <div className="w-10 h-5 rounded-full bg-gray-200 peer-checked:bg-red-600 transition cursor-pointer" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <MdNotifications className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Notifications</h2>
        </div>
        <div className="p-6 space-y-5">
          {[
            { label: "Send email notifications for new registrations", defaultChecked: true },
            { label: "Notify admins on new club requests", defaultChecked: true },
            { label: "Send event reminders to registered students", defaultChecked: true },
          ].map((item, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition">{item.label}</span>
              <div className="relative flex-shrink-0 ml-4">
                <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                <div className="w-10 h-5 rounded-full bg-gray-200 peer-checked:bg-red-600 transition cursor-pointer" />
                <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all
            ${saved
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
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

export default AdminSettings;

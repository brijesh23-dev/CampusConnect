import { useState } from "react";
import { useSelector } from "react-redux";
import {
  MdPerson,
  MdLock,
  MdNotifications,
  MdSave,
  MdCheckCircle,
  MdEmail,
  MdVisibility,
  MdVisibilityOff,
  MdErrorOutline,
} from "react-icons/md";

// Toggle component
function Toggle({ label, description, checked, onChange }) {
  return (
    <label className="flex items-start justify-between gap-4 cursor-pointer group py-1">
      <div className="flex-1">
        <span className="text-sm text-gray-800 font-medium group-hover:text-gray-900 transition block">
          {label}
        </span>
        {description && (
          <span className="text-xs text-gray-400 mt-0.5 block">{description}</span>
        )}
      </div>
      <div className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <div className="w-10 h-5 rounded-full bg-gray-200 peer-checked:bg-violet-600 transition cursor-pointer" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow peer-checked:translate-x-5 transition-transform" />
      </div>
    </label>
  );
}

function StudentSettings() {
  const { user } = useSelector((state) => state.auth);

  // Profile state
  const [name, setName] = useState(user?.name || "");
  const [profileSaved, setProfileSaved] = useState(false);

  // Password state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwError, setPwError] = useState(null);
  const [pwSaved, setPwSaved] = useState(false);

  // Notification prefs state
  const [notifPrefs, setNotifPrefs] = useState({
    eventReminders: true,
    newInterestEvents: true,
    registrationConfirms: true,
    cancellationAlerts: true,
  });
  const [notifSaved, setNotifSaved] = useState(false);

  const sectionClass =
    "bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6";
  const sectionHeaderClass =
    "flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50";
  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 transition bg-white";
  const labelBase =
    "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";

  const handleProfileSave = () => {
    // In a real app: dispatch(updateProfile({ name }))
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handlePasswordSave = () => {
    setPwError(null);
    if (!currentPw) return setPwError("Enter your current password.");
    if (newPw.length < 6) return setPwError("New password must be at least 6 characters.");
    if (newPw !== confirmPw) return setPwError("Passwords do not match.");
    // In a real app: dispatch(changePassword({ currentPw, newPw }))
    setPwSaved(true);
    setCurrentPw("");
    setNewPw("");
    setConfirmPw("");
    setTimeout(() => setPwSaved(false), 2500);
  };

  const handleNotifSave = () => {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2500);
  };

  const PasswordInput = ({ id, label, value, onChange, show, onToggle, placeholder }) => (
    <div>
      <label htmlFor={id} className={labelBase}>{label}</label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${inputBase} pr-10`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <MdVisibilityOff className="text-lg" /> : <MdVisibility className="text-lg" />}
        </button>
      </div>
    </div>
  );

  const SaveButton = ({ saved, onClick, label = "Save Changes" }) => (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all ${
        saved
          ? "bg-emerald-500 text-white"
          : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90"
      }`}
    >
      {saved ? (
        <><MdCheckCircle className="text-base" /> Saved!</>
      ) : (
        <><MdSave className="text-base" /> {label}</>
      )}
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your profile, security, and notification preferences.
        </p>
      </div>

      {/* ── Profile Section ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <MdPerson className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Profile Information</h2>
        </div>
        <div className="p-6 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold shadow flex-shrink-0">
              {(name || user?.name || "S")[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{name || user?.name || "Student"}</p>
              <p className="text-xs text-gray-400">{user?.email}</p>
              <p className="text-xs text-gray-300 mt-1 capitalize">
                Role: <span className="font-semibold text-gray-400">{user?.role || "student"}</span>
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="settings-name" className={labelBase}>Full Name</label>
            <input
              id="settings-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setProfileSaved(false); }}
              className={inputBase}
              placeholder="Your full name"
            />
          </div>

          {/* Email — read-only */}
          <div>
            <label className={labelBase}>
              <span className="flex items-center gap-1.5"><MdEmail className="text-sm" /> Email Address</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className={`${inputBase} bg-gray-50 text-gray-400 cursor-not-allowed`}
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed. Contact support if needed.</p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <SaveButton saved={profileSaved} onClick={handleProfileSave} label="Save Profile" />
        </div>
      </div>

      {/* ── Security Section ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
            <MdLock className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Security</h2>
        </div>
        <div className="p-6 space-y-5">
          <PasswordInput
            id="current-pw"
            label="Current Password"
            value={currentPw}
            onChange={(e) => { setCurrentPw(e.target.value); setPwError(null); }}
            show={showCurrent}
            onToggle={() => setShowCurrent((p) => !p)}
            placeholder="Enter current password"
          />
          <PasswordInput
            id="new-pw"
            label="New Password"
            value={newPw}
            onChange={(e) => { setNewPw(e.target.value); setPwError(null); }}
            show={showNew}
            onToggle={() => setShowNew((p) => !p)}
            placeholder="At least 6 characters"
          />
          <div>
            <label htmlFor="confirm-pw" className={labelBase}>Confirm New Password</label>
            <input
              id="confirm-pw"
              type={showNew ? "text" : "password"}
              value={confirmPw}
              onChange={(e) => { setConfirmPw(e.target.value); setPwError(null); }}
              placeholder="Repeat new password"
              className={`${inputBase} ${
                confirmPw && confirmPw !== newPw ? "border-red-300 ring-1 ring-red-200" : ""
              }`}
            />
          </div>

          {pwError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
              <MdErrorOutline className="text-red-500 flex-shrink-0" />
              <p className="text-xs text-red-600 font-medium">{pwError}</p>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <SaveButton saved={pwSaved} onClick={handlePasswordSave} label="Update Password" />
        </div>
      </div>

      {/* ── Notifications Section ── */}
      <div className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <MdNotifications className="text-base" />
          </div>
          <h2 className="text-sm font-bold text-gray-700">Notification Preferences</h2>
        </div>
        <div className="p-6 space-y-4 divide-y divide-gray-50">
          {[
            { key: "eventReminders", label: "Event reminders", description: "24 hours before each registered event" },
            { key: "newInterestEvents", label: "New events in my interests", description: "When a club posts an event matching your interests" },
            { key: "registrationConfirms", label: "Registration confirmations", description: "After successfully RSVPing to an event" },
            { key: "cancellationAlerts", label: "Cancellation alerts", description: "If an event you're attending is cancelled" },
          ].map(({ key, label, description }) => (
            <div key={key} className="pt-4 first:pt-0">
              <Toggle
                label={label}
                description={description}
                checked={notifPrefs[key]}
                onChange={() => {
                  setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
                  setNotifSaved(false);
                }}
              />
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <SaveButton saved={notifSaved} onClick={handleNotifSave} label="Save Preferences" />
        </div>
      </div>
    </div>
  );
}

export default StudentSettings;

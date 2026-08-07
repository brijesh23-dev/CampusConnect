import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd, MdWarning } from "react-icons/md";
import { fetchMyEvents, deleteEvent } from "../../redux/eventSlice";
import EventTable from "../../components/common/club/EventTable";
import { toast } from "react-toastify";

// ── Confirm Dialog ─────────────────────────────────────────────────────────────
function ConfirmDeleteDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-sm w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
            <MdWarning className="text-red-500 text-xl" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Delete Event</p>
            <p className="text-xs text-gray-400 mt-0.5">
              This will permanently remove the event and all its registrations.
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function MyEvents() {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchMyEvents());
  }, [dispatch]);

  const requestDelete = (id) => {
    setPendingDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await dispatch(deleteEvent(pendingDeleteId)).unwrap();
      toast.success("Event deleted successfully.");
    } catch {
      toast.error("Failed to delete event. Please try again.");
    } finally {
      setPendingDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-400 font-medium">Loading your events…</p>
      </div>
    );
  }

  return (
    <>
      <ConfirmDeleteDialog
        open={!!pendingDeleteId}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">My Events</h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Manage and track your club's events.
            </p>
          </div>
          <Link
            to="/clubs/create-event"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition shadow-sm"
          >
            <MdAdd className="text-lg" />
            Create Event
          </Link>
        </div>

        {/* Table or empty state */}
        {events.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">📅</span>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              No Events Yet
            </h2>
            <p className="text-sm text-gray-500 mb-7">
              Get started by creating your first club event.
            </p>
            <Link
              to="/clubs/create-event"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
            >
              <MdAdd className="text-lg" />
              Create First Event
            </Link>
          </div>
        ) : (
          <EventTable events={events} onDelete={requestDelete} />
        )}
      </div>
    </>
  );
}

export default MyEvents;

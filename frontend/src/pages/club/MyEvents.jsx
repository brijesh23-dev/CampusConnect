import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MdAdd,
  MdWarning,
  MdCalendarToday,
  MdRefresh,
} from "react-icons/md";
import { fetchMyEvents, deleteEvent, updateEventStatus } from "../../redux/eventSlice";
import EventTable from "../../components/common/club/EventTable";
import { toast } from "react-hot-toast";

// ── Confirm Dialog ─────────────────────────────────────────────────────────────
function ConfirmDeleteDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-event-title"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-400/10">
            <MdWarning className="text-xl text-red-500" aria-hidden="true" />
          </div>
          <div>
            <p id="delete-event-title" className="text-sm font-bold text-gray-900 dark:text-white">Delete Event</p>
            <p className="mt-0.5 text-xs text-gray-600 dark:text-slate-300">
              This will permanently remove the event and all its registrations.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
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
  const { events, loading, error } = useSelector((state) => state.events);
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

  const handleStatusChange = async (id, status) => {
    try {
      await dispatch(updateEventStatus({ id, status })).unwrap();
      toast.success(`Event marked as ${status}.`);
    } catch {
      toast.error("Failed to update event status.");
    }
  };

  if (loading) {
    return (
      <div
        className="flex h-64 flex-col items-center justify-center gap-4"
        role="status"
        aria-label="Loading your events"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-blue-400 dark:border-t-transparent" />
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
          Loading your events…
        </p>
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

      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                My Events
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                Manage and track your club's events.
              </p>
            </div>
            <Link
              to="/clubs/create-event"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <MdAdd className="text-lg" aria-hidden="true" />
              Create Event
            </Link>
        </header>

        {error ? (
            <div
              role="alert"
              className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200 sm:flex-row sm:items-center sm:justify-between"
            >
              <p>{error}</p>
              <button
                type="button"
                onClick={() => dispatch(fetchMyEvents())}
                className="inline-flex min-h-9 items-center justify-center gap-2 self-start rounded-lg px-3 font-semibold transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 dark:hover:bg-red-900/40 sm:self-auto"
              >
                <MdRefresh aria-hidden="true" />
                Try again
              </button>
            </div>
        ) : events.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-slate-900 sm:p-16">
              <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-300">
                <MdCalendarToday aria-hidden="true" className="text-2xl" />
              </span>
              <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                No events yet
              </h2>
              <p className="mb-7 text-sm text-gray-600 dark:text-slate-300">
                Create your first event to start bringing your campus community
                together.
              </p>
              <Link
                to="/clubs/create-event"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <MdAdd className="text-lg" aria-hidden="true" />
                Create first event
              </Link>
            </div>
        ) : (
            <EventTable
              events={events}
              onDelete={requestDelete}
              onStatusChange={handleStatusChange}
            />
        )}
      </div>
    </>
  );
}

export default MyEvents;

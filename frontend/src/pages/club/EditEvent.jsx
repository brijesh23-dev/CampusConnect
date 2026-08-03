import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { fetchSingleEvent, updateEvent } from "../../redux/eventSlice";
import {
  MdInfo,
  MdDateRange,
  MdLocationOn,
  MdAccessTime,
  MdArrowBack,
  MdSave,
  MdCheckCircle,
} from "react-icons/md";

const CATEGORIES = [
  "Academic",
  "Workshop",
  "Technology",
  "Social",
  "Sports",
  "Music",
  "Business",
  "Arts",
];

function EditEvent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleEvent } = useSelector((state) => state.events);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    dispatch(fetchSingleEvent(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (singleEvent) {
      reset({
        title: singleEvent.title,
        description: singleEvent.description,
        category: singleEvent.category,
        date: singleEvent.date?.slice(0, 10),
        time: singleEvent.time,
        venue: singleEvent.venue,
        maxParticipants: singleEvent.maxParticipants || "",
        tags: singleEvent.tags?.join(", ") || "",
      });
    }
  }, [singleEvent, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateEvent({ id, data })).unwrap();
      setSaveSuccess(true);
      setTimeout(() => navigate("/clubs/events"), 1200);
    } catch (error) {
      console.error(error);
    }
  };

  if (!singleEvent) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const inputBase =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition";
  const labelBase = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5";
  const errorText = "text-xs text-red-500 mt-1 font-medium";

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Back link */}
      <Link
        to="/clubs/events"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 font-medium mb-6 transition"
      >
        <MdArrowBack className="text-base" />
        Back to My Events
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Edit Event</h1>
        <p className="text-sm text-gray-400 mt-1">
          Update event details below. Changes will be reflected immediately.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section: Basic Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <MdInfo className="text-base" />
            </div>
            <h2 className="text-sm font-bold text-gray-700">Basic Information</h2>
          </div>

          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className={labelBase}>Event Title *</label>
              <input
                type="text"
                placeholder="e.g., Annual Tech Hackathon 2026"
                className={`${inputBase} ${errors.title ? "border-red-400 focus:ring-red-400/30 focus:border-red-400" : ""}`}
                {...register("title", { required: "Title is required", minLength: { value: 5, message: "At least 5 characters" } })}
              />
              {errors.title && <p className={errorText}>{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className={labelBase}>Description *</label>
              <textarea
                rows={4}
                placeholder="Describe your event — agenda, goals, who should attend…"
                className={`${inputBase} resize-none ${errors.description ? "border-red-400" : ""}`}
                {...register("description", { required: "Description is required", minLength: { value: 20, message: "At least 20 characters" } })}
              />
              {errors.description && <p className={errorText}>{errors.description.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className={labelBase}>Category *</label>
              <select
                className={`${inputBase} ${errors.category ? "border-red-400" : ""}`}
                {...register("category", { required: "Please select a category" })}
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && <p className={errorText}>{errors.category.message}</p>}
            </div>

            {/* Tags */}
            <div>
              <label className={labelBase}>Tags <span className="normal-case font-normal text-gray-400">(comma-separated, optional)</span></label>
              <input
                type="text"
                placeholder="e.g., tech, coding, hackathon"
                className={inputBase}
                {...register("tags")}
              />
            </div>
          </div>
        </div>

        {/* Section: Date & Location */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <MdDateRange className="text-base" />
            </div>
            <h2 className="text-sm font-bold text-gray-700">Date, Time & Location</h2>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Date */}
            <div>
              <label className={labelBase}>
                <span className="flex items-center gap-1.5">
                  <MdDateRange className="text-sm" /> Date *
                </span>
              </label>
              <input
                type="date"
                className={`${inputBase} ${errors.date ? "border-red-400" : ""}`}
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <p className={errorText}>{errors.date.message}</p>}
            </div>

            {/* Time */}
            <div>
              <label className={labelBase}>
                <span className="flex items-center gap-1.5">
                  <MdAccessTime className="text-sm" /> Time *
                </span>
              </label>
              <input
                type="time"
                className={`${inputBase} ${errors.time ? "border-red-400" : ""}`}
                {...register("time", { required: "Time is required" })}
              />
              {errors.time && <p className={errorText}>{errors.time.message}</p>}
            </div>

            {/* Venue */}
            <div className="sm:col-span-2">
              <label className={labelBase}>
                <span className="flex items-center gap-1.5">
                  <MdLocationOn className="text-sm" /> Venue *
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g., Main Auditorium, Block B"
                className={`${inputBase} ${errors.venue ? "border-red-400" : ""}`}
                {...register("venue", { required: "Venue is required" })}
              />
              {errors.venue && <p className={errorText}>{errors.venue.message}</p>}
            </div>

            {/* Max participants */}
            <div>
              <label className={labelBase}>Max Participants <span className="normal-case font-normal text-gray-400">(optional)</span></label>
              <input
                type="number"
                min={1}
                placeholder="Leave blank for unlimited"
                className={inputBase}
                {...register("maxParticipants", {
                  min: { value: 1, message: "Must be at least 1" },
                  valueAsNumber: true,
                })}
              />
              {errors.maxParticipants && <p className={errorText}>{errors.maxParticipants.message}</p>}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Link
            to="/clubs/events"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isSubmitting || saveSuccess}
            className={`flex items-center gap-2 px-7 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm
              ${saveSuccess
                ? "bg-emerald-500 text-white shadow-emerald-200"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 disabled:opacity-60"
              }`}
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Updating…
              </>
            ) : saveSuccess ? (
              <>
                <MdCheckCircle className="text-base" />
                Updated!
              </>
            ) : (
              <>
                <MdSave className="text-base" />
                Update Event
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
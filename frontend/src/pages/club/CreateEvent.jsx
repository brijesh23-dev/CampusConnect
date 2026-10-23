import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createEvent } from "../../redux/eventSlice";
import {
  MdInfo,
  MdDateRange,
  MdLocationOn,
  MdCloudUpload,
  MdSend,
  MdSave,
  MdAccessTime,
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

function CreateEvent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const imageRegistration = register("image");

  const [imagePreview, setImagePreview] = useState(null);
  const imagePreviewUrl = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (imagePreviewUrl.current) URL.revokeObjectURL(imagePreviewUrl.current);
    };
  }, []);

  const handleImageChange = (event) => {
    if (imagePreviewUrl.current) URL.revokeObjectURL(imagePreviewUrl.current);
    const file = event.target.files?.[0];
    imagePreviewUrl.current = file ? URL.createObjectURL(file) : null;
    setImagePreview(imagePreviewUrl.current);
  };

  const [isDrafting, setIsDrafting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const submitWithStatus = async (data, status) => {
    setSubmitError("");
    try {
      const formData = new FormData();
      const fields = {
        title: data.title,
        description: data.description,
        category: data.category,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        venue: data.venue,
        status,
      };
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (data.image?.[0]) formData.append("image", data.image[0]);
      if (data.maxParticipants)
        formData.append("maxParticipants", data.maxParticipants);
      await dispatch(createEvent(formData)).unwrap();
      reset();
      navigate("/clubs/events");
    } catch (error) {
      const msg =
        typeof error === "string"
          ? error
          : error?.message || "Failed to create event. Please try again.";
      setSubmitError(msg);
    }
  };

  const onSubmit = async (data) => submitWithStatus(data, "published");

  const onSaveDraft = handleSubmit(async (data) => {
    setIsDrafting(true);
    try {
      await submitWithStatus(data, "draft");
    } finally {
      setIsDrafting(false);
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Create New Event
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Fill out the details below to publish your event to the campus
            community.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column – main fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-5">
                  <MdInfo className="text-blue-500 text-xl" />
                  Basic Information
                </h2>

                <div className="mb-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="event-title"
                      className="mb-1.5 block text-sm font-semibold text-gray-700"
                    >
                      Event title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="event-title"
                      type="text"
                      placeholder="e.g. Annual Tech Symposium"
                      aria-invalid={Boolean(errors.title)}
                      aria-describedby={
                        errors.title ? "event-title-error" : undefined
                      }
                      {...register("title", {
                        required: "Title is required",
                        minLength: {
                          value: 3,
                          message: "At least 3 characters",
                        },
                        maxLength: {
                          value: 100,
                          message: "Maximum 100 characters",
                        },
                      })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    {errors.title && (
                      <p
                        id="event-title-error"
                        className="mt-1 text-xs text-red-600"
                      >
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="event-category"
                      className="mb-1.5 block text-sm font-semibold text-gray-700"
                    >
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="event-category"
                      aria-invalid={Boolean(errors.category)}
                      aria-describedby={
                        errors.category ? "event-category-error" : undefined
                      }
                      {...register("category", { required: "Choose a category" })}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p
                        id="event-category-error"
                        className="mt-1 text-xs text-red-600"
                      >
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="event-description"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="event-description"
                    rows={5}
                    placeholder="Describe what attendees can expect..."
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={
                      errors.description ? "event-description-error" : undefined
                    }
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "At least 10 characters",
                      },
                      maxLength: {
                        value: 2000,
                        message: "Maximum 2000 characters",
                      },
                    })}
                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {errors.description && (
                    <p
                      id="event-description-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Date & Location */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 mb-5">
                  <MdDateRange className="text-violet-500 text-xl" />
                  Date & Location
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label
                      htmlFor="event-date"
                      className="mb-1.5 block text-sm font-semibold text-gray-700"
                    >
                      Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MdDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        id="event-date"
                        type="date"
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={
                          errors.date ? "event-date-error" : undefined
                        }
                        {...register("date", { required: "Date is required" })}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                    {errors.date && (
                      <p
                        id="event-date-error"
                        className="mt-1 text-xs text-red-600"
                      >
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="event-start-time"
                      className="mb-1.5 block text-sm font-semibold text-gray-700"
                    >
                      Start time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MdAccessTime className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        id="event-start-time"
                        type="time"
                        aria-invalid={Boolean(errors.startTime)}
                        {...register("startTime", {
                          required: "Start time is required",
                        })}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                    {errors.startTime && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.startTime.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="event-end-time"
                      className="mb-1.5 block text-sm font-semibold text-gray-700"
                    >
                      End time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MdAccessTime className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        id="event-end-time"
                        type="time"
                        aria-invalid={Boolean(errors.endTime)}
                        {...register("endTime", {
                          required: "End time is required",
                          validate: (value, values) =>
                            !values.startTime ||
                            value > values.startTime ||
                            "End time must be after start time",
                        })}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                      />
                    </div>
                    {errors.endTime && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.endTime.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="event-venue"
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    Venue / location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      id="event-venue"
                      type="text"
                      placeholder="Building, Room Number, or Virtual Link"
                      aria-invalid={Boolean(errors.venue)}
                      aria-describedby={errors.venue ? "event-venue-error" : undefined}
                      {...register("venue", {
                        required: "Venue is required",
                        minLength: { value: 2, message: "At least 2 characters" },
                        maxLength: { value: 200, message: "Maximum 200 characters" },
                      })}
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>
                  {errors.venue && (
                    <p
                      id="event-venue-error"
                      className="mt-1 text-xs text-red-600"
                    >
                      {errors.venue.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right column – sidebar */}
            <div className="space-y-5">
              {/* Event Poster */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Event Poster
                </h3>

                <label
                  htmlFor="image"
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition overflow-hidden relative h-72"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <>
                      <MdCloudUpload className="text-4xl text-gray-300 mb-2" />
                      <p className="text-xs font-semibold text-gray-500 text-center">
                        Click to choose an image
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 text-center">
                        JPG, PNG, GIF, or WebP · up to 5 MB
                      </p>
                    </>
                  )}
                </label>

                <input
                  id="image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  className="hidden"
                  {...imageRegistration}
                  onChange={(event) => {
                    imageRegistration.onChange(event);
                    handleImageChange(event);
                  }}
                />
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <label
                  htmlFor="event-capacity"
                  className="mb-1.5 block text-sm font-bold text-gray-900"
                >
                  Attendee limit{" "}
                  <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="event-capacity"
                  type="number"
                  min="1"
                  max="10000"
                  placeholder="No limit"
                  aria-invalid={Boolean(errors.maxParticipants)}
                  aria-describedby={
                    errors.maxParticipants ? "event-capacity-error" : undefined
                  }
                  {...register("maxParticipants", {
                    min: { value: 1, message: "At least 1 attendee" },
                    max: { value: 10000, message: "Maximum 10,000 attendees" },
                    setValueAs: (value) =>
                      value === "" ? undefined : Number(value),
                  })}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                {errors.maxParticipants && (
                  <p
                    id="event-capacity-error"
                    className="mt-1 text-xs text-red-600"
                  >
                    {errors.maxParticipants.message}
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Leave blank for unlimited attendance.
                </p>
              </div>
            </div>
          </div>

          {/* Error message */}
          {submitError && (
            <div className="mt-6 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
              <span className="text-base">⚠️</span>
              {submitError}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-end gap-3 mt-4 pb-8">
            <Link
              to="/clubs/events"
              className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isDrafting || isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-amber-300 bg-amber-50 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition disabled:opacity-60"
            >
              <MdSave className="text-lg" />
              {isDrafting ? "Saving Draft…" : "Save as Draft"}
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isDrafting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition shadow-md disabled:opacity-60"
            >
              <MdSend className="text-lg" />
              {isSubmitting ? "Submitting…" : "Publish Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState} from "react";
import { createEvent } from "../../redux/eventSlice";
import {
  MdInfo,
  MdDateRange,
  MdLocationOn,
  MdCloudUpload,
  MdClose,
  MdSend,
  MdSave,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListBulleted,
  MdLink,
} from "react-icons/md";
import { MdAccessTime } from "react-icons/md";

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
    watch,
    formState: { errors, isSubmitting },
  } = useForm(
  );
  const image = watch("image");
const imagePreview = image?.[0]
  ? URL.createObjectURL(image[0])
  : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(["Academic", "Workshop"]);
  const [catInput, setCatInput] = useState("");
  const [requireRSVP, setRequireRSVP] = useState(true);

  const removeCategory = (cat) =>
    setCategories((prev) => prev.filter((c) => c !== cat));

  const addCategory = (cat) => {
    if (cat && !categories.includes(cat)) {
      setCategories((prev) => [...prev, cat]);
    }
    setCatInput("");
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", categories[0] || data.category);
      formData.append("date", data.date);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      formData.append("venue", data.venue);
      if (data.image?.[0]) formData.append("image", data.image[0]);
      formData.append("requireRSVP", requireRSVP);
      formData.append("attendeeLimit", data.attendeeLimit || "");

      await dispatch(createEvent(formData)).unwrap();
      reset();
      navigate("/clubs/events");
    } catch (error) {
      console.log("create event", error);
    }
  };

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

                {/* Title */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Annual Tech Symposium 2024"
                    {...register("title", { required: "Title is required" })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition ${
                      errors.title
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Description rich text area */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Description
                  </label>
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 border border-b-0 border-gray-200 rounded-t-xl px-3 py-2 bg-gray-50">
                    {[
                      { icon: <MdFormatBold />, label: "Bold" },
                      { icon: <MdFormatItalic />, label: "Italic" },
                      { icon: <MdFormatUnderlined />, label: "Underline" },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        type="button"
                        title={btn.label}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition text-lg"
                      >
                        {btn.icon}
                      </button>
                    ))}
                    <div className="w-px h-5 bg-gray-200 mx-1" />
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 text-lg"
                    >
                      <MdFormatListBulleted />
                    </button>
                    <button
                      type="button"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-200 text-lg"
                    >
                      <MdLink />
                    </button>
                  </div>
                  <textarea
                    rows={5}
                    placeholder="Describe what attendees can expect..."
                    {...register("description")}
                    className="w-full border border-gray-200 rounded-b-xl px-4 py-3 text-sm outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                  />
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
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Date
                    </label>
                    <div className="relative">
                      <MdDateRange className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        type="date"
                        {...register("date", { required: "Date is required" })}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Start Time
                    </label>
                    <div className="relative">
                      <MdAccessTime className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        type="time"
                        {...register("startTime")}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      End Time
                    </label>
                    <div className="relative">
                      <MdAccessTime className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                      <input
                        type="time"
                        {...register("endTime")}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Venue / Location
                  </label>
                  <div className="relative">
                    <MdLocationOn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Building, Room Number, or Virtual Link"
                      {...register("venue", { required: "Venue is required" })}
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                    />
                  </div>
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
                        Click to upload or drag and drop
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 text-center">
                        SVG, PNG, JPG or GIF (Max. 5MB)
                      </p>
                      <p className="text-[10px] text-gray-300 mt-1 text-center">
                        Recommended aspect ratio 16:9
                      </p>
                    </>
                  )}
                </label>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register("image")}
                />
              </div>

              {/* Categories */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {categories.map((cat) => (
                    <span
                      key={cat}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => removeCategory(cat)}
                        className="hover:text-blue-900"
                      >
                        <MdClose className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
                  <input
                    type="text"
                    placeholder="Search or add categories..."
                    value={catInput}
                    onChange={(e) => setCatInput(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addCategory(catInput))
                    }
                    className="flex-1 text-xs outline-none placeholder:text-gray-400"
                    list="category-suggestions"
                  />
                  <datalist id="category-suggestions">
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  <button
                    type="button"
                    onClick={() => addCategory(catInput)}
                    className="text-blue-600 text-lg font-bold leading-none"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Registration */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Registration
                </h3>

                <label className="flex items-center gap-3 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireRSVP}
                    onChange={(e) => setRequireRSVP(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Require RSVP
                  </span>
                </label>

                {requireRSVP && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Attendee Limit
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        placeholder="e.g. 50"
                        {...register("attendeeLimit")}
                        className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                      />
                      <span className="text-xs text-gray-400">
                        Leave blank for unlimited
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 mt-8 pb-8">
            <Link
              to="/club"
              className="px-6 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              <MdSave className="text-lg" />
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold hover:opacity-90 transition shadow-md disabled:opacity-60"
            >
              <MdSend className="text-lg" />
              {isSubmitting ? "Submitting..." : "Submit Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;

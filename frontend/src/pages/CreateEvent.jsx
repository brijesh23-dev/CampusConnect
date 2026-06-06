import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createEvent } from "../redux/eventSlice";

function CreateEvent() {
  const { register, handleSubmit, reset } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {

    try{
           const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("venue", data.venue);
    formData.append("image", data.image[0]);
      await dispatch(createEvent(formData)).unwrap();

      alert("Event created successfully");

      reset();

      navigate("/my-events");
    } catch (error) {
      console.log("create event",error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold mb-8">Create Event</h1>

        <form onSubmit={handleSubmit(onSubmit)}   className="space-y-6 ">
          {/* Title */}

          <div>
            <label className="block mb-2 font-medium">Event Title</label>

            <input
              type="text"
              placeholder="Enter event title"
              {...register("title", {
                required: true,
              })}
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-medium">Description</label>

            <textarea
              rows="5"
              placeholder="Write event details..."
              {...register("description", {
                required: true,
              })}
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}

          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              {...register("category", {
                required: true,
              })}
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>

              <option value="technology">Technology</option>

              <option value="coding">Coding</option>

              <option value="ai">AI</option>

              <option value="sports">Sports</option>

              <option value="music">Music</option>

              <option value="business">Business</option>

              <option value="dance">Dance</option>
            </select>
          </div>

          {/* Date + Time */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Date</label>

              <input
                type="date"
                {...register("date", {
                  required: true,
                })}
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Time</label>

              <input
                type="time"
                {...register("time", {
                  required: true,
                })}
                className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Venue */}

          <div>
            <label className="block mb-2 font-medium">Venue</label>

            <input
              type="text"
              placeholder="Enter venue"
              {...register("venue", {
                required: true,
              })}
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              placeholder="upload image"
              {...register("image", {
                required: true,
              })}
              className="w-full border border-gray-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;

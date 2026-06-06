import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import { fetchSingleEvent } from "../redux/eventSlice";

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleEvent, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchSingleEvent(id));
  }, [dispatch, id]);

  if (loading || !singleEvent) {
    return <h1 className="text-center mt-20">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div>
        {event.image ? (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        ) : (
          <h1> no image is available</h1>
        )}
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {singleEvent.category}
        </span>

        <h1 className="text-4xl font-bold mt-4 mb-4">{singleEvent.title}</h1>

        <p className="text-gray-600 mb-6">{singleEvent.description}</p>

        <div className="space-y-3 text-gray-700">
          <div clsassName="flex items-center flex-row gap-2">
            <CalendarTodayOutlinedIcon className="inline-block mr-2" />
            <span> {new Date(singleEvent.date).toLocaleDateString()}</span>
          </div>
          <div clsassName="flex items-center flex-row gap-2">
            <QueryBuilderOutlinedIcon className="inline-block mr-2" />
            <span> {singleEvent.time}</span>
          </div>
          <div clsassName="flex items-center flex-row gap-2">
            <FmdGoodOutlinedIcon className="inline-block mr-2" />
            <span> {singleEvent.venue}</span>
          </div>
          <div clsassName="flex items-center flex-row gap-2">
            <GroupsOutlinedIcon className="inline-block mr-2" />
            <span>{singleEvent.club?.name || "Club"}</span>
          </div>
        </div>

        <Link
          to="/events"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}

export default EventDetails;

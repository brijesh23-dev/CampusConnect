import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { fetchSingleEvent } from "../redux/eventSlice";
import {
  registerForEvent,
  fetchMyregistration,
} from "../redux/RegistrationSlice";

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { singleEvent, eventLoading } = useSelector((state) => state.events);
  console.log(singleEvent);

  const { loading, success, registrations } = useSelector(
    (state) => state.registrations,
  );

  const isRegistered = registrations?.some(
    (registration) => registration.event === id,
  );
  console.log(isRegistered)
  useEffect(() => {
    dispatch(fetchSingleEvent(id));
    dispatch(fetchMyregistration());
    console.log(id);
  }, [dispatch, id]);

  const handleRegister = async () => {
    try {
      await dispatch(registerForEvent(id)).unwrap();
      alert("registered successfuly");
    } catch (error) {
      console.log(error);
    }

    if (eventLoading || !singleEvent) {
      return <h1 className="text-center mt-20">Loading...</h1>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="h-96">
        {singleEvent?.image && (
          <img
            src={singleEvent?.image}
            alt={singleEvent?.title}
            className="w-full h-full object-cover rounded-lg mb-4"
          />
        )}
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {singleEvent?.category}
        </span>

        <h1 className="text-4xl font-bold mt-4 mb-4">{singleEvent?.title}</h1>

        <p className="text-gray-600 mb-6">{singleEvent?.description}</p>

        <div className="space-y-3 text-gray-700">
          <div clsassName="flex items-center flex-row gap-2">
            <CalendarTodayOutlinedIcon className="inline-block mr-2" />
            <span> {new Date(singleEvent?.date).toLocaleDateString()}</span>
          </div>
          <div clsassName="flex items-center flex-row gap-2">
            <QueryBuilderOutlinedIcon className="inline-block mr-2" />
            <span> {singleEvent?.time}</span>
          </div>
          <div clsassName="flex items-center flex-row gap-2">
            <FmdGoodOutlinedIcon className="inline-block mr-2" />
            <span> {singleEvent?.venue}</span>
          </div>
          <div clsassName="flex items-center flex-row gap-2">
            <GroupsOutlinedIcon className="inline-block mr-2" />
            <span>{singleEvent?.club?.name || "Club"}</span>
          </div>
        </div>

        <Link
          to="/events"
          className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Back to Events
        </Link>
        {/* <button
          onClick={handleRegister}
          disabled={loading}
          className="ml-4 px-3 py-2 text-white text-center rounded-lg bg-blue-600"
        >
          {loading
            ? "Registering..."
            : success
              ? "registered"
              : "Register Event"}
        </button> */}
        {isRegistered ? (
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-3 rounded-xl"
          >
            Already Registered
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="bg-green-600 text-white px-6 py-3 rounded-xl"
          >
            Register Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetails;

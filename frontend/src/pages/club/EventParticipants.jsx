import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants } from "../../redux/eventSlice";
import ParticipantsTable from "../../components/common/club/ParticipantsTable";
import { MdArrowBack, MdGroups } from "react-icons/md";

function EventParticipants() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { participants, eventLoading, singleEvent } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(fetchParticipants(id));
  }, [dispatch, id]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Back link */}
      <Link
        to="/clubs/events"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 font-medium mb-6 transition"
      >
        <MdArrowBack className="text-base" />
        Back to My Events
      </Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white shadow-md">
          <MdGroups className="text-2xl" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Event Participants</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            All confirmed registrations for this event.
          </p>
        </div>
      </div>

      {eventLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ParticipantsTable
          participants={participants || []}
          eventTitle={singleEvent?.title}
        />
      )}
    </div>
  );
}

export default EventParticipants;
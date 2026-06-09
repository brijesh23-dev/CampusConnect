import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchParticipants } from "../redux/eventSlice";

function EventParticipants() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { participants } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    dispatch(fetchParticipants(id));
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">
          Event Participants
        </h1>

        {participants.length === 0 ? (
          <p>No participants yet.</p>
        ) : (
          participants.map((student) => (
            <div
              key={student._id}
              className="border rounded-xl p-4 mb-3"
            >
              <h3 className="font-semibold">
                {student.name}
              </h3>

              <p className="text-gray-600">
                {student.email}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventParticipants;
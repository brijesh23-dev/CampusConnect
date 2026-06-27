import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipants } from "../../redux/RegistrationSlice";

function Participants() {
  const { eventId } = useParams();

  const dispatch = useDispatch();

  const { participants } = useSelector((state) => state.registrations);
  console.log(participants)

  useEffect(() => {
    dispatch(fetchParticipants(eventId));
  }, [dispatch, eventId]);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Participants</h1>

      {participants?.map((p) => (
        <div key={p._id} className="bg-white shadow rounded-xl p-4 mb-4">
          <h2>{p.student.name}</h2>

          <p>{p.student.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Participants;

import { useSelector ,useDispatch} from "react-redux";
import {} from '../../redux/RegistrationSlice'
import { useEffect } from "react";
import { fetchMyregistration } from "../../redux/RegistrationSlice";

function MyRegistrations() {
  const dispatch = useDispatch();
  const { registrations } = useSelector((state) => state.registrations);

  useEffect(()=>{
    dispatch(fetchMyregistration())
  },[dispatch])
  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Registered Events</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {registrations.map((reg) => (
          
          <div key={reg._id} className="bg-white rounded-xl shadow p-5">
            <h2 className="text-xl font-semibold">{reg.event.title}</h2>
            <p className="text-gray-600 mt-2">{reg.event.description}</p>

            <p className="mt-3">📍 {reg.event.venue}</p>

            <p>📅 {new Date(reg.event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyRegistrations;

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateInterests } from "../../redux/authSlice";

const interestOptions = [
  "Coding",
  "AI",
  "Web Development",
  "Cyber Security",
  "Sports",
  "Music",
  "Photography",
  "Business",
  "Design",
  "Robotics",
];

function ManageInterests() {
    
  const dispatch = useDispatch();
  const { register, handleSubmit,reset } = useForm({
    defaultValues: {
      interests: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data.interests.toString())
    if(data.interests.length<=0){
        return alert("choose atleast one of above interests")
    }
    dispatch(updateInterests(data.interests));
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-2">
          Manage Interests
        </h1>

        <p className="text-gray-600 mb-8">
          Select interests to receive event recommendations and notifications.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interestOptions.map((interest) => (
              <label
                key={interest}
                className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-blue-500 transition"
              >
                <input
                  type="checkbox"
                  value={interest.toLowerCase()}
                  {...register("interests")}
                  className="w-4 h-4"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Save Interests
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManageInterests;
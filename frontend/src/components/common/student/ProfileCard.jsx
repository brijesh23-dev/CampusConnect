import { Link } from "react-router-dom";
import { MdEdit, MdEmail, MdPerson, MdCheckCircle } from "react-icons/md";
import { Card } from "@/components/ui/card";
function ProfileCard({ user }) {
  const name = user?.name || "Student User";
  const email = user?.email || "student@university.edu";
  const interests = user?.interests || [];

  return (
    <Card className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center text-center"  >
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-3xl font-bold shadow-md mb-4 border-2 border-white ring-4 ring-blue-50">
        {name[0]?.toUpperCase() || "S"}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase mb-4 outline ">
        <MdPerson className="text-xs" />
        Student
      </p>

      {/* Info details */}
      <div className="w-full space-y-3 mb-6 text-left border-t border-gray-100 pt-5">
        <div className="flex items-center gap-2.5 text-sm text-gray-500">
          <MdEmail className="text-lg text-gray-400 flex-shrink-0" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-gray-500">
          <MdCheckCircle className="text-lg text-gray-400 flex-shrink-0" />
          <span>Status: Active Account</span>
        </div>
      </div>

      {/* Interests list */}
      <div className="w-full text-left border-t border-gray-100 pt-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Interests ({interests.length})
          </h4>
          <Link
            to="/manage-interests"
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5 outline rounded-lg px-2 py-1"
          >
            <MdEdit /> Edit
          </Link>
        </div>

        {interests.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No interests selected yet.</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {interests.map((item) => (
              <span
                key={item}
                className="px-2.5 py-0.8 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-medium capitalize"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

export default ProfileCard;

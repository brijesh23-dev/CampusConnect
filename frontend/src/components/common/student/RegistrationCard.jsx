import { Link } from "react-router-dom";
import { MdCalendarToday, MdLocationOn, MdCategory } from "react-icons/md";
import { Button } from "@/components/ui/button"
import {Card} from "@/components/ui/card"

function RegistrationCard({ registration, onCancel }) {
  const event = registration?.event || {};
  const dateStr = event.date
    ? new Date(event.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "TBA";

  return (
    <Card>
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold uppercase tracking-wide">
              <MdCategory className="text-xs" />
              {event.category || "General"}
            </span>
            <h3 className="text-lg font-bold text-gray-900 mt-2 leading-snug">
              {event.title || "Untitled Event"}
            </h3>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 bg-green-50 rounded-full px-3 py-1 text-xs font-semibold text-green-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Confirmed
            </span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-5 line-clamp-2">
          {event.description || "No description provided."}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MdCalendarToday className="text-base text-gray-400" />
            <span>{dateStr} {event.time && `• ${event.time}`}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-base text-gray-400" />
            <span className="truncate">{event.venue || "TBA"}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
        <Link
          to={`/events/${event._id}`}
          className="flex-1 text-center py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
        >
          View Details
        </Link>
        {onCancel && (
          <Button
            onClick={() => onCancel(registration._id)}
           
          >
            Cancel RSVP
          </Button>
        )}
      </div>
    </Card>
  );
}

export default RegistrationCard;

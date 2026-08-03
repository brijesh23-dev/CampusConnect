import {
  MdCode,
  MdSmartToy,
  MdLanguage,
  MdSecurity,
  MdSportsBasketball,
  MdMusicNote,
  MdCameraAlt,
  MdTrendingUp,
  MdBrush,
  MdPrecisionManufacturing,
} from "react-icons/md";

const iconMap = {
  coding:           { icon: <MdCode />,                     gradient: "from-blue-500 to-indigo-600",   bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700"   },
  ai:               { icon: <MdSmartToy />,                  gradient: "from-violet-500 to-purple-600",  bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700" },
  "web development":{ icon: <MdLanguage />,                  gradient: "from-cyan-500 to-blue-500",      bg: "bg-cyan-50",   border: "border-cyan-200",   text: "text-cyan-700"   },
  "cyber security": { icon: <MdSecurity />,                  gradient: "from-red-500 to-rose-600",       bg: "bg-red-50",    border: "border-red-200",    text: "text-red-700"    },
  sports:           { icon: <MdSportsBasketball />,           gradient: "from-orange-500 to-amber-600",   bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
  music:            { icon: <MdMusicNote />,                  gradient: "from-pink-500 to-rose-500",      bg: "bg-pink-50",   border: "border-pink-200",   text: "text-pink-700"   },
  photography:      { icon: <MdCameraAlt />,                  gradient: "from-amber-500 to-yellow-600",   bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700"  },
  business:         { icon: <MdTrendingUp />,                 gradient: "from-emerald-500 to-green-600",  bg: "bg-emerald-50",border: "border-emerald-200",text: "text-emerald-700"},
  design:           { icon: <MdBrush />,                      gradient: "from-fuchsia-500 to-pink-600",   bg: "bg-fuchsia-50",border: "border-fuchsia-200",text: "text-fuchsia-700"},
  robotics:         { icon: <MdPrecisionManufacturing />,     gradient: "from-slate-600 to-gray-700",     bg: "bg-slate-50",  border: "border-slate-200",  text: "text-slate-700"  },
};

const defaultStyle = {
  icon: <MdCode />,
  gradient: "from-gray-400 to-gray-500",
  bg: "bg-gray-50",
  border: "border-gray-200",
  text: "text-gray-700",
};

function InterestCard({ interest, selected, onToggle }) {
  const key = interest.toLowerCase();
  const style = iconMap[key] || defaultStyle;

  return (
    <button
      type="button"
      onClick={() => onToggle(interest)}
      className={`relative group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 w-full text-center focus:outline-none
        ${
          selected
            ? `${style.bg} ${style.border} shadow-md scale-[1.02]`
            : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
        }
      `}
    >
      {/* Checkmark badge */}
      {selected && (
        <span
          className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gradient-to-br ${style.gradient} flex items-center justify-center`}
        >
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}

      {/* Icon bubble */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-200
          ${selected
            ? `bg-gradient-to-br ${style.gradient} text-white shadow-lg`
            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
          }`}
      >
        {style.icon}
      </div>

      {/* Label */}
      <span
        className={`text-sm font-semibold capitalize transition-colors duration-200 leading-tight
          ${selected ? style.text : "text-gray-600 group-hover:text-gray-900"}`}
      >
        {interest}
      </span>
    </button>
  );
}

export default InterestCard;

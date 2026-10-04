import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} theme`}
      className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xl text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
    >
      {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
}

export default ThemeToggle;
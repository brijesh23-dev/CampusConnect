
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSocket from "./hooks/useSocket";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const App = () => {
  // Manages Socket.IO lifecycle — connects when logged in, disconnects on logout
  useSocket();

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("campus-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("campus-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="fixed right-5 top-5 z-50 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-900"
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>

      <AppRoutes />
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        transition={Bounce}
      />
    </>
  );
};

export default App;


import AppRoutes from "./routes/AppRoutes";
import {Toaster} from "react-hot-toast";
import useSocket from "./hooks/useSocket";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

const AppContent = () => {
  // Manages Socket.IO lifecycle — connects when logged in, disconnects on logout
  useSocket();
  const { theme } = useTheme();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: theme === "dark" ? "#1f2937" : "#f3f4f6",
            color: theme === "dark" ? "#f3f4f6" : "#1f2937",
          },
        }}
      />
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;


import AppRoutes from "./routes/AppRoutes";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSocket from "./hooks/useSocket";

const App = () => {
  // Manages Socket.IO lifecycle — connects when logged in, disconnects on logout
  useSocket();

  return (
    <>
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
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;

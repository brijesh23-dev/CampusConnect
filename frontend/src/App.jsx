
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer,Bounce } from "react-toastify";
import { cn } from "@/lib/utils";
const App = () => {
  console.log(cn("p-2", "p-4"));
  return (
    <>
      <AppRoutes />
      <ToastContainer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
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

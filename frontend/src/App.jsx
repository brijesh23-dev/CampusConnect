import React from "react";
import AppRoutes from "./routes/appRoutes";
import { ToastContainer,Bounce } from "react-toastify";
const App = () => {
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

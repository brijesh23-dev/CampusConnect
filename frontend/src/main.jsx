import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
//import chakraProvider from "./Provider.jsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider value={defaultSystem}>
        <App/>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>,
);

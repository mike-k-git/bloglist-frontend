import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./index.css";

import { store } from "./store";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { DefaultProvider } from "./contexts/default";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DefaultProvider>
    <App />
  </DefaultProvider>
);

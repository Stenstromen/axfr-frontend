import React, { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DefaultProvider } from "./contexts/default";

test("Render App.js", () => {
  render(
    <DefaultProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DefaultProvider>
  );
});

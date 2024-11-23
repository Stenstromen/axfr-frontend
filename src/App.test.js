import React, { render } from "@testing-library/react";
import App from "./App";
import { DefaultProvider } from "./contexts/default";

test("Render App.js", () => {
  render(
    <DefaultProvider>
      <App />
    </DefaultProvider>
  );
});

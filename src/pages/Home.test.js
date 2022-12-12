import React, { render, screen } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
import { DefaultProvider } from "../contexts/default";

test("Render Home", () => {
  render(
    <DefaultProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </DefaultProvider>
  );

  
  expect(screen.getByRole("navigation")).toHaveTextContent(/Home/);
  expect(screen.getByRole("heading")).toHaveTextContent(/New \.SE\/.NU Domains/);
  expect(screen.getByRole("list")).toBeInTheDocument();
});

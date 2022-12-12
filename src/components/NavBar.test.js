import React, { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { DefaultProvider } from "../contexts/default";

test("Render Navbar", () => {
  render(
    <DefaultProvider>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </DefaultProvider>
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

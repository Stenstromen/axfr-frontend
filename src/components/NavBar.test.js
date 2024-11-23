import React, { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DefaultProvider } from "../contexts/default";

test("Render Navbar", () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <NavBar />,
    },
  ]);

  render(
    <DefaultProvider>
      <RouterProvider router={router} />
    </DefaultProvider>
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});

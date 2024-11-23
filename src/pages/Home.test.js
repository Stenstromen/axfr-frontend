import React, { render, screen } from "@testing-library/react";
import Home from "./Home";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { DefaultProvider } from "../contexts/default";

test("Render Home", () => {
  const router = createMemoryRouter([
    {
      path: "/",
      element: <Home tlds={["se", "nu", "ch", "li", "ee", "sk"]} />,
    },
  ]);

  render(
    <DefaultProvider>
      <RouterProvider router={router} />
    </DefaultProvider>
  );

  expect(screen.getByRole("heading")).toHaveTextContent(/New \.SE\/.NU Domains/);
  expect(screen.getByRole("list")).toBeInTheDocument();
});

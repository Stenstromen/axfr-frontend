import React, { useEffect, lazy, Suspense } from "react";
import { useDefaultProvider } from "./contexts/default";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import setBodyColor from "./setBodyColor";

const Home = lazy(() => import("./pages/Home"));
const Stats = lazy(() => import("./pages/Stats"));
const Search = lazy(() => import("./pages/Search"));
const Dates = lazy(() => import("./pages/Dates"));
const Domains = lazy(() => import("./pages/Domains"));
const FirstAppearance = lazy(() => import("./pages/FirstAppearance"));

function Root() {
  return (
    <>
      <NavBar />
      <main className="app-main">
        <Suspense
          fallback={
            <div className="centered-flex" style={{ minHeight: 240 }}>
              <div className="spinner-border" role="status" aria-label="Loading" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home tlds={["se", "nu", "ch", "li", "ee", "sk"]} />,
      },
      {
        path: "se",
        element: <Dates tld="se" />,
      },
      {
        path: "se/:param",
        element: <Domains tld="se" />,
      },
      {
        path: "nu",
        element: <Dates tld="nu" />,
      },
      {
        path: "nu/:param",
        element: <Domains tld="nu" />,
      },
      {
        path: "search",
        element: <Search tlds={["se", "nu", "ch", "li", "ee", "sk"]} />,
      },
      {
        path: "stats",
        element: <Stats />,
      },
      {
        path: "first-appearance",
        element: <FirstAppearance />,
      },
    ],
  },
]);

function App() {
  const { setIsMobile, darkmode } = useDefaultProvider();

  setBodyColor({ theme: darkmode ? "light" : "dark" });

  function handleResize() {
    window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  handleResize();
  return <RouterProvider router={router} />;
}

export default App;

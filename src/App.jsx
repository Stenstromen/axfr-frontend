import React, { useEffect, lazy } from "react";
import { useDefaultProvider } from "./contexts/default";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import setBodyColor from "./setBodyColor";

const Home = lazy(() => import('./pages/Home'));
const Stats = lazy(() => import('./pages/Stats'));
const Search = lazy(() => import('./pages/Search'));
const Dates = lazy(() => import('./pages/Dates'));
const Domains = lazy(() => import('./pages/Domains'));
const FirstAppearance = lazy(() => import('./pages/FirstAppearance'));

function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
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
  const { setIsMobile, darkmode, setDarkmode } = useDefaultProvider();

  darkmode
    ? setBodyColor({ color: "lightblack" })
    : setBodyColor({ color: "#252525" });

  function handleResize() {
    window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkmode(!darkmode);
    }
  }, []);

  handleResize();
  return <RouterProvider router={router} />;
}

export default App;

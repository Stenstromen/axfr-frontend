import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const DefaultContext = createContext();

function getInitialLightMode() {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return !window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function DefaultProvider({ children }) {
  const [darkmode, setDarkmode] = useState(getInitialLightMode);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <DefaultContext.Provider
      value={{ darkmode, setDarkmode, isMobile, setIsMobile }}
    >
      {children}
    </DefaultContext.Provider>
  );
}

export function useDefaultProvider() {
  const context = useContext(DefaultContext);

  if (!context) {
    throw new Error("useDefaultProvider is outside of defaultProvider");
  }

  return context;
}

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

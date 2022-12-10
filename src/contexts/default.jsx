import React, { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types'

// Create context
export const DefaultContext = createContext();

// Export provider
export function DefaultProvider({ children }) {
  const [darkmode, setDarkmode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  return (
    <DefaultContext.Provider value={{ darkmode, setDarkmode, isMobile, setIsMobile }}>
      {children}
    </DefaultContext.Provider>
  );
}

// useContext-hook
export function useDefaultProvider() {
  const context = useContext(DefaultContext);

  if (!context) {
    throw new Error("useDefaultProvider is outside of defaultProvider");
  }

  return context;
}

DefaultProvider.propTypes = {
  children: PropTypes.node.isRequired
}
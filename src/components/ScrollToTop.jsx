import React from "react";
import PropTypes from "prop-types";
import { HiArrowUp } from "react-icons/hi2";

function ScrollToTop({ isVisible, onClick }) {
  if (!isVisible) return null;

  return (
    <div
      onClick={onClick}
      className="scroll-to-top"
      data-testid="scroll-to-top-button"
      role="button"
      aria-label="Scroll to top"
    >
      <HiArrowUp size={22} />
    </div>
  );
}

ScrollToTop.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ScrollToTop;

import React from "react";
import PropTypes from "prop-types";
import { TbSquareArrowUpFilled } from "react-icons/tb";

function ScrollToTop({ isVisible, onClick }) {
  if (!isVisible) return null;
  
  return (
    <div
      onClick={onClick}
      className="scroll-to-top"
    >
      <TbSquareArrowUpFilled size={55} color="#0d6efd" />
    </div>
  );
}

ScrollToTop.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ScrollToTop; 
import React from "react";

const Spinner = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <svg
        width="234px"
        height="234px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="19"
          stroke-width="3"
          stroke="rgb(0 0 0 / 0.5)"
          stroke-dasharray="29.845130209103033 29.845130209103033"
          fill="none"
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.5873015873015872s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
        <circle
          cx="50"
          cy="50"
          r="15"
          stroke-width="3"
          stroke="#bcbcbc"
          stroke-dasharray="23.561944901923447 23.561944901923447"
          stroke-dashoffset="23.561944901923447"
          fill="none"
          stroke-linecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1.5873015873015872s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 50;-360 50 50"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default Spinner;

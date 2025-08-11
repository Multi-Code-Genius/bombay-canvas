import React from "react";

const ButtonIcon = ({ color = "#fff" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.667 10H3.334M11.95 14.717c0-2.425 2.136-4.717 4.717-4.717M11.95 5.283c0 2.425 2.136 4.717 4.717 4.717"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default ButtonIcon;

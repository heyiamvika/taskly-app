import React from "react";
import { Link } from "react-router-dom";

import "./OvalYellowButton.css";

type Props = {
  text: string;
  disabled: boolean;
  to?: string;
  type?: "button" | "submit";
  // TO_DO: remove any everywhere and pass correct types
  onClick?: any;
};

export function OvalYellowButton({
  text,
  disabled,
  to,
  type = "button",
  onClick,
}: Props) {
  if (to) {
    return (
      <Link to={to}>
        <button type={type} className="oval-yellow-btn" disabled={disabled}>
          {text}
        </button>
      </Link>
    );
  }

  if (type === "submit") {
    return (
      <button type={type} className="oval-yellow-btn" disabled={disabled}>
        {text}
      </button>
    );
  }

  return (
    <button
      type={type}
      className="oval-yellow-btn"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

import React from "react";

import "./EventActionsBox.css";

type Props = {};

export function EventActionsBox(props: Props) {
  return (
    <div className="event-actions-box">
      <button>
        <span role="img" aria-label="pin">
          📌
        </span>
        <span>Pin event</span>
      </button>
      <button>
        <span role="img" aria-label="pin">
          🗑
        </span>
        <span>Delete</span>
      </button>
    </div>
  );
}

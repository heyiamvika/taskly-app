import React from "react";

import "./EventActionsBox.css";

type Props = {
  isVisible: boolean;
  onPinActionClick: () => void;
  onDeleteActionClick: () => void;
};

export function EventActionsBox({
  isVisible,
  onPinActionClick,
  onDeleteActionClick,
}: Props) {
  function onPinEventClick() {
    console.log("pin event");
    onPinActionClick();
  }

  function onDeleteEventClick() {
    console.log("delete event");
    onDeleteActionClick();
  }

  function getActionsBoxClass(): string {
    return `event-actions-box ${
      isVisible ? "actions-box-visible" : "actions-box-hidden"
    }`;
  }

  return (
    <div className={getActionsBoxClass()}>
      <button onClick={onPinEventClick}>
        <span role="img" aria-label="pin">
          📌
        </span>
        <span>Pin event</span>
      </button>
      <button onClick={onDeleteEventClick}>
        <span role="img" aria-label="pin">
          🗑
        </span>
        <span>Delete</span>
      </button>
    </div>
  );
}

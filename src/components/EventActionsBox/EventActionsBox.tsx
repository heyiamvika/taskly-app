import React from "react";

import "./EventActionsBox.css";

type Props = {
  isVisible: boolean;
  onActionClick: () => void;
};

export function EventActionsBox({ isVisible, onActionClick }: Props) {
  function onPinEventClick() {
    console.log("pin event");
    onActionClick();
  }

  function onDeleteEventClick() {
    console.log("delete event");
    onActionClick();
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

import React from "react";

import { Event } from "../../utils/types";
import { EmojiIcon } from "../icons/EmojiIcon/EmojiIcon";

import "./EventCard.css";

type Props = {
  calendarEvent: Event;
  onLeftMouseClick: () => void;
  onRightMouseClick: () => void;
};

export function EventCard({
  calendarEvent: { title, notes, emoji, startTime, finishTime },
  onLeftMouseClick,
  onRightMouseClick,
}: Props) {
  const makeStringFromTimestamp = (timestamp: any) => {
    const dateAsDate = timestamp.toDate();
    const hour = dateAsDate.getHours();
    const minute = dateAsDate.getMinutes();

    return `${hour}:${minute < 10 ? "0" : ""}${minute} ${
      hour < 12 ? "AM" : "PM"
    }`;
  };

  const getCardClass = () =>
    `event-card ${startTime > new Date() ? "future" : "passed"}`;

  function rightClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    onRightMouseClick();
  }

  return (
    <div
      className={getCardClass()}
      key={title}
      onClick={onLeftMouseClick}
      onContextMenu={(e) => rightClick(e)}
    >
      <EmojiIcon emoji={emoji} />
      <div className="event-information">
        <h4 className="event-card-name">{title}</h4>
        <p className="event-notes">{notes}</p>
      </div>
      <div className="event-time">
        <span>{makeStringFromTimestamp(startTime)}</span>
        <span>{makeStringFromTimestamp(finishTime)}</span>
      </div>
    </div>
  );
}

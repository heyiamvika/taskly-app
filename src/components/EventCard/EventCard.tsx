import React from "react";

import { Event } from "../../utils/types";
import { EmojiIcon } from "../icons/EmojiIcon/EmojiIcon";

import "./EventCard.css";

type Props = {
  calendarEvent: Event;
};

export function EventCard({
  calendarEvent: { title, notes, emoji, startTime, finishTime },
}: Props) {
  const makeStringFromTimestamp = (timestamp: any) => {
    const dateAsDate = timestamp.toDate();
    const hour = dateAsDate.getHours();
    const minute = dateAsDate.getMinutes();

    return `${hour}:${minute < 10 ? "0" : ""}${minute} ${
      hour < 12 ? "AM" : "PM"
    }`;
  };

  const getCardClass = () => {
    // To-do: this is not very effective, pass through props / context??
    const dateFromTimeString = startTime.toDate();
    const now = new Date();
    return dateFromTimeString > now ? "future" : "passed";
  };

  return (
    <div className={`event-card ${getCardClass()}`} key={title}>
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

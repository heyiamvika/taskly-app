import React, { useState } from "react";

import { Event } from "../../utils/types";

import { EventCard } from "../EventCard/EventCard";
import { EventActionsBox } from "../EventActionsBox/EventActionsBox";

import useSingleUserDeleteEvent from "../../hooks/useSingleUserDeleteEvent";

type Props = {
  eventData: Event;
};

export function EventCardWrapper({ eventData }: Props) {
  const [isActionsBoxVisible, setIsActionsBoxVisible] = useState<boolean>(
    false
  );
  const [shouldDeleteEvent, setShouldDeleteEvent] = useState<boolean>(false);

  const openActionsBox = () => setIsActionsBoxVisible(true);
  const closeActionsBox = () => setIsActionsBoxVisible(false);
  const deleteEvent = () => setShouldDeleteEvent(true);

  useSingleUserDeleteEvent(eventData, shouldDeleteEvent, closeActionsBox);

  return (
    <div className="event-card-wrapper">
      <EventCard
        calendarEvent={eventData}
        onLeftMouseClick={closeActionsBox}
        onRightMouseClick={openActionsBox}
      />
      <EventActionsBox
        isVisible={isActionsBoxVisible}
        onPinActionClick={() => console.log("pin")}
        onDeleteActionClick={deleteEvent}
      />
    </div>
  );
}

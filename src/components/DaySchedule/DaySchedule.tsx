import React from "react";

import { DayScheduleHeader } from "../DayScheduleHeader/DayScheduleHeader";
import { DayEvents } from "../../utils/types";

import "./DaySchedule.css";
import { EventCardWrapper } from "../EventCardWrapper/EventCardWrapper";

import { Event } from "../../utils/types";

import _ from "lodash";

type Props = {
  visibleDay: Date;
  dayEvents: DayEvents | null;
  switchToPrevDay: () => void;
  switchToNextDay: () => void;
  onAddNewEventBtnClick: () => void;
};

export function DaySchedule({
  visibleDay,
  dayEvents,
  switchToPrevDay,
  switchToNextDay,
  onAddNewEventBtnClick,
}: Props) {
  console.log("dayEvents", dayEvents);

  const renderEventCards = () => {
    if (dayEvents) {
      const keys: string[] = Object.keys(dayEvents);
      console.log("keys", keys);
      const elems = keys.map((time: string) => {
        // ‼️ WARNING!!!
        // This is temporarily
        // One time can have multiple event cards
        // In future make sure to show them both
        // Remove the 0 later
        // Think how to restructure
        const event: Event = dayEvents[time][0];
        // TO_DO: change key: time + index //
        return <EventCardWrapper eventData={event} key={`${time}/`} />;
      });

      console.log("elems", elems);
      return elems;
    }
  };

  const renderNoEvents = () => {
    return (
      <span className="no-events-text">You have no events on this day!</span>
    );
  };

  const eventCards = _.isEmpty(dayEvents)
    ? renderNoEvents()
    : renderEventCards();

  console.log(eventCards);

  return (
    <div className="day-schedule">
      <div className="day-schedule-header-wrapper">
        <DayScheduleHeader
          visibleDay={visibleDay}
          onPrevDayBtnClick={switchToPrevDay}
          onNextDayBtnClick={switchToNextDay}
          onAddNewEventBtnClick={onAddNewEventBtnClick}
        />
      </div>
      <div className="day-events-wrapper">{eventCards}</div>
    </div>
  );
}

import React from "react";

import { DayScheduleHeader } from "../DayScheduleHeader/DayScheduleHeader";
import { EventCard } from "../EventCard/EventCard";

import "./DaySchedule.css";

import { DayEvents } from "../../utils/types";

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
  const renderEventCards = () => {
    if (dayEvents) {
      const keys: string[] = Object.keys(dayEvents);

      return keys.map((key: string) => (
        <EventCard key={key} calendarEvent={dayEvents[key]} />
      ));
    }
  };

  const renderNoEvents = () => {
    return (
      <span className="no-events-text">You have no events on this day!</span>
    );
  };

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
      <div className="day-events-wrapper">
        {dayEvents ? renderEventCards() : renderNoEvents()}
      </div>
    </div>
  );
}

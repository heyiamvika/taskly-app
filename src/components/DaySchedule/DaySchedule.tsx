import React from "react";

import { DayScheduleHeader } from "../DayScheduleHeader/DayScheduleHeader";
import { DayEvents } from "../../utils/types";

import "./DaySchedule.css";
// import { EventCardWrapper } from "../EventCardWrapper/EventCardWrapper";

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
  // const renderEventCards = () => {
  //   if (dayEvents) {
  //     const keys: string[] = Object.keys(dayEvents);
  //     return keys.map((key: string) => (
  //       <EventCardWrapper eventData={dayEvents[key]} key={key} />
  //     ));
  //   }
  // };

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
      {/* <div className="day-events-wrapper">
        {_.isEmpty(dayEvents) ? renderNoEvents() : renderEventCards()}
      </div> */}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import useSingleUserCalendarGetVisibleEvents from "../../../hooks/useSingleUserCalendarGetVisibleEvents";
import _ from "lodash";

import "./HomePage.css";

import { Calendar } from "../../Calendar/Calendar";
import { DaySchedule } from "../../DaySchedule/DaySchedule";
import { UserInfo } from "../../UserInfo/UserInfo";
import { AddNewEvent } from "../../AddNewEvent/AddNewEvent";

import withAuthentification from "../../Session/withAuthentification";

import { Event } from "../../../utils/types";

const UserInfoWithAuthentification = withAuthentification(UserInfo);

export function HomePage() {
  const [currentDate] = useState<Date>(new Date());
  const [visibleDate, setVisibleDate] = useState<Date>(currentDate);
  const [addNewEventVisible, setAddNewEventVisible] = useState<boolean>(false);

  const [events] = useSingleUserCalendarGetVisibleEvents(visibleDate);

  console.log("events", events);

  const switchToPrevMonth = () => {
    setVisibleDate(
      new Date(
        visibleDate.getFullYear(),
        visibleDate.getMonth() - 1,
        visibleDate.getDate()
      )
    );
  };

  const switchToNextMonth = () => {
    setVisibleDate(
      new Date(
        visibleDate.getFullYear(),
        visibleDate.getMonth() + 1,
        visibleDate.getDate()
      )
    );
  };

  const switchToPrevDay = () => {
    setVisibleDate(
      new Date(
        visibleDate.getFullYear(),
        visibleDate.getMonth(),
        visibleDate.getDate() - 1
      )
    );
  };

  const switchToNextDay = () => {
    setVisibleDate(
      new Date(
        visibleDate.getFullYear(),
        visibleDate.getMonth(),
        visibleDate.getDate() + 1
      )
    );
  };

  const chooseDay = (value: Date | undefined) => {
    if (!value) return;
    setVisibleDate(value);
  };

  const getVisibleDayEvents = () => {
    const dateString = `${visibleDate.getFullYear()}:${
      visibleDate.getMonth() + 1
    }:${visibleDate.getDate()}`;

    return _.isEmpty(events) ? null : events[dateString];
  };

  const openAddNewEventSection = () => setAddNewEventVisible(true);
  const closeAddNewEventSection = () => setAddNewEventVisible(false);

  return (
    <div className="home-page">
      <div className="home-page-grey-section">
        <Calendar
          currentDate={currentDate}
          visibleDate={visibleDate}
          switchToNextMonth={switchToNextMonth}
          switchToPrevMonth={switchToPrevMonth}
          onDayChoose={chooseDay}
        />
      </div>
      <div className="home-page-white-section">
        <DaySchedule
          visibleDay={visibleDate}
          dayEvents={getVisibleDayEvents()}
          switchToPrevDay={switchToPrevDay}
          switchToNextDay={switchToNextDay}
          onAddNewEventBtnClick={openAddNewEventSection}
        />
        {/* <UserInfoWithAuthentification /> */}
        <AddNewEvent
          isVisible={addNewEventVisible}
          eventDate={visibleDate}
          onCloseBtnClick={closeAddNewEventSection}
        />
      </div>
    </div>
  );
}

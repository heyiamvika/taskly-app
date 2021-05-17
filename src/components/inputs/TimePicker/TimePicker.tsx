import React, { useState, useEffect } from "react";

import "./TimePicker.css";

import {
  TWELVE_HOUR_CLOCK_HOURS,
  MINUTES,
  DAY_PERIODS,
} from "../../../utils/constants";

type Props = {
  title: string;
  emoji: string;
  initialEventDateTime: Date;
  keyOnSelectChange: string;
  onTimeSelectChange: (key: string, newValue: Date) => void;
};

type State = {
  hours: number;
  minutes: number;
  dayPeriod: "AM" | "PM";
};

export function TimePicker({
  title,
  emoji,
  initialEventDateTime,
  keyOnSelectChange,
  onTimeSelectChange,
}: Props) {
  const [time, setTime] = useState<State>({
    hours: initialEventDateTime.getHours(),
    minutes: initialEventDateTime.getMinutes(),
    dayPeriod: "AM",
  });

  const { hours, minutes, dayPeriod } = time;

  useEffect(() => {
    const clock24Hour = makeCloc24FromClock12Hours(hours, dayPeriod);

    const newDate = new Date(
      initialEventDateTime.getFullYear(),
      initialEventDateTime.getMonth(),
      initialEventDateTime.getDate(),
      clock24Hour,
      minutes,
      0
    );

    onTimeSelectChange(keyOnSelectChange, newDate);
  }, [time]);

  const makeCloc24FromClock12Hours = (
    hour: number,
    dayPeriod: "AM" | "PM"
  ): number => {
    const HOURS_IN_DAY_PERIOD: number = 12;

    if (dayPeriod === "AM" && hour < 10) return hour;
    if (dayPeriod === "PM") return Number(hour) + HOURS_IN_DAY_PERIOD;

    return hour;
  };

  const changeTime = (newValue: string, key: string) => {
    setTime({ ...time, [key]: newValue });
  };

  const getHours = () => {
    return TWELVE_HOUR_CLOCK_HOURS.map((hour: number) => (
      <option key={hour} value={hour}>
        {hour}
      </option>
    ));
  };

  const getMinutes = () => {
    return MINUTES.map((minute: number) => (
      <option key={minute} value={minute}>
        {minute < 10 ? `0${minute}` : minute}
      </option>
    ));
  };

  const getDayPeriods = () => {
    return DAY_PERIODS.map((period: string) => (
      <option key={period} value={period}>
        {period}
      </option>
    ));
  };

  return (
    <div className="time-picker">
      <span className="time-icon" role="img" aria-label="time-emoji">
        {emoji}
      </span>
      <span className="time-picker-title">{title}</span>
      <div className="time-picker-select-wrapper">
        <select
          value={hours}
          className="time-picker-select"
          name="hours"
          onChange={(e) => changeTime(e.target.value, e.target.name)}
        >
          {getHours()}
        </select>
        <span className="time-picker-select-divider">:</span>
        <select
          value={minutes}
          className="time-picker-select"
          name="minutes"
          onChange={(e) => changeTime(e.target.value, e.target.name)}
        >
          {getMinutes()}
        </select>
        <select
          value={dayPeriod}
          className="time-picker-select"
          name="dayPeriod"
          onChange={(e) => changeTime(e.target.value, e.target.name)}
        >
          {getDayPeriods()}
        </select>
      </div>
    </div>
  );
}

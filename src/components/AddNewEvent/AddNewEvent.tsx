import React, { useState, useEffect, useCallback } from "react";

import "./AddNewEvent.css";

import { RoundYellowButton } from "../buttons/RoundYellowButton/RoundYellowButton";

import { EmojiPicker } from "../buttons/EmojiPicker/EmojiPicker";
import { BasicInput } from "../inputs/BasicInput/BasicInput";
import { TimePicker } from "../inputs/TimePicker/TimePicker";
import { NoteInput } from "../inputs/NoteInput/NoteInput";
import { OvalYellowButton } from "../buttons/OvalYellowButton/OvalYellowButton";

import { Event } from "../../utils/types";

import useSingleUserAddEvent from "../../hooks/useSingleUserAddEvent";

type Props = {
  isVisible: boolean;
  eventDate: Date;
  onCloseBtnClick: () => void;
};

export function AddNewEvent({ eventDate, isVisible, onCloseBtnClick }: Props) {
  const initialStartTime = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate(),
    7,
    0,
    0
  );

  const initialFinishTime = new Date(
    eventDate.getFullYear(),
    eventDate.getMonth(),
    eventDate.getDate(),
    8,
    0,
    0
  );

  console.log("initialStartTime", initialStartTime);
  console.log("initialFinishTime", initialFinishTime);

  const [newEvent, setNewEvent] = useState<Event>({
    emoji: "🥰",
    startTime: initialStartTime,
    finishTime: initialFinishTime,
    title: "",
    notes: "",
    isPinned: false,
  });

  const [sendNewEvent, setsendNewEvent] = useState<boolean>(false);

  useSingleUserAddEvent(newEvent, sendNewEvent, onCloseBtnClick);

  const changeEventValue = <Type extends {}>(newValue: Type, key: string) => {
    console.log("newEventChanged", { ...newEvent, [key]: newValue });
    setNewEvent({ ...newEvent, [key]: newValue });
  };

  const { emoji, title, startTime, finishTime } = newEvent;

  return (
    <div
      className={`add-new-event-section ${isVisible ? "visible" : "hidden"}`}
    >
      <div className="input-wrapper">
        <EmojiPicker emoji={emoji} onEmojiChange={changeEventValue} />
      </div>
      <div className="input-wrapper">
        <BasicInput
          name="title"
          value={title}
          placeholder="Type your event name here..."
          inputType="text"
          color="transparent"
          onChange={changeEventValue}
        />
      </div>
      <div className="input-wrapper">
        <TimePicker
          title="Event start"
          emoji="⏰"
          initialEventDateTime={startTime}
          keyOnSelectChange="startTime"
          onSelectChange={changeEventValue}
        />
      </div>
      <div className="input-wrapper">
        <TimePicker
          title="Event end"
          emoji="⌛"
          initialEventDateTime={finishTime}
          keyOnSelectChange="finishTime"
          onSelectChange={changeEventValue}
        />
      </div>
      <div className="input-wrapper">
        <NoteInput
          emoji="✏️"
          title="Add a note"
          keyOnSelectChange="notes"
          onChange={changeEventValue}
        />
      </div>
      <OvalYellowButton
        text="Create event"
        disabled={false}
        onClick={() => setsendNewEvent(true)}
      />
      <div className="close-btn-wrapper">
        <RoundYellowButton label="x" onClick={onCloseBtnClick} />
      </div>
    </div>
  );
}

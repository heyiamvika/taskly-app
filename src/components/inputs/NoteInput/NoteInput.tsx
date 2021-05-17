import React, { useState } from "react";

import "./NoteInput.css";

type Props = {
  emoji: string;
  title: string;
  keyOnSelectChange: string;
  onChange: (key: string, newValue: string) => void;
};

export function NoteInput({
  emoji,
  title,
  keyOnSelectChange,
  onChange,
}: Props) {
  const [noteFieldVisible, setNoteFieldVisible] = useState(false);

  const openNoteField = () => setNoteFieldVisible(true);

  return (
    <div className="note-input">
      <div className="main-input">
        <span className="note-input-icon" role="img" aria-label="time-emoji">
          {emoji}
        </span>
        <span className="note-input-title">{title}</span>
        <button className="add-note-btn" onClick={openNoteField}>
          Add +
        </button>
      </div>
      <div
        className={`note-field ${
          noteFieldVisible ? "note-field-visible" : "note-field-hidden"
        }`}
      >
        <textarea
          placeholder="Type your event note here..."
          onChange={(e) => onChange(keyOnSelectChange, e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

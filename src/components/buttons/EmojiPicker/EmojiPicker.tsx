import React from "react";

import { EmojiButton } from "@joeattardi/emoji-button";

import "./EmojiPicker.css";

type Props = {
  emoji: string | undefined;
  onEmojiChange: <Type>(newValue: Type, key: string) => void;
};

export function EmojiPicker({ emoji, onEmojiChange }: Props) {
  const picker = new EmojiButton();
  const trigger = document.querySelector("#emoji-trigger");

  picker.on("emoji", (selection) => {
    // handle the selected emoji here
    onEmojiChange<string | undefined>(selection.emoji, "emoji");
  });

  trigger?.addEventListener("click", () =>
    picker.togglePicker(trigger as HTMLElement)
  );

  return (
    <div>
      <button id="emoji-trigger" className="emoji-button">
        <span className="initial-emoji" role="img" aria-label="emoji">
          {emoji}
        </span>
      </button>
    </div>
  );
}

import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

import { Event } from "../utils/types";

export default function useSingleUserAddEvent(
  event: Event,
  shouldSendEvent: boolean,
  onEventSentCallback?: () => void
) {
  const [isSent, setIsSent] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldSendEvent) return;

    const docKey = createDocKey(event.startTime);
    const eventKey = createEventKey(event.startTime);
    const docRef = db.collection("single-user-calendar").doc(docKey);

    docRef
      .set({ [eventKey]: event }, { merge: true })
      .then(() => {
        console.log("Document successfully written!");
        setIsSent(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    if (onEventSentCallback) {
      onEventSentCallback();
    }
  }, [shouldSendEvent]);

  return isSent;
}

function createDocKey(time: Date): string {
  return `${time.getFullYear()}:${time.getMonth()}:${time.getDate()}`;
}

function createEventKey(time: Date): string {
  return `${getStringFromTimeNumber(time.getHours())}:${getStringFromTimeNumber(
    time.getMinutes()
  )}:${getStringFromTimeNumber(time.getSeconds())}`;
}

function getStringFromTimeNumber(value: number): string {
  return value < 10 ? `0${value}` : `${value < 10}`;
}

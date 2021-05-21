import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { v4 } from "uuid";

import { Event } from "../utils/types";

import { createDayDocKey, createEventCollectionKey } from "../utils/hooksUtils";

export default function useSingleUserAddEvent(
  event: Event,
  shouldSendEvent: boolean,
  onEventSentCallback?: () => void
) {
  const [isSent, setIsSent] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldSendEvent) return;

    const dayDocKey = createDayDocKey(event.startTime);
    const eventCollectionKey = createEventCollectionKey(event.startTime);

    const dayDocRef = db
      .collection("single-user-calendar")
      .doc(dayDocKey)
      .collection(eventCollectionKey)
      .doc(v4());

    dayDocRef
      .set({ event })
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

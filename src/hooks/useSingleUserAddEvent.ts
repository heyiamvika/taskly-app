import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

import { Event } from "../utils/types";

export default function useSingleUserAddEvent(
  event: Event,
  shouldSendEvent: boolean,
  onEventSentCallback?: () => void
) {
  const [isSent, setIsSent] = useState<boolean>(false);

  console.log("useSingleUserAddEvent is called");
  console.log("startTime", event.startTime);

  useEffect(() => {
    if (shouldSendEvent) {
      const startTime = event.startTime.toDate();

      const docKey = `${startTime.getFullYear()}:${
        startTime.getMonth() + 1
      }:${startTime.getDate()}`;
      const eventKey = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`;

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
    }

    if (onEventSentCallback) {
      onEventSentCallback();
    }
  }, [shouldSendEvent]);

  return isSent;
}

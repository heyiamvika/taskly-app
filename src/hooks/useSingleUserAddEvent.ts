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

  useEffect(() => {
    if (shouldSendEvent) {
      const startTime = new Date(event.startTime);

      const docKey = `${startTime.getFullYear()}:${startTime.getMonth()}:${startTime.getDate()}`;
      const eventKey = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`;

      db.collection("single-user-calendar")
        .doc(docKey)
        .set({ [eventKey]: event })
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

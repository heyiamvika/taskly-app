import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

// TO_DO: add event type
export default function useSingleUserAddEvent(
  event: any,
  shouldSendEvent: boolean
) {
  const [eventId, setEventId] = useState<string | null>(null);

  console.log("useSingleUserAddEvent is called");

  useEffect(() => {
    if (shouldSendEvent) {
      db.collection("single-user-calendar")
        .add(event)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          setEventId(docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  }, [shouldSendEvent]);

  return eventId;
}

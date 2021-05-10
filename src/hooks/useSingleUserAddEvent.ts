import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

// TO_DO: add event type
function useSingleUserAddEvent(event: any) {
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    db.collection("single-user-calendar")
      .add(event)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        setEventId(docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });

  return eventId;
}

import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

import { AllEvents, DayEvents } from "../utils/types";

const singleUserCalendarCollectionRef = db.collection("single-user-calendar");

export default function useSingleUserCalendarGetVisibleDateEvents(
  visibleDate: Date
) {
  const [calEvents, setCalEvents] = useState<DayEvents>({});

  const docKey = `${visibleDate.getFullYear()}:${visibleDate.getMonth()}:${visibleDate.getDate()}`;

  useEffect(() => {
    singleUserCalendarCollectionRef
      .doc(docKey)
      .get()
      .then((doc) => {
        setCalEvents(doc.exists ? (doc.data() as DayEvents) : {});
      })
      .catch((error) => {
        console.error("Error receiving single user calendar event: ", error);
      });
  }, [visibleDate]);

  return [calEvents];
}

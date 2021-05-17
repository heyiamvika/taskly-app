import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

import { DayEvents } from "../utils/types";

const singleUserCalendarCollectionRef = db.collection("single-user-calendar");

export default function useSingleUserCalendarGetVisibleDateEvents(
  visibleDate: Date
) {
  const [calEvents, setCalEvents] = useState<DayEvents>({});

  const docKey = `${visibleDate.getFullYear()}:${visibleDate.getMonth()}:${visibleDate.getDate()}`;

  useEffect(() => {
    singleUserCalendarCollectionRef
      .doc(docKey)
      // .get()
      .onSnapshot((doc) => {
        setCalEvents(doc.exists ? (doc.data() as DayEvents) : {});
      });
  }, [visibleDate]);

  return [calEvents];
}

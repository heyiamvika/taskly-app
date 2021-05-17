import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

const singleUserCalendarCollectionRef = db.collection("single-user-calendar");

export default function useSingleUserCalendarGetVisibleEvents(
  visibleDate: Date
) {
  // TO_DO: separate type later
  const [calEvents, setCalEvents] = useState<{
    [key: string]: any;
  }>({});

  const docKey = `${visibleDate.getFullYear()}:${
    visibleDate.getMonth() + 1
  }:${visibleDate.getDate()}`;

  useEffect(() => {
    singleUserCalendarCollectionRef
      .doc(docKey)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCalEvents({ ...calEvents, [doc.id]: doc.data() });
        }
      })
      .catch((error) => {
        console.error("Error receiving single user calendar event: ", error);
      });
  }, [visibleDate]);

  return [calEvents];
}

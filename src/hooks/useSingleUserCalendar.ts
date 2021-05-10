import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

var singleUserCalendarCollectionRef = db.collection("single-user-calendar");

export default function useSingleUserCalendar() {
  // TO_DO: separate type later
  const [calEvents, setCalEvents] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    db.collection("single-user-calendar")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          setCalEvents({ ...calEvents, [doc.id]: doc.data() });
        });
      })
      .catch((error) => {
        console.error("Error receiving single user calendar: ", error);
      });
  }, []);

  return [calEvents];
}

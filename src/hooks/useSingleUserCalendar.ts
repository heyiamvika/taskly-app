import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

export default function useSingleUserCalendar() {
  // TO_DO: separate type later
  const [calEvents, setCalEvents] = useState<{
    [key: string]: any;
  }>({});

  useEffect(() => {
    db.collection("single-user-calendar")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);

        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          calEvents[doc.id] = doc.data();
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });

  return calEvents;
}

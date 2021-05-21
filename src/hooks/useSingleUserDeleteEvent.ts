import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

import { Event } from "../utils/types";

import {
  createDayDocKey,
  createEventCollectionKey,
  getDocument,
} from "../utils/hooksUtils";

export default function useSingleUserDeleteEvent(
  event: Event,
  shouldDeleteEvent: boolean,
  onEventDeletedCallback?: () => void
) {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldDeleteEvent) return;

    const startTime = new Date(event.startTime);

    console.log("startTime", event.startTime);
    console.log(startTime);

    // TO_DO: not deleting doc, but modifying it!
    // const docKey = createDocKey(event.startTime);
    // const eventKey = createEventKey(event.startTime);
    // const docRef = db.collection("single-user-calendar").doc(docKey);

    // getDocument(docRef).then((res) => console.log(res));

    // Delete by event key passed in props

    // docRef
    //   .set({ [eventKey]: event }, { merge: true })
    //   .then(() => {
    //     console.log("Document successfully written!");
    //     setIsSent(true);
    //   })
    //   .catch((error) => {
    //     console.error("Error adding document: ", error);
    //   });

    // if (onEventSentCallback) {
    //   onEventSentCallback();
    // }
  }, [shouldDeleteEvent]);

  return isDeleted;
}

// function getStringFromTimeNumber(value: number): string {
//   return value < 10 ? `0${value}` : `${value}`;
// }

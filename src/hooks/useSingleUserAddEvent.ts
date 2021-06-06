import { useState, useEffect } from "react";
import { db, firestore } from "../firebase/firebaseConfig";

import { Event } from "../utils/types";

import { createDayDocKey, createEventCollectionKey } from "../utils/hooksUtils";

export default function useSingleUserAddEvent(
  event: Event,
  shouldSendEvent: boolean,
  onEventSentCallback?: () => void
) {
  const [isSent, setIsSent] = useState<boolean>(false);

  useEffect(() => {
    if (!shouldSendEvent) return;

    const dayDocKey = createDayDocKey(event.startTime);
    const eventCollectionKey = createEventCollectionKey(event.startTime);

    const dayDocRef = db.collection("single-user-calendar").doc(dayDocKey);
    const dayCollectionRef = dayDocRef.collection(eventCollectionKey);

    // NOTE: documents in Firebase don't exist,
    // if no value is added, so a value is added to the document on purpose
    // 1) collectionsIds are added to the array,
    // so we could iterate through them later
    // 2) don't forget to delete collectionId after deleting a collection
    dayDocRef.update({
      collections: firestore.FieldValue.arrayUnion(eventCollectionKey),
    });

    dayCollectionRef
      .add(event)
      .then((docRef) => {
        console.log("Document successfully written with id!", docRef.id);
        setIsSent(true);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

    if (onEventSentCallback) {
      onEventSentCallback();
    }
  }, [shouldSendEvent]);

  return isSent;
}

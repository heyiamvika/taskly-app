import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";

import { DayEvents, CollectionsIds, Event } from "../utils/types";
import { createDayDocKey } from "../utils/hooksUtils";

import _ from "lodash";

export default function useSingleUserCalendarGetVisibleDateEvents(
  visibleDate: Date
) {
  const [calEvents, setCalEvents] = useState<DayEvents>({});

  const dayDocKey = createDayDocKey(visibleDate);
  const dayDocRef = db.collection("single-user-calendar").doc(dayDocKey);

  useEffect(() => {
    dayDocRef.onSnapshot(async (doc) => {
      if (doc.exists) {
        const { collections } = doc.data() as CollectionsIds;

        // TO_DO: consider restructuring DB to make it flat in future!!!!
        // It shouldn't affect the UI though,
        // you still return DayEvents
        // O n^2!!!

        const collectionsData: DayEvents = {};

        await Promise.all(
          collections.map(async (collectionId) => {
            return dayDocRef
              .collection(collectionId)
              .get()
              .then((querySnapshot) => {
                const timeEvents: any = [];

                querySnapshot.forEach((document) => {
                  const event = document.data() as Event;
                  timeEvents.push(event);
                });

                collectionsData[collectionId] = timeEvents;
              });
          })
        );

        setCalEvents(collectionsData);
      }
    });
  }, [visibleDate]);

  return [calEvents];
}

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
        collections.forEach((collectionId) =>
          dayDocRef
            .collection(collectionId)
            .get()
            .then((querySnapshot) => {
              const collectionsData: DayEvents = {};

              querySnapshot.forEach((document) => {
                const event = document.data() as Event;

                if (_.isEmpty(collectionsData))
                  collectionsData[collectionId] = [event];
                else collectionsData[collectionId].push(event);
              });

              setCalEvents(collectionsData);
            })
        );
      }
    });
  }, [visibleDate]);

  return [calEvents];
}

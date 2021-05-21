import { DocumentReference, DocumentData } from "@firebase/firestore-types";

export function createDayDocKey(time: Date): string {
  return `${time.getFullYear()}:${time.getMonth()}:${time.getDate()}`;
}

export function createEventCollectionKey(time: Date): string {
  return `${getStringFromTimeNumber(time.getHours())}:${getStringFromTimeNumber(
    time.getMinutes()
  )}:${getStringFromTimeNumber(time.getSeconds())}`;
}

function getStringFromTimeNumber(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

export function getDocument(
  docRef: DocumentReference<DocumentData>
): Promise<void | DocumentData> {
  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        return doc.data();
      }

      // doc.data() will be undefined in this case
      console.log("No such document!");
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

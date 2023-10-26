import { User } from "firebase/auth";
import { auth, db } from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const getPetName = async (): Promise<string> => {
  const user: any = auth.currentUser;
  const petsRef = collection(db, "pets");
  const q = query(petsRef, where("userId", "array-contains", user.uid));

  let name = "";

  if (user) {
    await getDocs(q)
      .then((querySnapshot) => {
        name = querySnapshot.docs[0].data().name;
      })
      .catch((error) => console.log(error));
  }
  return name;
};

export const getPetId = async (): Promise<string> => {
  const user: any = auth.currentUser;
  const petsRef = collection(db, "pets");
  const q = query(petsRef, where("userId", "array-contains", user.uid));
  let id = "";

  if (user) {
    await getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("Pet id fetched: " + doc.id, " => ", doc.data());
          id = doc.id;
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }
  return id;
};

export const addEventByPetId = async (petId: string, event: any) => {
  const user: any = auth.currentUser;

  if (user) {
    await addDoc(collection(db, `pets/${petId}/events`), {
      category: event.category,
      name: event.name,
      notes: event.notes,
      createdAt: new Date(),
      value: event.value,
    });
  }
};

export const deleteEventByEventId = async (petId: string, eventId: string) => {
  await deleteDoc(doc(db, `pets/${petId}/events`, eventId)).then(() => {
    console.log(eventId + " deleted successfully");
  });
};

// Finish this function by adding one more where filter
export const getEventsByCategory = async (
  petId: string | null,
  categoryName: string
) => {
  const user: any = auth.currentUser;
  let events: any = [];
  // const petsRef = collection(db, `pets/${petId}/events`);
  const petsRef = collection(db, `pets`);
  const q = query(petsRef, where("userId", "array-contains", user.uid));


  const q2 = query(
    q,
    where("category", "==", categoryName)
  );

  if (user) {
    await getDocs(q2)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("Pet event: " + doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  return events;
};

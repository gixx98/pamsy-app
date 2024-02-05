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

interface Event {
  category: string;
  name: string;
  createdAt?: Date;
  notes: string;
  value?: number;
  unitOfMeasure?: string;
  dosage?: number;
  dateOfEvent?: Date;
}

export const addEventByPetId = async (petId: string, event: Event) => {
  const eventData: Event = {
    category: event.category,
    name: event.name,
    notes: event.notes,
    createdAt: new Date(),
  };

  if (event.category == "Medication") {
    eventData.dosage = event.dosage;
    eventData.unitOfMeasure = ""
  } else if (event.category == "Vaccination") {
    eventData.unitOfMeasure = "";
  } else if (event.category == "Vet appointment") {
    eventData.unitOfMeasure = "";
  } else if (event.category == "Observation") {
    eventData.unitOfMeasure = "";
  } else if (event.category == "Weight") {
    eventData.value = event.value;
    eventData.unitOfMeasure = event.unitOfMeasure;
  } else if (
    event.category == "Walk" ||
    event.category == "Training" ||
    event.category == "Playtime"
  ) {
    eventData.value = event.value;
    eventData.unitOfMeasure = event.unitOfMeasure;
  }

  await addDoc(collection(db, `pets/${petId}/events`), {
    category: event.category,
    name: event.name,
    notes: event.notes,
    createdAt: new Date(),
    unitOfMeasure: event.unitOfMeasure,
    value: event.value,
  });
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
  const petsRef = collection(db, `pets/${petId}/events`);

  const categoryEventsQuery = query(
    petsRef,
    where("category", "==", categoryName)
  );

  if (user) {
    await getDocs(categoryEventsQuery)
      .then((querySnapshot) => {
        const events: any = [];
        querySnapshot.forEach((doc) => {
          // console.log("Pet event: " + doc.id, " => ", doc.data());
          events.push({
            id: doc.id,
            name: doc.data().name,
            value: doc.data().value,
            category: doc.data().category,
            createdAt: new Date(
              doc.data().createdAt.seconds * 1000 +
                doc.data().createdAt.nanoseconds / 1e6
            ),
          });
        });
        return events;
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  return events;
};

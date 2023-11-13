import { auth, db } from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const addObservation = async (
  petId: string | null,
  observation: any
) => {
  const user: any = auth.currentUser;

  if (user) {
    await addDoc(collection(db, `pets/${petId}/observations`), {
      title: observation.title,
      createdAt: observation.createdAt,
      completed: false,
    });
  }
};

export const editObservation = async (
  id: string,
  completed: boolean,
  petId: string | null
) => {
  await updateDoc(doc(db, `pets/${petId}/observations/${id}`), {
    completed: !completed,
  });
};

export const getAllObservation = async (petId: string | null) => {
  const q = collection(db, `pets/${petId}/observations`);
  const querySnapshot = await getDocs(q);
  const observations:any[] = [];

  querySnapshot.forEach((doc) => {
    const observationData = doc.data();
    observations.push({
      id: doc.id,
      title: observationData.title, // Replace with the actual field name from your observation data
    });
  });

  return observations;
};

interface Observation {
  createdAt: Date,
  createdBy: string | undefined,
  notes: string
}

export const addObservationToCollection = async (petId: string | null, observationId: string, observation: Observation) => {
  const user: any = auth.currentUser;

  if (user) {
    await addDoc(collection(db, `pets/${petId}/observations/${observationId}/records`), {
      createdAt: observation.createdAt,
      createdBy: observation.createdBy,
      notes: observation.notes,
    });
  }
}

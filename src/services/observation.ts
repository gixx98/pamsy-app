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

export const addObservation = async (petId: string | null, observation: any) => {
    const user: any = auth.currentUser;
  
    if (user) {
      await addDoc(collection(db, `pets/${petId}/observations`), {
        title: observation.title,
        createdAt: observation.createdAt,
        completed: false,
      });
    }
  };
import { auth, db } from "./config";
import { addDoc, collection, getDocs, setDoc } from "firebase/firestore";

export const getPetName = async (): Promise<string> => {
  const user: any = auth.currentUser;
	let name = '';

  if (user) {
    await getDocs(collection(db, `users/${user.uid}/pets`))
      .then((querySnapshot) => {
				name = querySnapshot.docs[0].data().name;
      })
      .catch((error) => console.log(error));
  }
  return name;
};

export const getPetId = async (): Promise<string> => {
  const user: any = auth.currentUser;
	let id = '';

  if (user) {
    await getDocs(collection(db, `users/${user.uid}/pets`))
      .then((querySnapshot) => {
				id = querySnapshot.docs[0].id;
      })
      .catch((error) => console.log(error));
  }
  return id;
}

export const addEventByPetId = async (petId:string, event: any) => {
  const user: any = auth.currentUser;

  if(user){
    await addDoc(collection(db, `users/${user.uid}/pets/${petId}/events`), {
      category: event.category,
      name: event.name,
      notes: event.notes,
      createdAt: new Date()
    })
  }
}
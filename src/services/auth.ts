import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";

export const signin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return user;
    
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const signup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await emailverification();

    const user = userCredential.user;
    console.log("User registered: " + user);
    return user;
  } catch (error) {
    throw error;
  }
};

export const emailverification = async () => {
  const user = auth.currentUser;

  try {
    if (auth.currentUser)
      await sendEmailVerification(auth.currentUser, {
        handleCodeInApp: true,
        url: "https://pamsy-e9dc3.firebaseapp.com",
      }).then(() => {
        alert(user?.email);
      });
  } catch (error: any) {
    const errorcode = error.code;
    const errorMessage = error.message;
    console.log("Email verification error: " + errorcode + " " + errorMessage);
    throw error;
  }
};

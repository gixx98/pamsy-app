import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./config";
import { Alert } from "react-native";

export const signin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("Signed in")
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
        // Alert.alert('Verify email', `We've sent an email to ${user?.email}. Click on the link and continue!`, [
        //   {
        //     text: 'I verified my email',
        //     onPress: () => user?.reload(),
        //     isPreferred: true
        //   },
        //   {text: 'OK', onPress: () => console.log('OK Pressed'), style:'cancel'},
        // ]);
      });
  } catch (error: any) {
    const errorcode = error.code;
    const errorMessage = error.message;
    console.log("Email verification error: " + errorcode + " " + errorMessage);
    throw error;
  }
};


export const isEmailVerified = () => {
  const user = auth.currentUser;

  if (user) {
    return user.emailVerified;
  }

  return false;
};
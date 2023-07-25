// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDMugDLv1y8cn42bUYj7o6N9K1K_jWExs",
  authDomain: "crwn-clothing-db-73447.firebaseapp.com",
  projectId: "crwn-clothing-db-73447",
  storageBucket: "crwn-clothing-db-73447.appspot.com",
  messagingSenderId: "304801088102",
  appId: "1:304801088102:web:701f16dfbbf05ab0fea3a7",
  measurementId: "G-RMVF5N36Y2",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  // * Data of user from firestore
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      const newUserInfo = {
        email,
        createdAt,
        displayName,
        ...additionalInformation,
      };
      await setDoc(userDocRef, newUserInfo);
    } catch (err) {
      console.log("createUserDocumentFromAuth err: ", err);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (formFields) => {
  const { email, password } = formFields;
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (formFields) => {
  const { email, password } = formFields;
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = async (callback) => {
  onAuthStateChanged(auth, callback);
}
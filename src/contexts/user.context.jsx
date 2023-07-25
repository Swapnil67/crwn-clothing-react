import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if(user) {
        console.log("user ", user);
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    // return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};


/*
 * For every context we build
 * there is a provider
 */


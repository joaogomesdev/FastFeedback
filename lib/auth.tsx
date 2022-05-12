import React, { useState, useEffect, useContext, createContext } from "react";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

import firebase, { firebaseConfig } from "./firebase";
import { createUser } from "./firestore";

if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig, "client-side");
}

type AuthContextData = {
  user: any;
  signInWithGithub(): Promise<void>;
  signOut: () => Promise<void>;
};

export interface IAuthContext {
  user: any;
  signInWithGithub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const authContext = createContext<AuthContextData>({} as IAuthContext);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  const handleUser = async (rawUser: any) => {
    if (rawUser) {
      const user = formatUser(rawUser);

      await createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signInWithGithub = async () => {
    return signInWithPopup(auth, new GithubAuthProvider())
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        handleUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(
          "Error code: " + errorCode,
          "error message: " + errorMessage
        );
      });
  };

  const signOut = async () => {
    await auth.signOut();
    handleUser(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGithub,
    signOut,
  };
}

const formatUser = (user: any) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
  };
};

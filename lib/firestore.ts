import { initializeApp } from "firebase/app";

import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import { firebaseConfig } from "./firebase";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createUser(uid: string, data: any) {
  return await setDoc(
    doc(db, "users", uid),
    {
      uid,
      ...data,
    },
    {
      merge: true,
    }
  );
}

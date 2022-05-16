import { v4 } from "uuid";
import { initializeApp } from "firebase/app";

import { firebaseConfig } from "./firebase";
import { getFirestore, setDoc, doc } from "firebase/firestore/lite";

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

export async function createSite(data: any) {
  const uuid = v4();

  await setDoc(
    doc(db, "sites", uuid),
    {
      uuid,
      ...data,
    },
    {
      merge: true,
    }
  );
}
export async function createFeedback(data: any) {
  const uuid = v4();

  await setDoc(
    doc(db, "feedback", uuid),
    {
      uuid,
      ...data,
    },
    {
      merge: true,
    }
  );
}

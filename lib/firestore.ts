import { initializeApp } from "firebase/app";
import { v4 } from "uuid";

import { getFirestore, setDoc, doc } from "firebase/firestore/lite";
import slugify from "slugify";
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

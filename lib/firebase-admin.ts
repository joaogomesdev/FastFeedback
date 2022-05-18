import * as admin from "firebase-admin";

import firebaseAdminConfig from "../firebaseAdmin.json";

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      firebaseAdminConfig as admin.ServiceAccount
    ),
  });
  console.log("Initialized.");
} catch (error) {
  /*x33
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}
const auth = admin.auth();
const fire = admin.firestore();

export { auth, fire };

import admin from "@lib/firebase-admin";

export default async function handler(_, res) {
  const db = admin.firestore();

  const snapshot = db.collection("sites").get();
  const sites = [];

  (await snapshot).forEach(async (doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  res.status(200).json(sites);
}

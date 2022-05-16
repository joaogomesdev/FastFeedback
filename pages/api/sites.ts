import admin from "@lib/firebase-admin";
import { getAllSites } from "@lib/firestore-admin";

export default async function handler(_, res) {
  const { error, sites } = await getAllSites();

  if (error) {
    res.status(500).send({ error });
  }

  res.status(200).json({ sites });
}

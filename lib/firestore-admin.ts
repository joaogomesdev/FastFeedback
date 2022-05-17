import { compareDesc, parseISO } from "date-fns";

import { firestore } from "./firebase-admin";

export async function getAllFeedback(siteId: any) {
  try {
    const snapshot = await firestore
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get();

    const feedback = [];

    (await snapshot).forEach(async (doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    );
    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await firestore.collection("sites").get();

    const sites = [];

    (await snapshot).forEach(async (doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {
  const snapshot = await firestore
    .collection("sites")
    .where("author", "==", userId)
    .get();

  const sites = [];

  (await snapshot).forEach(async (doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

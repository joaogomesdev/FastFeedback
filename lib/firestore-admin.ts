import { compareDesc, parseISO } from "date-fns";

import { fire } from "./firebase-admin";

export async function getAllFeedback(siteId: any) {
  try {
    const snapshot = await fire
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

export async function getUserFeedback(userId) {
  const snapshot = await fire
    .collection("feedback")
    .where("authorId", "==", userId)
    .get();

  const feedback = [];

  (await snapshot).forEach(async (doc) => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  feedback.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  );

  return { feedback };
}

export async function getAllSites() {
  try {
    const snapshot = await fire.collection("sites").get();

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
  const snapshot = await fire
    .collection("sites")
    .where("author", "==", userId)
    .get();

  const sites = [];

  (await snapshot).forEach(async (doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function deleteFeedback(id) {
  try {
    await fire.collection("feedback").doc(id).delete();
  } catch (error) {
    return { error };
  }
}

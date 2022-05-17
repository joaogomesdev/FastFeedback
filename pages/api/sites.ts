import { NextApiRequest, NextApiResponse } from "next";

import { auth } from "@lib/firebase-admin";
import { getUserSites } from "@lib/firestore-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.headers;
    const { uid } = await auth.verifyIdToken(String(token));

    const { sites } = await getUserSites(uid);

    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).send({ error });
  }
}

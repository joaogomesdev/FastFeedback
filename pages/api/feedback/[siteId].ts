import type { NextApiRequest, NextApiResponse } from "next";

import { getAllFeedback } from "@lib/firestore-admin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { siteId } = req.query;
  const { feedback, error } = await getAllFeedback(siteId);

  if (error) {
    res.status(500).send({ error });
  }

  res.status(200).send({ feedback });
}

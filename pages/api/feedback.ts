import { NextApiRequest, NextApiResponse } from "next";

import { getUserFeedback } from "@lib/supabase-db";
import { supabaseClient } from "@lib/supabase-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.headers;

    const { data } = await supabaseClient.auth.api.getUser(String(token));

    const { feedback } = await getUserFeedback(data.id);

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).send({ error });
  }
}

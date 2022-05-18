import { NextApiRequest, NextApiResponse } from "next";

import { supabaseClient } from "@lib/supabase-client";
import { getUserFeedback } from "@lib/supabase-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.headers;

    const { data } = await supabaseClient.auth.api.getUser(String(token));

    const { feedback } = await getUserFeedback(data.id);
    console.log(feedback);

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).send({ error });
  }
}

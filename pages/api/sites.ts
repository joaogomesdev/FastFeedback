import { NextApiRequest, NextApiResponse } from "next";

import { supabaseClient } from "@lib/supabase-client";
import { getAllSites, getUserSites } from "@lib/supabase-db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { token } = req.headers;

    const { data } = await supabaseClient.auth.api.getUser(String(token));

    const response = await getUserSites(data.id);

    res.status(200).json({ sites: response.sites });
  } catch (error) {
    res.status(500).send({ error });
  }
}

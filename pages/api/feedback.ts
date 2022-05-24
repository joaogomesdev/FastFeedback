import { NextApiRequest, NextApiResponse } from "next";

import { getUserFeedback } from "@lib/supabase-db";
import { supabaseClient } from "@lib/supabase-client";
import { formatObjectKeys, logger } from "@utils/logger";

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
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );
    res.status(500).send({ error });
  }
}

import { supabaseClient } from "@lib/supabase-client";
import { NextApiRequest, NextApiResponse } from "next";

export default function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  return supabaseClient.auth.api.setAuthCookie(request, response);
}

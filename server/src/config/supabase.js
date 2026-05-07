import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseURL = process.env.API_URL;
const supabaseKey = process.env.API_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseURL || !supabaseKey || !supabaseServiceKey) {
  throw new Error(
    `Missing Supabase env vars: ${[
      !supabaseURL && "API_URL",
      !supabaseKey && "API_ANON_KEY",
      !supabaseServiceKey && "SUPABASE_SERVICE_ROLE_KEY",
    ]
      .filter(Boolean)
      .join(", ")}`,
  );
}

export const supabase = createClient(supabaseURL, supabaseKey);
export const supabaseAdmin = createClient(supabaseURL, supabaseServiceKey);

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabaseURL = process.env.API_URL;
const supabaseKey = process.env.API_ANON_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);

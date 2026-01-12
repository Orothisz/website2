// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";


if (!url || !anon) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(url, anon, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

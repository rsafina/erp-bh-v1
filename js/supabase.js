// ============================================================
// SUPABASE CONFIGURATION
// ============================================================
const SUPABASE_URL = "https://otkklzqwedtmviegaspw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90a2tsenF3ZWR0bXZpZWdhc3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MDE3NzUsImV4cCI6MjA5Njk3Nzc3NX0.R8Ipgp923l3wS7ds6Y_lxsRWEF31_2ww-d6zy1K4hEk";

function getSupabase() {
  return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

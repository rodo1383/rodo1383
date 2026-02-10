import { createSupabaseClient } from "./supabase";

export async function listClients() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function listCases() {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("cases").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

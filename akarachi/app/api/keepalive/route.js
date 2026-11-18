import { connected, db, json } from "@/lib/server";

// Touches the database once a day (the page calls this) so a free Supabase project is not paused for inactivity.
export async function GET() {
  if (!connected) return json({ ok: false, mode: "local" });
  const sb = db();
  const { data } = await sb
    .from("keepalive")
    .select("pings")
    .eq("id", 1)
    .maybeSingle();
  const at = new Date().toISOString();
  await sb
    .from("keepalive")
    .upsert({ id: 1, pinged_at: at, pings: (data?.pings ?? 0) + 1 });
  return json({ ok: true, mode: "write", at });
}

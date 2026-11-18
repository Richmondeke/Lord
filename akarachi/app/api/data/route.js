import { connected, currentUser, db, json } from "@/lib/server";

const toApp = (r) => ({
  ref: r.ref,
  programme: r.programme,
  submitted: r.submitted,
  stage: r.stage,
  summary: r.summary,
  ...(r.sms ? { sms: r.sms } : {}),
});

export async function GET() {
  if (!connected) return json({ error: "not_connected" }, 503);
  const user = await currentUser();
  if (!user) return json({ error: "signed_out" }, 401);
  const sb = db();
  const [{ data: apps }, { data: state }] = await Promise.all([
    sb
      .from("applications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    sb.from("portal_state").select("*").eq("user_id", user.id).maybeSingle(),
  ]);
  return json({
    apps: (apps ?? []).map(toApp),
    draft: state?.draft ?? null,
    learned: state?.learned ?? [],
    mentor: state?.mentor ?? null,
    checkins: state?.checkins ?? [],
  });
}

export async function POST(req) {
  if (!connected) return json({ error: "not_connected" }, 503);
  const user = await currentUser();
  if (!user) return json({ error: "signed_out" }, 401);
  const { kind, value } = await req.json().catch(() => ({}));
  const sb = db();

  if (kind === "apps") {
    // People can add applications; only the office changes a stage, so new rows always start at 0.
    const { data: existing } = await sb
      .from("applications")
      .select("ref")
      .eq("user_id", user.id);
    const have = new Set((existing ?? []).map((r) => r.ref));
    const fresh = (Array.isArray(value) ? value : [])
      .filter((a) => a?.ref && !have.has(a.ref))
      .map((a) => ({
        user_id: user.id,
        ref: String(a.ref),
        programme: String(a.programme),
        submitted: a.submitted ?? null,
        summary: a.summary ?? null,
        sms: a.sms ?? null,
        stage: 0,
      }));
    if (fresh.length) {
      const { error } = await sb.from("applications").insert(fresh);
      if (error) return json({ error: error.message }, 400);
    }
    return json({ ok: true });
  }

  const column = {
    draft: "draft",
    learned: "learned",
    mentor: "mentor",
    checkins: "checkins",
  }[kind];
  if (!column) return json({ error: "Unknown kind." }, 400);
  const fallback = { learned: [], checkins: [] }[kind] ?? null;
  const { error } = await sb.from("portal_state").upsert({
    user_id: user.id,
    [column]: value ?? fallback,
    updated_at: new Date().toISOString(),
  });
  if (error) return json({ error: error.message }, 400);
  return json({ ok: true });
}

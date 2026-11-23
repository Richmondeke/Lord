import {
  connected,
  currentUser,
  db,
  json,
  refOk,
  sameOrigin,
} from "@/lib/server";
import { programmes } from "@/lib/content";

const PROGRAMME_IDS = new Set(programmes.map((p) => p.id));
const MAX_BYTES = 20_000;
const clip = (v, n) => (v == null ? null : String(v).slice(0, n));
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
  if (!sameOrigin(req)) return json({ error: "Request refused." }, 403);
  const user = await currentUser();
  if (!user) return json({ error: "signed_out" }, 401);
  const raw = await req.text();
  if (raw.length > MAX_BYTES) return json({ error: "Too large." }, 413);
  let parsed = {};
  try {
    parsed = JSON.parse(raw);
  } catch {}
  const { kind, value } = parsed;
  const sb = db();

  if (kind === "apps") {
    // People can add applications; only the office changes a stage, so new rows always start at 0.
    const { data: existing } = await sb
      .from("applications")
      .select("ref, programme")
      .eq("user_id", user.id);
    const have = new Set((existing ?? []).map((r) => r.ref));
    // The rules allow one application per programme, so a programme already applied for is skipped.
    const applied = new Set((existing ?? []).map((r) => r.programme));
    const fresh = (Array.isArray(value) ? value : [])
      .filter(
        (a) =>
          refOk(a?.ref) &&
          PROGRAMME_IDS.has(a.programme) &&
          !have.has(a.ref) &&
          !applied.has(a.programme),
      )
      .filter(
        (a, i, list) =>
          list.findIndex((b) => b.programme === a.programme) === i,
      )
      .slice(0, 10)
      .map((a) => ({
        user_id: user.id,
        ref: a.ref,
        programme: a.programme,
        stage: 0,
        submitted: clip(a.submitted, 40),
        summary: clip(a.summary, 300),
        sms: a.sms
          ? { sent: Boolean(a.sms.sent), text: clip(a.sms.text, 320) }
          : null,
      }));
    if (fresh.length) {
      const { error } = await sb.from("applications").insert(fresh);
      if (error) return json({ error: "Could not save the application." }, 400);
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
  let v = value ?? { learned: [], checkins: [] }[kind] ?? null;
  if (kind === "learned")
    v = (Array.isArray(v) ? v : [])
      .map(Number)
      .filter(Number.isInteger)
      .slice(0, 100);
  if (kind === "checkins" && !Array.isArray(v)) v = [];
  const { error } = await sb.from("portal_state").upsert({
    user_id: user.id,
    [column]: v,
    updated_at: new Date().toISOString(),
  });
  if (error) return json({ error: "Could not save." }, 400);
  return json({ ok: true });
}

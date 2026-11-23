import {
  allow,
  clientIp,
  connected,
  db,
  json,
  refOk,
  tooMany,
} from "@/lib/server";

// Public status lookup by reference number only. A phone number would let anyone
// check whether a person applied, so phone lookups stay on the applicant's own device.
export async function GET(req) {
  if (!connected) return json({ backend: "local", matches: [] });
  const ref = String(new URL(req.url).searchParams.get("ref") || "")
    .trim()
    .toUpperCase();
  if (!refOk(ref)) return json({ backend: "supabase", matches: [] });
  if (!(await allow(`status:${clientIp(req)}`, 30, 600))) return tooMany();
  const sb = db();
  const { data: app } = await sb
    .from("applications")
    .select("ref, programme, submitted, stage, user_id")
    .eq("ref", ref)
    .maybeSingle();
  if (!app) return json({ backend: "supabase", matches: [] });
  const { data: p } = await sb
    .from("profiles")
    .select("name")
    .eq("id", app.user_id)
    .maybeSingle();
  return json({
    backend: "supabase",
    matches: [
      {
        app: {
          ref: app.ref,
          programme: app.programme,
          submitted: app.submitted,
          stage: app.stage,
        },
        owner: (p?.name || "").split(" ")[0],
      },
    ],
  });
}

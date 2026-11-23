import {
  adminEmail,
  connected,
  currentUser,
  db,
  json,
  sameOrigin,
  today,
} from "@/lib/server";
import { scoreCriteria } from "@/lib/content";

async function guard() {
  if (!connected)
    return {
      fail: json(
        {
          error: "The database is not connected yet.",
          reason: "not_connected",
        },
        503,
      ),
    };
  const user = await currentUser();
  if (!user)
    return {
      fail: json({ error: "Sign in first.", reason: "signed_out" }, 401),
    };
  const ok =
    adminEmail() &&
    user.email?.toLowerCase() === adminEmail() &&
    user.email_confirmed_at;
  if (!ok)
    return {
      fail: json({ error: "Not the Master Admin.", reason: "forbidden" }, 403),
    };
  return { user };
}

const NEWS_FIELDS = [
  "title",
  "dek",
  "body",
  "tag",
  "outlet",
  "url",
  "published_on",
  "published",
];

export async function GET() {
  const { fail } = await guard();
  if (fail) return fail;
  const sb = db();
  const [
    { data: apps },
    { data: people },
    { data: states },
    { data: news },
    { data: docs },
  ] = await Promise.all([
    sb
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false }),
    sb.from("profiles").select("*").order("created_at", { ascending: false }),
    sb.from("portal_state").select("user_id, mentor").not("mentor", "is", null),
    sb.from("news").select("*").order("published_on", { ascending: false }),
    sb
      .from("documents")
      .select("id, doc, file_name, size, application_ref")
      .not("application_ref", "is", null),
  ]);
  const docsByRef = {};
  for (const d of docs ?? [])
    (docsByRef[d.application_ref] ??= []).push({
      id: d.id,
      doc: d.doc,
      name: d.file_name,
      size: d.size,
    });
  const byId = Object.fromEntries((people ?? []).map((p) => [p.id, p]));
  return json({
    applications: (apps ?? []).map((a) => {
      const p = byId[a.user_id] ?? {};
      return {
        ref: a.ref,
        programme: a.programme,
        stage: a.stage,
        summary: a.summary,
        submitted: a.submitted,
        scores: a.scores ?? {},
        score: a.score,
        note: a.review_note ?? "",
        documents: docsByRef[a.ref] ?? [],
        created_at: a.created_at,
        name: p.name,
        phone: p.phone,
        ward: p.ward,
        lga: p.lga,
        community: p.community,
      };
    }),
    people: (people ?? []).map((p) => ({
      ...p,
      joined: today(new Date(p.created_at)),
    })),
    mentors: (states ?? []).map((s) => {
      const p = byId[s.user_id] ?? {};
      return { ...s.mentor, name: p.name, phone: p.phone, ward: p.ward };
    }),
    news: news ?? [],
  });
}

export async function POST(req) {
  if (!sameOrigin(req))
    return json({ ok: false, error: "Request refused." }, 403);
  const { fail } = await guard();
  if (fail) return fail;
  const body = await req.json().catch(() => ({}));
  const sb = db();

  if (body.action === "score") {
    const scores = {};
    for (const c of scoreCriteria)
      scores[c.key] = Math.max(
        0,
        Math.min(5, Math.round(Number(body.scores?.[c.key]) || 0)),
      );
    const score = Object.values(scores).reduce((a, b) => a + b, 0);
    const note = String(body.note ?? "").slice(0, 2000);
    const { error } = await sb
      .from("applications")
      .update({
        scores,
        score,
        review_note: note,
        updated_at: new Date().toISOString(),
      })
      .eq("ref", body.ref);
    if (error) return json({ ok: false, error: error.message }, 400);
    return json({ ok: true, scores, score, note });
  }

  if (body.action === "stage") {
    const stage = Number(body.stage);
    if (!(stage >= 0 && stage <= 4))
      return json({ ok: false, error: "Stage must be 0 to 4." }, 400);
    const { error } = await sb
      .from("applications")
      .update({ stage, updated_at: new Date().toISOString() })
      .eq("ref", body.ref);
    if (error) return json({ ok: false, error: error.message }, 400);
    return json({ ok: true });
  }

  if (body.action === "news_save") {
    const post = Object.fromEntries(
      NEWS_FIELDS.filter((k) => body.post?.[k] !== undefined).map((k) => [
        k,
        body.post[k],
      ]),
    );
    if (!post.title?.trim())
      return json({ ok: false, error: "Give the post a title." }, 400);
    if (post.url && !/^https:\/\/\S+$/i.test(post.url))
      return json(
        { ok: false, error: "The link must start with https://" },
        400,
      );
    post.updated_at = new Date().toISOString();
    const q = body.id
      ? sb.from("news").update(post).eq("id", body.id)
      : sb.from("news").insert(post);
    const { data, error } = await q.select().single();
    if (error) return json({ ok: false, error: error.message }, 400);
    return json({ ok: true, post: data });
  }

  if (body.action === "news_delete") {
    const { error } = await sb.from("news").delete().eq("id", body.id);
    if (error) return json({ ok: false, error: error.message }, 400);
    return json({ ok: true });
  }

  return json({ ok: false, error: "Unknown action." }, 400);
}

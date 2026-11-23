import { randomUUID } from "node:crypto";
import {
  adminEmail,
  allow,
  connected,
  currentUser,
  db,
  json,
  sameOrigin,
  tooMany,
} from "@/lib/server";
import { programmes } from "@/lib/content";

const BUCKET = "documents";
const MAX_BYTES = 5 * 1024 * 1024;
const TYPES = {
  "application/pdf": "pdf",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// The first bytes of each allowed format. A file renamed to .pdf or .jpg fails this check.
const SIGNATURES = {
  "application/pdf": [0x25, 0x50, 0x44, 0x46], // %PDF
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
};
const matches = (bytes, sig) => sig.every((b, i) => bytes[i] === b);

const docNames = (programme) =>
  new Set(
    (programmes.find((p) => p.id === programme)?.documents ?? []).map(
      (d) => d.name,
    ),
  );

const isAdmin = (user) =>
  Boolean(
    adminEmail() &&
    user?.email?.toLowerCase() === adminEmail() &&
    user.email_confirmed_at,
  );

const shape = (d) => ({
  id: d.id,
  programme: d.programme,
  doc: d.doc,
  name: d.file_name,
  size: d.size,
  ref: d.application_ref,
});

/**
 * GET              the signed-in applicant's own documents
 * GET ?id=<uuid>   a 60-second download link: the owner, or the Master Admin
 */
export async function GET(req) {
  if (!connected) return json({ error: "not_connected" }, 503);
  const user = await currentUser();
  if (!user) return json({ error: "signed_out" }, 401);
  const sb = db();
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    const { data } = await sb
      .from("documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at");
    return json({ documents: (data ?? []).map(shape) });
  }

  const { data: d } = await sb
    .from("documents")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!d || (d.user_id !== user.id && !isAdmin(user)))
    return json({ error: "Not found." }, 404);
  const { data: link, error } = await sb.storage
    .from(BUCKET)
    .createSignedUrl(d.path, 60, { download: d.file_name });
  if (error) return json({ error: "Could not open the file." }, 500);
  return json({ url: link.signedUrl });
}

/**
 * POST {action:"start", programme, doc, name, type, size}  -> a one-time upload URL
 * POST {action:"finish", path, programme, doc, name}        -> checks the file and records it
 */
export async function POST(req) {
  if (!connected) return json({ error: "not_connected" }, 503);
  if (!sameOrigin(req)) return json({ error: "Request refused." }, 403);
  const user = await currentUser();
  if (!user) return json({ error: "signed_out" }, 401);
  const body = await req.json().catch(() => ({}));
  const sb = db();
  const programme = String(body.programme || "");
  const doc = String(body.doc || "");
  if (!docNames(programme).has(doc))
    return json({ error: "That document is not part of this programme." }, 400);

  if (body.action === "start") {
    if (!(await allow(`upload:${user.id}`, 40, 3600)))
      return tooMany("Too many uploads. Try again in an hour.");
    const ext = TYPES[body.type];
    if (!ext) return json({ error: "Choose a PDF, JPG or PNG file." }, 400);
    if (!(body.size > 0 && body.size <= MAX_BYTES))
      return json({ error: "The limit is 5 MB." }, 400);
    // The applicant's ID leads the path; the file gets a random name, never the one they chose.
    const path = `${user.id}/${programme}/${randomUUID()}.${ext}`;
    const { data, error } = await sb.storage
      .from(BUCKET)
      .createSignedUploadUrl(path);
    if (error)
      return json({ error: "Could not start the upload. Try again." }, 500);
    return json({ path, url: data.signedUrl });
  }

  if (body.action === "finish") {
    const path = String(body.path || "");
    if (!path.startsWith(`${user.id}/${programme}/`))
      return json({ error: "Upload not found." }, 400);
    const { data: file, error } = await sb.storage.from(BUCKET).download(path);
    if (error || !file)
      return json({ error: "The upload did not arrive. Try again." }, 400);
    const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    const mime = Object.keys(SIGNATURES).find((t) =>
      matches(bytes, SIGNATURES[t]),
    );
    if (
      !mime ||
      file.size > MAX_BYTES ||
      TYPES[mime] !== path.split(".").pop()
    ) {
      await sb.storage.from(BUCKET).remove([path]);
      return json(
        { error: "That file is not a real PDF, JPG or PNG. Choose another." },
        400,
      );
    }

    // One file per document: a new upload replaces the earlier one, unless that was already submitted.
    const { data: old } = await sb
      .from("documents")
      .select("id, path")
      .eq("user_id", user.id)
      .eq("programme", programme)
      .eq("doc", doc)
      .is("application_ref", null);
    if (old?.length) {
      await sb.storage.from(BUCKET).remove(old.map((o) => o.path));
      await sb
        .from("documents")
        .delete()
        .in(
          "id",
          old.map((o) => o.id),
        );
    }
    const { data: row, error: insErr } = await sb
      .from("documents")
      .insert({
        user_id: user.id,
        programme,
        doc,
        path,
        mime,
        size: file.size,
        file_name: String(body.name || `${doc}.${TYPES[mime]}`).slice(0, 120),
      })
      .select()
      .single();
    if (insErr) {
      await sb.storage.from(BUCKET).remove([path]);
      return json({ error: "Could not save the file. Try again." }, 500);
    }
    return json({ ok: true, document: shape(row) });
  }

  return json({ error: "Unknown action." }, 400);
}

/** DELETE ?id=<uuid>  removes one of the applicant's files, until it has been submitted. */
export async function DELETE(req) {
  if (!connected) return json({ error: "not_connected" }, 503);
  if (!sameOrigin(req)) return json({ error: "Request refused." }, 403);
  const user = await currentUser();
  if (!user) return json({ error: "signed_out" }, 401);
  const id = new URL(req.url).searchParams.get("id");
  const sb = db();
  const { data: d } = await sb
    .from("documents")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!d) return json({ error: "Not found." }, 404);
  if (d.application_ref)
    return json(
      { error: "This file is part of a submitted application." },
      400,
    );
  await sb.storage.from(BUCKET).remove([d.path]);
  await sb.from("documents").delete().eq("id", d.id);
  return json({ ok: true });
}

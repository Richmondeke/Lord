import {
  authClient,
  connected,
  currentUser,
  db,
  json,
  localPhone,
  phoneOk,
  portalUser,
  readToken,
  adminEmail,
} from "@/lib/server";

const phoneEmail = (phone) => `${localPhone(phone)}@phone.akarachi.org`;

export async function GET() {
  if (!connected) return json({ backend: "local", user: null });
  return json({
    backend: "supabase",
    user: await portalUser(await currentUser()),
  });
}

export async function POST(req) {
  if (!connected)
    return json(
      { ok: false, message: "The database is not connected yet." },
      503,
    );
  const body = await req.json().catch(() => ({}));
  const sb = await authClient();

  if (body.action === "signout") {
    await sb.auth.signOut();
    return json({ ok: true });
  }

  if (body.action === "signin") {
    const id = String(body.identifier || "")
      .trim()
      .toLowerCase();
    let email = id.includes("@") ? id : null;
    if (!email) {
      const { data: p } = await db()
        .from("profiles")
        .select("id")
        .eq("phone", localPhone(id))
        .maybeSingle();
      if (p)
        email =
          (await db().auth.admin.getUserById(p.id)).data.user?.email ?? null;
    }
    if (!email)
      return json({
        ok: false,
        field: "phone",
        message: "No account uses this number. Check it, or create an account.",
      });
    const { data, error } = await sb.auth.signInWithPassword({
      email,
      password: String(body.password || ""),
    });
    if (error) {
      const unconfirmed = /confirm/i.test(error.message);
      return json({
        ok: false,
        field: "password",
        message: unconfirmed
          ? "Confirm your email address from the link we sent, then sign in."
          : "That password does not match. Try again.",
      });
    }
    return json({ ok: true, user: await portalUser(data.user) });
  }

  if (body.action === "signup") {
    const phone = localPhone(body.phone);
    const name = String(body.name || "").trim();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const password = String(body.password || "");
    if (name.split(/\s+/).length < 2)
      return json({
        ok: false,
        field: "name",
        message: "Enter your first name and surname.",
      });
    if (!phoneOk(phone))
      return json({
        ok: false,
        field: "phone",
        message: "Enter an 11-digit Nigerian mobile number.",
      });
    if (password.length < 8)
      return json({
        ok: false,
        field: "password",
        message: "Use at least 8 characters.",
      });
    const verified = readToken(body.sms, "session");
    if (!verified || verified.phone !== phone)
      return json({
        ok: false,
        field: "phone",
        message: "Confirm your phone number with the code first.",
      });

    const admin = db();
    const { data: taken } = await admin
      .from("profiles")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();
    if (taken)
      return json({
        ok: false,
        field: "phone",
        message: "An account already uses this phone number. Sign in instead.",
      });

    const profile = (id) => ({
      id,
      name,
      phone,
      email: email || null,
      lga: body.lga || null,
      ward: body.ward || null,
      community: String(body.community || "").trim() || null,
      phone_verified: true,
    });

    // The Master Admin address must prove it owns its inbox, so it goes through email confirmation.
    if (email && email === adminEmail()) {
      const origin = new URL(req.url).origin;
      const { data, error } = await sb.auth.signUp({
        email,
        password,
        options: {
          data: { name, phone },
          emailRedirectTo: `${origin}/portal/sign-in?confirmed=1`,
        },
      });
      if (error)
        return json({ ok: false, field: "email", message: error.message });
      if (data.user) await admin.from("profiles").upsert(profile(data.user.id));
      return json({ ok: true, confirm: true });
    }

    const { data: created, error } = await admin.auth.admin.createUser({
      email: email || phoneEmail(phone),
      password,
      email_confirm: true,
      user_metadata: { name, phone },
    });
    if (error)
      return json({
        ok: false,
        field: email ? "email" : "phone",
        message: /registered|exists/i.test(error.message)
          ? "An account already uses this email. Sign in instead."
          : error.message,
      });
    await admin.from("profiles").insert(profile(created.user.id));
    const { data } = await sb.auth.signInWithPassword({
      email: created.user.email,
      password,
    });
    return json({ ok: true, user: await portalUser(data.user) });
  }

  return json({ ok: false, message: "Unknown action." }, 400);
}

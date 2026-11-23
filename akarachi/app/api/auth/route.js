import {
  adminEmail,
  allow,
  authClient,
  clientIp,
  connected,
  currentUser,
  db,
  json,
  localPhone,
  phoneOk,
  portalUser,
  readToken,
  sameOrigin,
  tooMany,
} from "@/lib/server";

// Accounts without an email address sign in by phone; Supabase still needs an email, so they get this one.
const phoneEmail = (phone) => `${localPhone(phone)}@phone.aaklegacy.org`;

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
  if (!sameOrigin(req))
    return json({ ok: false, message: "Request refused." }, 403);
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
    if (
      !(await allow(`signin:${id}`, 10, 900)) ||
      !(await allow(`signin-ip:${clientIp(req)}`, 30, 900))
    )
      return json(
        {
          ok: false,
          field: "password",
          message: "Too many attempts. Wait 15 minutes and try again.",
        },
        429,
      );
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
    // One message for unknown accounts and wrong passwords, so the form can't be used to test which numbers are registered.
    const wrong = {
      ok: false,
      field: "password",
      message:
        "That phone number or password is not right. Check both and try again.",
    };
    if (!email) return json(wrong);
    const { data, error } = await sb.auth.signInWithPassword({
      email,
      password: String(body.password || ""),
    });
    if (error)
      return json(
        /confirm/i.test(error.message)
          ? {
              ok: false,
              field: "password",
              message:
                "Confirm your email address from the link we sent, then sign in.",
            }
          : wrong,
      );
    return json({ ok: true, user: await portalUser(data.user) });
  }

  if (body.action === "signup") {
    if (!(await allow(`signup-ip:${clientIp(req)}`, 10, 3600)))
      return tooMany();
    const phone = localPhone(body.phone);
    const name = String(body.name || "")
      .trim()
      .slice(0, 120);
    const email = String(body.email || "")
      .trim()
      .toLowerCase()
      .slice(0, 200);
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
    if (email && !/^\S+@\S+\.\S+$/.test(email))
      return json({
        ok: false,
        field: "email",
        message: "Check the email address.",
      });
    if (password.length < 8 || password.length > 72)
      return json({
        ok: false,
        field: "password",
        message: "Use 8 to 72 characters.",
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
      lga: String(body.lga || "").slice(0, 40) || null,
      ward: String(body.ward || "").slice(0, 80) || null,
      community:
        String(body.community || "")
          .trim()
          .slice(0, 80) || null,
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
          : "We could not create the account. Try again.",
      });
    const { error: pErr } = await admin
      .from("profiles")
      .insert(profile(created.user.id));
    if (pErr) {
      await admin.auth.admin.deleteUser(created.user.id);
      return json({
        ok: false,
        field: "phone",
        message: "We could not create the account. Try again.",
      });
    }
    const { data } = await sb.auth.signInWithPassword({
      email: created.user.email,
      password,
    });
    return json({ ok: true, user: await portalUser(data.user) });
  }

  return json({ ok: false, message: "Unknown action." }, 400);
}

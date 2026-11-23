import { randomInt, createHash } from "node:crypto";
import {
  allow,
  clientIp,
  connected,
  db,
  json,
  localPhone,
  phoneOk,
  readToken,
  sameOrigin,
  sendSms,
  signToken,
  tooMany,
} from "@/lib/server";

const TTL_SECONDS = 10 * 60;
const MAX_ATTEMPTS = 5;
const hash = (phone, code) =>
  createHash("sha256")
    .update(`${localPhone(phone)}:${code}`)
    .digest("hex");

export async function POST(req) {
  if (!sameOrigin(req)) return json({ error: "Request refused." }, 403);
  const body = await req.json().catch(() => ({}));
  const phone = localPhone(body.phone);
  if (!phoneOk(phone))
    return json({ error: "Enter an 11-digit Nigerian mobile number." }, 400);

  if (body.action === "send") {
    // Each text costs money and can be used to pester someone: one a minute, five an hour per number.
    if (!(await allow(`otp-min:${phone}`, 1, 60)))
      return json(
        { error: "Wait a minute before asking for another code." },
        429,
      );
    if (
      !(await allow(`otp-hour:${phone}`, 5, 3600)) ||
      !(await allow(`otp-ip:${clientIp(req)}`, 20, 3600))
    )
      return tooMany("Too many codes requested. Try again in an hour.");
    const code = String(randomInt(0, 1e6)).padStart(6, "0");
    const token = signToken(
      { kind: "otp", phone, h: hash(phone, code) },
      TTL_SECONDS,
    );
    if (connected)
      await db()
        .from("otp_codes")
        .upsert({
          phone,
          code_hash: hash(phone, code),
          attempts: 0,
          expires_at: new Date(Date.now() + TTL_SECONDS * 1000).toISOString(),
        });
    const sent = await sendSms(
      phone,
      `Your AAK Legacy Empowerment Portal code is ${code}. It expires in 10 minutes.`,
    );
    // Without an SMS provider the portal runs in demo mode and shows the code on screen.
    return json(
      sent ? { mode: "sms", token } : { mode: "demo", demoCode: code, token },
    );
  }

  if (body.action === "check") {
    const code = String(body.code || "").trim();
    const expired = {
      error: "That code has expired. Go back and ask for a new one.",
    };
    if (connected) {
      // The stored code allows five tries, so a six-digit code can't be guessed by trying them all.
      const sb = db();
      const { data: row } = await sb
        .from("otp_codes")
        .select("*")
        .eq("phone", phone)
        .maybeSingle();
      if (
        !row ||
        new Date(row.expires_at) < new Date() ||
        row.attempts >= MAX_ATTEMPTS
      )
        return json(expired, 400);
      if (row.code_hash !== hash(phone, code)) {
        await sb
          .from("otp_codes")
          .update({ attempts: row.attempts + 1 })
          .eq("phone", phone);
        const left = MAX_ATTEMPTS - row.attempts - 1;
        return json(
          {
            error: left
              ? `That code is not right. ${left} ${left === 1 ? "try" : "tries"} left.`
              : expired.error,
          },
          400,
        );
      }
      await sb.from("otp_codes").delete().eq("phone", phone);
    } else {
      const t = readToken(body.token, "otp");
      if (!t || t.phone !== phone) return json(expired, 400);
      if (t.h !== hash(phone, code))
        return json(
          { error: "That code is not right. Check it and try again." },
          400,
        );
    }
    return json({
      ok: true,
      session: signToken({ kind: "session", phone }, 60 * 60 * 24 * 30),
    });
  }

  return json({ error: "Unknown action." }, 400);
}

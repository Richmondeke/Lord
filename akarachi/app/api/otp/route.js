import { randomInt, createHash } from "node:crypto";
import {
  json,
  localPhone,
  phoneOk,
  readToken,
  sendSms,
  signToken,
} from "@/lib/server";

const hash = (phone, code) =>
  createHash("sha256")
    .update(`${localPhone(phone)}:${code}`)
    .digest("hex");

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const phone = localPhone(body.phone);
  if (!phoneOk(phone))
    return json({ error: "Enter an 11-digit Nigerian mobile number." }, 400);

  if (body.action === "send") {
    const code = String(randomInt(0, 1e6)).padStart(6, "0");
    const token = signToken(
      { kind: "otp", phone, h: hash(phone, code) },
      10 * 60,
    );
    const sent = await sendSms(
      phone,
      `Your Akarachi Empowerment Portal code is ${code}. It expires in 10 minutes.`,
    );
    // Without an SMS provider the portal runs in demo mode and shows the code on screen.
    return json(
      sent ? { mode: "sms", token } : { mode: "demo", demoCode: code, token },
    );
  }

  if (body.action === "check") {
    const t = readToken(body.token, "otp");
    if (!t || t.phone !== phone)
      return json(
        { error: "That code has expired. Go back and ask for a new one." },
        400,
      );
    if (t.h !== hash(phone, String(body.code || "").trim()))
      return json(
        { error: "That code is not right. Check it and try again." },
        400,
      );
    return json({
      ok: true,
      session: signToken({ kind: "session", phone }, 60 * 60 * 24 * 30),
    });
  }

  return json({ error: "Unknown action." }, 400);
}

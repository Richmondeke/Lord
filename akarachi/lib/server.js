import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLIC_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when the Supabase variables hold real values. Otherwise the portal runs on this device only. */
export const connected = Boolean(URL && PUBLIC_KEY && SECRET_KEY);

export const json = (body, status = 200) => Response.json(body, { status });

/** Supabase client acting as the signed-in visitor (reads and writes the auth cookies). */
export async function authClient() {
  const store = await cookies();
  return createServerClient(URL, PUBLIC_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => list.forEach(({ name, value, options }) => store.set(name, value, options)),
    },
  });
}

/** Service client. Bypasses row-level security, so it is only ever used on the server. */
export const db = () =>
  createClient(URL, SECRET_KEY, { auth: { persistSession: false, autoRefreshToken: false } });

export const localPhone = (v = "") => {
  const d = String(v).replace(/\D/g, "");
  return d.startsWith("234") ? `0${d.slice(3)}` : d;
};
export const phoneOk = (v) => /^0[789]\d{9}$/.test(localPhone(v));
export const today = (d = new Date()) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export const adminEmail = () => (process.env.ADMIN_EMAIL || "").trim().toLowerCase();

/** The signed-in auth user, or null. */
export async function currentUser() {
  if (!connected) return null;
  const sb = await authClient();
  const { data } = await sb.auth.getUser();
  return data.user ?? null;
}

/** Shape the portal's client code expects for a signed-in person. */
export async function portalUser(authUser) {
  if (!authUser) return null;
  const { data: p } = await db().from("profiles").select("*").eq("id", authUser.id).maybeSingle();
  if (!p) return null;
  return {
    id: p.id,
    name: p.name,
    phone: p.phone,
    email: p.email ?? "",
    lga: p.lga ?? "",
    ward: p.ward ?? "",
    community: p.community ?? "",
    joined: today(new Date(p.created_at)),
    sms: signToken({ kind: "session", phone: p.phone }, 60 * 60 * 24 * 30),
  };
}

// Signed, stateless tokens for phone codes and verified-phone sessions.
const tokenKey = () => process.env.OTP_SECRET || SECRET_KEY || "dev-only-secret";
const b64 = (s) => Buffer.from(s).toString("base64url");
export function signToken(payload, ttlSeconds) {
  const body = b64(JSON.stringify({ ...payload, exp: Date.now() + ttlSeconds * 1000 }));
  const sig = createHmac("sha256", tokenKey()).update(body).digest("base64url");
  return `${body}.${sig}`;
}
export function readToken(token, kind) {
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) return null;
  const want = createHmac("sha256", tokenKey()).update(body).digest("base64url");
  if (sig.length !== want.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return null;
  const data = JSON.parse(Buffer.from(body, "base64url").toString());
  if (data.exp < Date.now() || (kind && data.kind !== kind)) return null;
  return data;
}

/** Sends an SMS through Termii when TERMII_API_KEY is set. Returns true only if it was sent. */
export async function sendSms(phone, text) {
  const key = process.env.TERMII_API_KEY;
  if (!key) return false;
  const res = await fetch("https://v3.api.termii.com/api/sms/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: key,
      to: `234${localPhone(phone).slice(1)}`,
      from: process.env.TERMII_SENDER_ID || "Akarachi",
      sms: text,
      type: "plain",
      channel: process.env.TERMII_CHANNEL || "generic",
    }),
  }).catch(() => null);
  return Boolean(res?.ok);
}

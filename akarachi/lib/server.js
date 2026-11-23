import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const PUBLIC_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True when the Supabase variables hold real values. Otherwise the portal runs on this device only. */
export const connected = Boolean(SUPABASE_URL && PUBLIC_KEY && SECRET_KEY);

export const json = (body, status = 200) => Response.json(body, { status });

/** Supabase client acting as the signed-in visitor (reads and writes the auth cookies). */
export async function authClient() {
  const store = await cookies();
  return createServerClient(SUPABASE_URL, PUBLIC_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) =>
        list.forEach(({ name, value, options }) =>
          store.set(name, value, options),
        ),
    },
  });
}

/** Service client. Bypasses row-level security, so it is only ever used on the server. */
export const db = () =>
  createClient(SUPABASE_URL, SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

export const localPhone = (v = "") => {
  const d = String(v).replace(/\D/g, "");
  return d.startsWith("234") ? `0${d.slice(3)}` : d;
};
export const phoneOk = (v) => /^0[789]\d{9}$/.test(localPhone(v));
export const today = (d = new Date()) =>
  d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const adminEmail = () =>
  (process.env.ADMIN_EMAIL || "").trim().toLowerCase();

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
  const { data: p } = await db()
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .maybeSingle();
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
const tokenKey = () =>
  process.env.OTP_SECRET || SECRET_KEY || "dev-only-secret";
const b64 = (s) => Buffer.from(s).toString("base64url");
export function signToken(payload, ttlSeconds) {
  const body = b64(
    JSON.stringify({ ...payload, exp: Date.now() + ttlSeconds * 1000 }),
  );
  const sig = createHmac("sha256", tokenKey()).update(body).digest("base64url");
  return `${body}.${sig}`;
}
export function readToken(token, kind) {
  const [body, sig] = String(token || "").split(".");
  if (!body || !sig) return null;
  const want = createHmac("sha256", tokenKey())
    .update(body)
    .digest("base64url");
  if (
    sig.length !== want.length ||
    !timingSafeEqual(Buffer.from(sig), Buffer.from(want))
  )
    return null;
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

/** The caller's IP as Vercel reports it. */
export const clientIp = (req) =>
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";

/**
 * Fixed-window rate limit kept in Postgres. Returns true while the caller is
 * within `max` hits per `windowSeconds`. Without the database it allows the call.
 */
export async function allow(key, max, windowSeconds) {
  if (!connected) return true;
  const { data, error } = await db().rpc("hit_rate_limit", {
    p_key: key,
    p_max: max,
    p_window: windowSeconds,
  });
  return error ? true : data !== false;
}

export const tooMany = (
  message = "Too many attempts. Wait a few minutes and try again.",
) => json({ ok: false, error: message, message }, 429);

/**
 * Rejects state-changing requests sent from another site. Browsers send Origin
 * on cross-site POSTs; same-site requests and server-to-server calls pass.
 */
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    const o = new URL(origin).host;
    const hosts = [
      req.headers.get("x-forwarded-host"),
      req.headers.get("host"),
      new URL(req.url).host,
    ];
    return hosts.some((h) => h && h.split(",")[0].trim() === o);
  } catch {
    return false;
  }
}

/** Application references look like MBK-2026-7K4Q9X (older ones have 4 digits). */
export const refOk = (ref) =>
  /^MBK-\d{4}-[A-Z0-9]{4,8}$/.test(String(ref || ""));

"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
let r = "akarachi.accounts.v2",
  s = "akarachi.session.v2",
  i = (e, a) => `akarachi.${a}.${e}`;
function n(e, a) {
  try {
    let t = window.localStorage.getItem(e);
    return t ? JSON.parse(t) : a;
  } catch {
    return a;
  }
}
function o(e, a) {
  try {
    window.localStorage.setItem(e, JSON.stringify(a));
  } catch {}
}
function l(e) {
  try {
    window.localStorage.removeItem(e);
  } catch {}
}
async function c(e, a) {
  let t = new TextEncoder().encode(`${e}:${a}`);
  return Array.from(
    new Uint8Array(await crypto.subtle.digest("SHA-256", t)),
    (e) => e.toString(16).padStart(2, "0"),
  ).join("");
}
function h(e) {
  let a = e.replace(/\D/g, "");
  return a.startsWith("234") ? `0${a.slice(3)}` : a;
}
let d = (e) => {
    let { salt: a, hash: t, ...r } = e;
    return r;
  },
  m = () =>
    new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  u = () => n(r, []),
  p = (e, a) =>
    fetch(e, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(a),
    }),
  f = false,
  g = {};
function b(e, a, t = 0) {
  f &&
    (clearTimeout(g[e]),
    (g[e] = setTimeout(() => {
      p("/api/data", {
        kind: e,
        value: a,
      }).catch(() => {});
    }, t)));
}
let w = {
  exists: (e) => !f && u().some((a) => a.id === h(e)),
  apps: (e) => n(i(e, "apps"), []),
  saveApps: (e, a) => (o(i(e, "apps"), a), b("apps", a)),
  draft: (e) => n(i(e, "draft"), null),
  saveDraft: (e, a) => (o(i(e, "draft"), a), b("draft", a, 900)),
  clearDraft: (e) => (l(i(e, "draft")), b("draft", null)),
  learned: (e) => n(i(e, "learn"), []),
  saveLearned: (e, a) => (o(i(e, "learn"), a), b("learned", a)),
  mentor: (e) => n(i(e, "mentor"), null),
  saveMentor: (e, a) => (o(i(e, "mentor"), a), b("mentor", a)),
  checkins: (e) => n(i(e, "checkins"), []),
  saveCheckins: (e, a) => (o(i(e, "checkins"), a), b("checkins", a)),
  find(e) {
    let a = e.trim().toLowerCase();
    if (!a) return [];
    let t = h(a),
      r = [],
      s = u().map((e) => ({
        id: e.id,
        name: e.name,
        phone: e.id,
      })),
      i = n("akarachi.me", null);
    for (let e of (i &&
      s.push({
        id: i.id,
        name: i.name,
        phone: i.phone,
      }),
    s))
      for (let s of w.apps(e.id))
        (s.ref.toLowerCase() === a || (11 === t.length && e.phone === t)) &&
          r.push({
            app: s,
            owner: e.name,
          });
    return r;
  },
};
async function y(e) {
  let a = await fetch("/api/data");
  if (!a.ok) return;
  let t = await a.json();
  (o(i(e, "apps"), t.apps ?? []),
    t.draft ? o(i(e, "draft"), t.draft) : l(i(e, "draft")),
    o(i(e, "learn"), t.learned ?? []),
    t.mentor ? o(i(e, "mentor"), t.mentor) : l(i(e, "mentor")),
    o(i(e, "checkins"), t.checkins ?? []));
}
let k = createContext(null);
export function AuthProvider({ children: e }) {
  let [i, g] = useState(null),
    [b, w] = useState(false),
    [x, v] = useState("local");
  useEffect(() => {
    let e = true,
      a = () => {
        let e = n(s, null),
          a = e ? u().find((a) => a.id === e) : null;
        g(a ? d(a) : null);
      };
    (async () => {
      let t = {};
      try {
        t = await (await fetch("/api/auth")).json();
      } catch {}
      e &&
        ("supabase" === t.backend
          ? ((f = true),
            v("supabase"),
            t.user
              ? (await y(t.user.id).catch(() => {}), o("akarachi.me", t.user))
              : l("akarachi.me"),
            e && g(t.user ?? null))
          : a(),
        e && w(true));
    })();
    let t = (e) => !f && e.key === s && a();
    return (
      window.addEventListener("storage", t),
      () => {
        ((e = false), window.removeEventListener("storage", t));
      }
    );
  }, []);
  let j = useCallback(async ({ password: e, ...a }) => {
      if (f) {
        let t = await p("/api/auth", {
            action: "signup",
            ...a,
            password: e,
          }).catch(() => null),
          r = t ? await t.json().catch(() => null) : null;
        return r
          ? r.ok
            ? (r.user &&
                (o("akarachi.me", r.user),
                await y(r.user.id).catch(() => {}),
                g(r.user)),
              {
                ok: true,
                confirm: !!r.confirm || !r.user,
              })
            : {
                ok: false,
                field: r.field ?? "phone",
                message: r.message,
              }
          : {
              ok: false,
              field: "phone",
              message:
                "We could not reach the server. Check your connection and try again.",
            };
      }
      let t = h(a.phone),
        i = u();
      if (i.some((e) => e.id === t))
        return {
          ok: false,
          field: "phone",
          message:
            "An account already uses this phone number. Sign in instead.",
        };
      let n = Array.from(crypto.getRandomValues(new Uint8Array(16)), (e) =>
          e.toString(16).padStart(2, "0"),
        ).join(""),
        l = {
          ...a,
          id: t,
          phone: t,
          name: a.name.trim(),
          email: a.email.trim().toLowerCase(),
          joined: m(),
          salt: n,
          hash: await c(n, e),
        };
      return (
        o(r, [...i, l]),
        o(s, t),
        g(d(l)),
        {
          ok: true,
        }
      );
    }, []),
    N = useCallback(async (e, a) => {
      if (f) {
        let t = await p("/api/auth", {
            action: "signin",
            identifier: e,
            password: a,
          }).catch(() => null),
          r = t ? await t.json().catch(() => null) : null;
        return r
          ? r.ok
            ? (o("akarachi.me", r.user),
              await y(r.user.id).catch(() => {}),
              g(r.user),
              {
                ok: true,
              })
            : {
                ok: false,
                field: r.field ?? "password",
                message: r.message,
              }
          : {
              ok: false,
              field: "phone",
              message:
                "We could not reach the server. Check your connection and try again.",
            };
      }
      let t = e.trim().toLowerCase(),
        r = h(t),
        i = u().find((e) => e.id === r || (t.includes("@") && e.email === t));
      return i
        ? (await c(i.salt, a)) !== i.hash
          ? {
              ok: false,
              field: "password",
              message: "That password does not match. Try again.",
            }
          : (o(s, i.id),
            g(d(i)),
            {
              ok: true,
            })
        : {
            ok: false,
            field: "phone",
            message:
              "No account uses this number on this device. Check it, or create an account.",
          };
    }, []),
    S = useCallback(() => {
      (f
        ? (p("/api/auth", {
            action: "signout",
          }).catch(() => {}),
          l("akarachi.me"))
        : l(s),
        g(null));
    }, []);
  return (
    <k.Provider
      value={{
        user: i,
        ready: b,
        backend: x,
        signUp: j,
        signIn: N,
        signOut: S,
      }}
    >
      {e}
    </k.Provider>
  );
}
export const emptyDraft = {
  programme: "education",
  step: 0,
  lga: "",
  ward: "",
  community: "",
  adult: false,
  jamb: "",
  admitted: false,
  cac: false,
  idType: "NIN slip",
  a: "",
  b: "",
  item: "",
  group: "None of these",
  saved: "",
};
export { h as localPhone };
export const phoneOk = (e) => /^0[789]\d{9}$/.test(h(e));
export { w as store };
export { m as today };
export function useAuth() {
  let e = useContext(k);
  if (!e) throw Error("useAuth must be used inside AuthProvider");
  return e;
}

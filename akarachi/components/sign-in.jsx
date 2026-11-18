"use client";

import { MessageSquareText as MessageSquareTextIcon } from "lucide-react";
import { useAuth, phoneOk, store, localPhone } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useReducedMotion, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { wards } from "@/lib/content";
import Image from "next/image";
import { Field, PasswordField } from "@/components/fields";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
let CM = MessageSquareTextIcon;
async function x(e) {
  let a = await fetch("/api/otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(e),
  });
  return {
    ok: a.ok,
    data: await a.json(),
  };
}
export default function SignIn() {
  let { user: e, ready: d, backend: c, signIn: f, signUp: b } = useAuth(),
    g = useRouter(),
    j = useReducedMotion(),
    [y, k] = useState("in"),
    [v, N] = useState("details"),
    [w, C] = useState("/portal/dashboard"),
    [S, M] = useState({
      name: "",
      phone: "",
      email: "",
      lga: "",
      ward: "",
      community: "",
      password: "",
      consent: false,
      id: "",
    }),
    [z, P] = useState(""),
    [T, $] = useState(null),
    [A, D] = useState(false),
    [O, E] = useState(false),
    [I, F] = useState(null),
    [R, W] = useState(false),
    [B, G] = useState(false),
    H = useRef(null);
  (useEffect(() => {
    let e = new URLSearchParams(window.location.search),
      a = e.get("next");
    (a && a.startsWith("/portal") && C(a),
      "new" === e.get("mode") && k("up"),
      e.get("confirmed") && G(true));
  }, []),
    useEffect(() => {
      d && e && g.replace(w);
    }, [d, e, w, g]),
    useEffect(() => {
      "code" === v && H.current?.focus();
    }, [v]));
  let L = (e) => {
      (M((a) => ({
        ...a,
        ...e,
      })),
        F(null));
    },
    V = (e) => {
      (k(e), N("details"), D(false), F(null));
    },
    Y = S.name.trim().split(/\s+/).length >= 2,
    J = phoneOk(S.phone),
    U = !S.email || /^\S+@\S+\.\S+$/.test(S.email.trim()),
    K = S.password.length >= 8,
    q = !!S.lga && !!S.ward && S.community.trim().length > 1,
    _ = Y && J && U && K && q && S.consent,
    Q = S.id.trim().length > 4 && S.password.length > 0;
  async function X() {
    E(true);
    let e = await x({
      action: "send",
      phone: S.phone,
    }).catch(() => null);
    if ((E(false), !e || !e.ok))
      return F({
        field: "phone",
        message:
          e?.data.error ??
          "We could not reach the server. Check your connection and try again.",
      });
    ($({
      mode: e.data.mode ?? "sms",
      demoCode: e.data.demoCode,
      token: e.data.token,
    }),
      P(""),
      N("code"));
  }
  async function Z(e) {
    if ((e.preventDefault(), O)) return;
    if ((D(true), "in" === y)) {
      if (!Q) return;
      E(true);
      let e = await f(S.id, S.password);
      (E(false),
        e.ok ||
          F({
            field: e.field,
            message: e.message,
          }));
      return;
    }
    if ("details" === v)
      return _
        ? store.exists(S.phone)
          ? F({
              field: "phone",
              message:
                "An account already uses this phone number. Sign in instead.",
            })
          : (D(false), X())
        : undefined;
    if (6 !== z.length) return;
    E(true);
    let a = await x({
      action: "check",
      phone: S.phone,
      code: z,
      token: T?.token ?? "",
    }).catch(() => null);
    if (!a || !a.ok)
      return (
        E(false),
        F({
          field: "code",
          message: a?.data.error ?? "We could not reach the server. Try again.",
        })
      );
    let t = await b({
      name: S.name,
      phone: S.phone,
      email: S.email,
      lga: S.lga,
      ward: S.ward,
      community: S.community.trim(),
      password: S.password,
      sms: a.data.session ?? "",
    });
    return (E(false), t.ok)
      ? t.confirm
        ? W(true)
        : void fetch("/api/sms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: S.phone,
              session: a.data.session,
              template: "welcome",
            }),
          }).catch(() => {})
      : (N("details"),
        D(true),
        F({
          field: t.field,
          message: t.message,
        }));
  }
  let ee = (e, a) => (A && e ? a : undefined);
  if (R)
    return (
      <div className="wrap py-20 md:py-28">
        <div className="mx-auto max-w-[36rem] border-t-8 border-ink pt-8">
          <h1 className="text-6xl">Check your email</h1>
          <p className="mt-5 text-lg">
            {"We sent a confirmation link to "}
            <span className="font-semibold">{S.email}</span>. Open it, then come
            back and sign in. This address has admin access, so it must be
            confirmed from its own inbox first.
          </p>
          <button
            type="button"
            className="btn btn-forest mt-7"
            onClick={() => {
              (W(false), V("in"));
            }}
          >
            Go to sign in
          </button>
        </div>
      </div>
    );
  let ea = wards.filter((e) => e.lga === S.lga);
  return (
    <div className="grid min-h-[calc(100svh-6.75rem)] lg:grid-cols-[1fr_1.15fr]">
      <div className="relative hidden overflow-hidden bg-ivory text-ink lg:flex lg:flex-col">
        <div className="relative z-10 p-12 pb-0">
          <p className="display text-6xl">
            One account. Apply, learn, and find a mentor.
          </p>
          <ul className="mt-6 space-y-2 text-lg">
            <li>Register with your phone number and a code we text you.</li>
            <li>
              Leave any time. Your application waits at the step you stopped.
            </li>
            <li>Start the twelve-week learning track the day you join.</li>
          </ul>
        </div>
        <div className="relative mt-auto min-h-[26rem] flex-1">
          <Image
            src="/img/new/suit-turn.webp"
            alt=""
            fill={true}
            sizes="45vw"
            className="object-contain object-bottom grayscale"
          />
        </div>
      </div>
      <div className="flex items-start px-5 py-10 md:px-12 md:py-14">
        <div className="mx-auto w-full max-w-[30rem]">
          <div
            role="tablist"
            aria-label="Account"
            className="grid grid-cols-2 border-b-2 border-ink/15"
          >
            {["in", "up"].map((e) => (
              <button
                role="tab"
                id={`tab-${e}`}
                aria-selected={y === e}
                aria-controls="auth-panel"
                onClick={() => V(e)}
                className={`ui relative -mb-0.5 min-h-12 border-b-4 text-2xl transition-colors ${y === e ? "border-forest text-forest" : "border-transparent text-slate hover:text-ink"}`}
                key={e}
              >
                {"in" === e ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>
          <motion.form
            id="auth-panel"
            role="tabpanel"
            aria-labelledby={`tab-${y}`}
            onSubmit={Z}
            noValidate={true}
            initial={
              !j && {
                opacity: 0,
                x: 16,
              }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 space-y-5"
            key={`${y}-${v}`}
          >
            {"in" === y && (
              <>
                <h1 className="text-5xl">Welcome back</h1>
                {B && (
                  <p className="bg-mint p-4">
                    Your email is confirmed. Sign in to continue.
                  </p>
                )}
                <Field
                  label="Phone number"
                  hint="Or the email you registered with."
                  error={
                    I?.field === "phone"
                      ? I.message
                      : ee(S.id.trim().length < 5, "Enter your phone number.")
                  }
                >
                  {(e) => (
                    <input
                      {...e}
                      className="field"
                      inputMode="tel"
                      autoComplete="username"
                      value={S.id}
                      onChange={(e) =>
                        L({
                          id: e.target.value,
                        })
                      }
                    />
                  )}
                </Field>
                <Field
                  label="Password"
                  error={
                    I?.field === "password"
                      ? I.message
                      : ee(0 === S.password.length, "Enter your password.")
                  }
                >
                  {(e) => (
                    <PasswordField
                      a11y={e}
                      value={S.password}
                      onChange={(e) =>
                        L({
                          password: e,
                        })
                      }
                      autoComplete="current-password"
                    />
                  )}
                </Field>
                <button className="btn btn-forest w-full" disabled={O}>
                  {O ? "One moment" : "Sign in"}
                </button>
              </>
            )}
            {"up" === y && "details" === v && (
              <>
                <h1 className="text-5xl">Start here</h1>
                <Field
                  label="Full name"
                  hint="First name and surname, as on your ID."
                  error={
                    I?.field === "name"
                      ? I.message
                      : ee(!Y, "Enter your first name and surname.")
                  }
                >
                  {(e) => (
                    <input
                      {...e}
                      className="field"
                      autoComplete="name"
                      value={S.name}
                      onChange={(e) =>
                        L({
                          name: e.target.value,
                        })
                      }
                    />
                  )}
                </Field>
                <Field
                  label="Phone number"
                  hint="We text a six-digit code to this number, and your updates after that."
                  error={
                    I?.field === "phone"
                      ? I.message
                      : ee(
                          !J,
                          "Enter an 11-digit Nigerian mobile number, like 0803 123 4567.",
                        )
                  }
                >
                  {(e) => (
                    <input
                      {...e}
                      className="field"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={S.phone}
                      onChange={(e) =>
                        L({
                          phone: e.target.value,
                        })
                      }
                    />
                  )}
                </Field>
                <fieldset className="space-y-5 border-t border-line pt-5">
                  <legend className="ui float-left w-full pb-1 text-2xl">
                    Where you are from
                  </legend>
                  <p className="clear-both text-sm text-slate">
                    The portal serves indigenes and residents of
                    Mbaitoli/Ikeduru. Your Traditional Ruler confirms this when
                    you apply.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Local government area"
                      error={ee(!S.lga, "Choose Mbaitoli or Ikeduru.")}
                    >
                      {(e) => (
                        <select
                          {...e}
                          className="field"
                          value={S.lga}
                          onChange={(e) =>
                            L({
                              lga: e.target.value,
                              ward: "",
                            })
                          }
                        >
                          <option value="">Choose one</option>
                          <option>Mbaitoli</option>
                          <option>Ikeduru</option>
                        </select>
                      )}
                    </Field>
                    <Field
                      label="Ward"
                      error={ee(!!S.lga && !S.ward, "Choose your ward.")}
                    >
                      {(e) => (
                        <select
                          {...e}
                          className="field"
                          value={S.ward}
                          disabled={!S.lga}
                          onChange={(e) =>
                            L({
                              ward: e.target.value,
                            })
                          }
                        >
                          <option value="">
                            {S.lga ? "Choose one" : "Choose your LGA first"}
                          </option>
                          {ea.map((e) => (
                            <option key={e.name}>{e.name}</option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>
                  <Field
                    label="Autonomous community"
                    error={ee(
                      S.community.trim().length < 2,
                      "Enter your community.",
                    )}
                  >
                    {(e) => (
                      <input
                        {...e}
                        className="field"
                        value={S.community}
                        onChange={(e) =>
                          L({
                            community: e.target.value,
                          })
                        }
                      />
                    )}
                  </Field>
                </fieldset>
                <Field
                  label="Password"
                  hint="At least 8 characters."
                  error={ee(!K, "Use at least 8 characters.")}
                >
                  {(e) => (
                    <PasswordField
                      a11y={e}
                      value={S.password}
                      onChange={(e) =>
                        L({
                          password: e,
                        })
                      }
                      autoComplete="new-password"
                    />
                  )}
                </Field>
                <Field
                  label="Email (optional)"
                  error={
                    I?.field === "email"
                      ? I.message
                      : ee(
                          !U,
                          "Check the email address. It should look like name@example.com.",
                        )
                  }
                >
                  {(e) => (
                    <input
                      {...e}
                      className="field"
                      type="email"
                      autoComplete="email"
                      value={S.email}
                      onChange={(e) =>
                        L({
                          email: e.target.value,
                        })
                      }
                    />
                  )}
                </Field>
                <div>
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 shrink-0 accent-[#14573f]"
                      checked={S.consent}
                      onChange={(e) =>
                        L({
                          consent: e.target.checked,
                        })
                      }
                    />
                    <span className="text-[0.9375rem]">
                      I understand the constituency office will use these
                      details to process my application and text me about it,
                      and I accept the terms.
                    </span>
                  </label>
                  {A && !S.consent && (
                    <p className="mt-1.5 text-sm font-semibold text-brick">
                      Tick the box to continue.
                    </p>
                  )}
                </div>
                <button className="btn btn-forest w-full" disabled={O}>
                  {O ? "Sending your code" : "Text me a code"}
                </button>
              </>
            )}
            {"up" === y && "code" === v && (
              <>
                <button
                  type="button"
                  className="go !text-lg text-slate"
                  onClick={() => N("details")}
                >
                  <ArrowLeft size={18} aria-hidden={true} />{" "}
                  <span className="go-under">Change my details</span>
                </button>
                <h1 className="text-5xl">Enter your code</h1>
                <p>
                  {T?.mode === "demo"
                    ? "A code would be texted to"
                    : "We texted a six-digit code to"}{" "}
                  <span className="font-semibold tabular-nums">
                    {localPhone(S.phone)}
                  </span>
                  .
                </p>
                {T?.mode === "demo" && (
                  <div className="flex gap-3 border border-ink bg-ivory p-4">
                    <CM className="shrink-0 text-forest" aria-hidden={true} />
                    <p>
                      <span className="font-semibold">
                        Demo mode: SMS is not connected yet.
                      </span>
                      {" Your code is"}{" "}
                      <span className="display text-3xl tabular-nums tracking-wider">
                        {T.demoCode}
                      </span>
                    </p>
                  </div>
                )}
                <Field
                  label="Six-digit code"
                  error={
                    I?.field === "code"
                      ? I.message
                      : ee(6 !== z.length, "Enter all six digits.")
                  }
                >
                  {(e) => (
                    <input
                      {...e}
                      ref={H}
                      className="field display !min-h-16 text-center !text-4xl tabular-nums tracking-[0.4em]"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={z}
                      onChange={(e) => {
                        (P(e.target.value.replace(/\D/g, "")), F(null));
                      }}
                    />
                  )}
                </Field>
                <button className="btn btn-forest w-full" disabled={O}>
                  {O ? "Checking" : "Confirm and create account"}
                </button>
                <p className="text-[0.9375rem] text-slate">
                  No code?{" "}
                  <button
                    type="button"
                    className="link"
                    onClick={X}
                    disabled={O}
                  >
                    Send a new one
                  </button>
                </p>
              </>
            )}
            {"details" === v && (
              <p className="text-[0.9375rem] text-slate">
                {"in" === y ? "No account yet? " : "Already registered? "}
                <button
                  type="button"
                  className="link"
                  onClick={() => V("in" === y ? "up" : "in")}
                >
                  {"in" === y ? "Create one" : "Sign in"}
                </button>
                {". Or "}
                <Link href="/portal/status" className="link">
                  check a reference number
                </Link>
                .
              </p>
            )}
            {"local" === c && (
              <p className="border-t border-line pt-4 text-sm text-slate">
                Demo mode: accounts are kept in this browser only until the
                database is connected.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
}

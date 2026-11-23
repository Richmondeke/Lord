"use client";

import {
  CircleExclamationPoint as CircleExclamationPointIcon,
  CircleCheck as CircleCheckIcon,
  CloudCheck as CloudCheckIcon,
} from "lucide-react";
import { useAuth, emptyDraft, store, today } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useReducedMotion, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  programmes,
  wards,
  equipmentItems,
  priorityGroups,
} from "@/lib/content";
import Link from "next/link";
import { Check } from "lucide-react";
import { Field, FileField } from "@/components/fields";
let CC = CircleExclamationPointIcon;
let CH = CircleCheckIcon;
let CU = CloudCheckIcon;
let b = [
    "Check you qualify",
    "Identification",
    "Your request",
    "Documents",
    "Review and submit",
  ],
  y = [
    "NIN slip",
    "Voter's card",
    "Driver's licence",
    "International passport",
  ];
export default function ApplyForm() {
  let { user: e, ready: o } = useAuth(),
    d = useRouter(),
    m = useReducedMotion(),
    [p, j] = useState(emptyDraft),
    [v, N] = useState(""),
    [k, w] = useState({}),
    [C, M] = useState(false),
    [S, T] = useState(false),
    [$, D] = useState(false),
    [z, I] = useState([]),
    [A, F] = useState(false),
    E = useRef(null);
  if (
    (useEffect(() => {
      if (!o || !e) return;
      let a = new URLSearchParams(window.location.search).get("programme"),
        t = store.draft(e.id);
      if (t && (!a || a === t.programme))
        (j({
          ...emptyDraft,
          ...t,
          step: Math.min(t.step, 3),
        }),
          D(t.step > 0 || !!t.lga));
      else {
        let t =
          a && programmes.some((e) => e.id === a) ? a : emptyDraft.programme;
        j({
          ...emptyDraft,
          programme: t,
          lga: e.lga,
          ward: e.ward,
          community: e.community,
        });
      }
      (fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.name,
        }),
      })
        .then((e) =>
          e.ok
            ? e.json()
            : {
                matches: [],
              },
        )
        .then((e) => I(e.matches ?? []))
        .catch(() => {}),
        T(true));
    }, [o, e]),
    useEffect(() => {
      S && e && store.saveDraft(e.id, p);
    }, [p, S, e]),
    !o)
  )
    return <div className="wrap py-24" aria-busy="true" />;
  if (!e)
    return (
      <div className="wrap py-20 md:py-28">
        <div className="mx-auto max-w-[36rem] border-t-8 border-ink pt-8">
          <h1 className="text-6xl">Sign in to apply</h1>
          <p className="mt-5 text-lg">
            An account keeps your answers safe between visits and lets you
            follow your application after you submit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/portal/sign-in?mode=new&next=/portal/apply"
              className="btn btn-forest"
            >
              Create account
            </Link>
            <Link
              href="/portal/sign-in?next=/portal/apply"
              className="btn btn-line"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  let P = programmes.find((e) => e.id === p.programme) ?? programmes[0],
    B = "education" !== P.id,
    U = (e) =>
      j((a) => ({
        ...a,
        ...e,
        saved: today(),
      })),
    W = wards.filter((e) => e.lga === p.lga),
    q = Number(p.jamb),
    O = [
      {
        ok: !!p.lga && !!p.ward,
        fail: "Choose your local government area and ward.",
      },
      ...(B
        ? [
            {
              ok: p.adult,
              fail: "You must be 18 or older for business support.",
            },
          ]
        : [
            {
              ok: "" !== p.jamb && q >= 200 && q <= 400,
              fail:
                "" === p.jamb
                  ? "Enter your UTME score."
                  : q > 400
                    ? "UTME scores run from 0 to 400. Check the number."
                    : "Education support needs a UTME score of 200 or above.",
            },
            {
              ok: p.admitted,
              fail: "You need an admission to a Federal or State tertiary institution.",
            },
          ]),
      ...("growth" === P.id
        ? [
            {
              ok: p.cac,
              fail: "Growth support needs a CAC-registered business. Without one, apply for Start-Up Support instead.",
            },
          ]
        : []),
    ],
    R = O.every((e) => e.ok),
    L = !!p.lga || "" !== p.jamb || p.adult,
    G = "NIN slip" === p.idType ? /^\d{11}$/.test(v) : v.trim().length >= 6,
    H = P.documents
      .filter((e) => !e.optional)
      .map((e) => e.name)
      .every((e) => {
        let a = k[e];
        return a && "name" in a;
      }),
    J = [
      R && p.community.trim().length > 1,
      G,
      p.a.trim().length > 9 && p.b.trim().length > 9 && (!B || !!p.item),
      H,
      true,
    ][p.step];
  function Y(e) {
    (M(false),
      j((a) => ({
        ...a,
        step: e,
      })),
      requestAnimationFrame(() => E.current?.focus()));
  }
  async function K() {
    if (!J) return M(true);
    if (p.step < 4) return Y(p.step + 1);
    if (A || store.apps(e.id).some((x) => x.programme === P.id)) return;
    F(true);
    let a = {
      ref: `MBK-2026-${Array.from(crypto.getRandomValues(new Uint8Array(6)), (n) => "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"[n % 32]).join("")}`,
      programme: P.id,
      submitted: today(),
      stage: 0,
      summary: B
        ? `${p.item}, ${p.community}`
        : `UTME ${p.jamb}, ${p.community}`,
    };
    try {
      let t = await fetch("/api/sms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: e.phone,
            session: e.sms,
            template: "submitted",
            ref: a.ref,
            programme: P.name,
          }),
        }),
        s = await t.json();
      s.preview &&
        (a.sms = {
          sent: !!s.sent,
          text: s.preview,
        });
    } catch {}
    (store.saveApps(e.id, [a, ...store.apps(e.id)]),
      store.clearDraft(e.id),
      d.push(`/portal/dashboard?new=${a.ref}`));
  }
  let Q = (e, a) => (C && e ? a : undefined);
  // The rules allow one application per programme.
  let already = store.apps(e.id).find((x) => x.programme === P.id);
  return (
    <div className="wrap py-10 md:py-16">
      <div className="mx-auto max-w-[48rem]">
        {already && (
          <div
            className="mb-8 border-l-4 border-forest bg-mint p-5"
            role="status"
          >
            <p className="font-semibold">
              You have already applied for {P.name} (reference {already.ref}).
            </p>
            <p className="mt-1">
              Each programme takes one application per person. You can follow it
              from your{" "}
              <Link href="/portal/dashboard" className="link">
                dashboard
              </Link>
              , or choose a different programme below.
            </p>
          </div>
        )}
        <p className="ui text-xl text-slate">
          {P.name}
          {p.saved && (
            <span className="ml-3 inline-flex items-center gap-1.5 text-emerald">
              <CU size={18} aria-hidden={true} />
              {" Saved to your account"}
            </span>
          )}
        </p>
        <ol className="mt-4 flex gap-1.5" aria-label="Application progress">
          {b.map((e, t) => (
            <li
              className="flex-1"
              aria-current={t === p.step ? "step" : undefined}
              key={e}
            >
              <span className="block h-2 bg-sand">
                <motion.span
                  className={`block h-full origin-left ${t === p.step ? "bg-ink" : "bg-forest"}`}
                  initial={false}
                  animate={{
                    scaleX: +(t <= p.step),
                  }}
                  transition={
                    m
                      ? {
                          duration: 0,
                        }
                      : {
                          duration: 0.6,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                />
              </span>
              <span
                className={`ui mt-2 hidden text-lg sm:block ${t === p.step ? "" : "text-slate"}`}
              >
                {t < p.step && (
                  <Check
                    size={15}
                    className="mb-0.5 mr-1 inline"
                    aria-hidden={true}
                    strokeWidth={3}
                  />
                )}
                {e}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-8 border-t-8 border-ink pt-7">
          <p className="ui text-xl text-slate">
            {"Step "}
            {p.step + 1}
            {" of "}
            {b.length}
          </p>
          <h1 ref={E} tabIndex={-1} className="mt-1 text-6xl outline-none">
            {b[p.step]}
          </h1>
          {$ && (
            <p className="mt-5 bg-mint p-4">
              {"Welcome back, "}
              {e.name.split(" ")[0]}. We kept your answers from last time.{" "}
              <button
                type="button"
                className="link"
                onClick={() => {
                  (j({
                    ...emptyDraft,
                    programme: p.programme,
                    lga: e.lga,
                    ward: e.ward,
                    community: e.community,
                  }),
                    N(""),
                    w({}),
                    D(false));
                }}
              >
                Start again
              </button>
            </p>
          )}
          <motion.div
            initial={
              !m && {
                opacity: 0,
                x: 24,
              }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-8 space-y-6"
            key={p.step}
          >
            {0 === p.step && (
              <>
                <Field label="Programme">
                  {(e) => (
                    <select
                      {...e}
                      className="field"
                      value={p.programme}
                      onChange={(e) =>
                        U({
                          programme: e.target.value,
                        })
                      }
                    >
                      {programmes.map((e) => (
                        <option value={e.id} key={e.id}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  )}
                </Field>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Local government area"
                    error={Q(!p.lga, "Choose Mbaitoli or Ikeduru.")}
                  >
                    {(e) => (
                      <select
                        {...e}
                        className="field"
                        value={p.lga}
                        onChange={(e) =>
                          U({
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
                    error={Q(!!p.lga && !p.ward, "Choose your ward.")}
                  >
                    {(e) => (
                      <select
                        {...e}
                        className="field"
                        value={p.ward}
                        disabled={!p.lga}
                        onChange={(e) =>
                          U({
                            ward: e.target.value,
                          })
                        }
                      >
                        <option value="">
                          {p.lga ? "Choose one" : "Choose your LGA first"}
                        </option>
                        {W.map((e) => (
                          <option key={e.name}>{e.name}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                </div>
                <Field
                  label="Autonomous community"
                  hint="The community your Traditional Ruler presides over."
                  error={Q(
                    p.community.trim().length < 2,
                    "Enter your community.",
                  )}
                >
                  {(e) => (
                    <input
                      {...e}
                      className="field"
                      value={p.community}
                      onChange={(e) =>
                        U({
                          community: e.target.value,
                        })
                      }
                    />
                  )}
                </Field>
                {B ? (
                  <label className="flex min-h-11 items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-[#14573f]"
                      checked={p.adult}
                      onChange={(e) =>
                        U({
                          adult: e.target.checked,
                        })
                      }
                    />
                    I am 18 or older
                  </label>
                ) : (
                  <>
                    <Field
                      label="UTME (JAMB) score"
                      hint="Out of 400. Education support starts at 200."
                    >
                      {(e) => (
                        <input
                          {...e}
                          className="field max-w-[10rem] tabular-nums"
                          inputMode="numeric"
                          maxLength={3}
                          value={p.jamb}
                          onChange={(e) =>
                            U({
                              jamb: e.target.value.replace(/\D/g, ""),
                            })
                          }
                        />
                      )}
                    </Field>
                    <label className="flex min-h-11 items-center gap-3">
                      <input
                        type="checkbox"
                        className="h-5 w-5 accent-[#14573f]"
                        checked={p.admitted}
                        onChange={(e) =>
                          U({
                            admitted: e.target.checked,
                          })
                        }
                      />
                      I have admission to a Federal or State tertiary
                      institution
                    </label>
                  </>
                )}
                {"growth" === P.id && (
                  <label className="flex min-h-11 items-center gap-3">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-[#14573f]"
                      checked={p.cac}
                      onChange={(e) =>
                        U({
                          cac: e.target.checked,
                        })
                      }
                    />
                    My business is registered with the Corporate Affairs
                    Commission
                  </label>
                )}
                {L && (
                  <div
                    role="status"
                    className={`flex gap-3 p-4 ${R ? "bg-mint" : "bg-sand"}`}
                  >
                    {R ? (
                      <CH
                        className="shrink-0 text-emerald"
                        aria-hidden={true}
                      />
                    ) : (
                      <CC className="shrink-0 text-ink" aria-hidden={true} />
                    )}
                    <p>
                      {R
                        ? `You meet the conditions for ${P.name}. ${p.ward} ward, ${p.lga}.`
                        : O.find((e) => !e.ok).fail}
                    </p>
                  </div>
                )}
                {z.length > 0 && (
                  <div className="border-l-4 border-forest bg-ivory p-4 text-[0.9375rem]">
                    <p className="font-semibold">
                      {"A "}
                      {e.name}
                      {" is already on the office registers"}
                    </p>
                    <ul className="mt-1">
                      {z.map((e, t) => (
                        <li key={t}>
                          {e.programme}
                          {", "}
                          {e.year}
                          {": "}
                          {e.place}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 text-slate">
                      {p.ward && z.every((e) => e.ward && e.ward !== p.ward)
                        ? "The ward on record differs from the one above. The team will ask about this at verification."
                        : "If that is you, it supports your application. The team confirms it at verification."}
                    </p>
                  </div>
                )}
              </>
            )}
            {1 === p.step && (
              <>
                <dl className="grid gap-x-8 gap-y-3 bg-ivory p-5 sm:grid-cols-3">
                  {[
                    ["Name", e.name],
                    ["Phone", e.phone],
                    ["Email", e.email || "Not given"],
                  ].map(([e, t]) => (
                    <div key={e}>
                      <dt className="text-sm text-slate">{e}</dt>
                      <dd className="break-words font-semibold">{t}</dd>
                    </div>
                  ))}
                </dl>
                <p className="-mt-2 text-sm text-slate">
                  From your account. The office will contact you on these.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Means of identification">
                    {(e) => (
                      <select
                        {...e}
                        className="field"
                        value={p.idType}
                        onChange={(e) =>
                          U({
                            idType: e.target.value,
                          })
                        }
                      >
                        {y.map((e) => (
                          <option key={e}>{e}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <Field
                    label="ID number"
                    hint="Checked for format only. We do not store your ID number."
                    error={Q(
                      !G,
                      "NIN slip" === p.idType
                        ? "Enter all 11 digits of your NIN."
                        : "Enter the number printed on your ID.",
                    )}
                  >
                    {(e) => (
                      <input
                        {...e}
                        className="field tabular-nums"
                        autoComplete="off"
                        value={v}
                        onChange={(e) =>
                          N(
                            "NIN slip" === p.idType
                              ? e.target.value.replace(/\D/g, "").slice(0, 11)
                              : e.target.value,
                          )
                        }
                      />
                    )}
                  </Field>
                </div>
              </>
            )}
            {2 === p.step && (
              <>
                <Field
                  label={
                    B
                      ? "growth" === P.id
                        ? "What does your business do, and who buys from you?"
                        : "What business do you want to start?"
                      : "Which institution admitted you, and for what course?"
                  }
                  error={Q(
                    p.a.trim().length < 10,
                    "Add a sentence or two so the team can understand.",
                  )}
                >
                  {(e) => (
                    <textarea
                      {...e}
                      rows={3}
                      className="field"
                      value={p.a}
                      onChange={(e) =>
                        U({
                          a: e.target.value,
                        })
                      }
                    />
                  )}
                </Field>
                {B && (
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      label="What support would help most?"
                      error={Q(!p.item, "Choose one.")}
                    >
                      {(e) => (
                        <select
                          {...e}
                          className="field"
                          value={p.item}
                          onChange={(e) =>
                            U({
                              item: e.target.value,
                            })
                          }
                        >
                          <option value="">Choose one</option>
                          {equipmentItems.map((e) => (
                            <option key={e}>{e}</option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field
                      label="Do any of these describe you?"
                      hint="These groups are considered first."
                    >
                      {(e) => (
                        <select
                          {...e}
                          className="field"
                          value={p.group}
                          onChange={(e) =>
                            U({
                              group: e.target.value,
                            })
                          }
                        >
                          {priorityGroups.map((e) => (
                            <option key={e}>{e}</option>
                          ))}
                        </select>
                      )}
                    </Field>
                  </div>
                )}
                <Field
                  label={
                    B
                      ? "How will it improve your livelihood?"
                      : "What does this support make possible for you?"
                  }
                  hint={
                    B
                      ? "Be specific: what you will produce, sell or carry, and for whom."
                      : "For example, the fees it covers and what you plan to do with the degree."
                  }
                  error={Q(
                    p.b.trim().length < 10,
                    "Add a sentence or two so the team can understand.",
                  )}
                >
                  {(e) => (
                    <textarea
                      {...e}
                      rows={4}
                      className="field"
                      value={p.b}
                      onChange={(e) =>
                        U({
                          b: e.target.value,
                        })
                      }
                    />
                  )}
                </Field>
              </>
            )}
            {3 === p.step && (
              <>
                <p className="text-slate">
                  Files are checked as you add them. If you leave before
                  submitting, your answers stay but you will need to attach the
                  files again.
                </p>
                {P.documents.map((e) => (
                  <FileField
                    label={e.name}
                    optional={e.optional}
                    value={k[e.name]}
                    onChange={(a) =>
                      w((t) => ({
                        ...t,
                        [e.name]: a,
                      }))
                    }
                    key={e.name}
                  />
                ))}
                {C && !H && (
                  <p role="alert" className="font-semibold text-brick">
                    Attach every required document to continue.
                  </p>
                )}
              </>
            )}
            {4 === p.step && (
              <>
                <dl className="border-b border-ink/20">
                  {[
                    ["Programme", P.name],
                    ["Applicant", `${e.name}, ${e.phone}`],
                    ["Community", `${p.community}, ${p.ward} ward, ${p.lga}`],
                    ...(B
                      ? [["Support requested", p.item]]
                      : [["UTME score", p.jamb]]),
                    ["Identification", p.idType],
                    [
                      "Documents",
                      `${Object.values(k).filter((e) => e && "name" in e).length} attached`,
                    ],
                  ].map(([e, t]) => (
                    <div
                      className="grid gap-1 border-t border-ink/20 py-3.5 sm:grid-cols-[12rem_1fr]"
                      key={e}
                    >
                      <dt className="text-slate">{e}</dt>
                      <dd className="font-semibold">{t}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-[0.9375rem] text-slate">
                  By submitting, you confirm these details are true and agree to
                  use any support for its stated purpose. Applying is free. No
                  payment, party membership or endorsement is ever required.
                </p>
              </>
            )}
          </motion.div>
          <div className="mt-10 flex flex-wrap justify-between gap-3">
            <button
              type="button"
              className="btn btn-line"
              disabled={0 === p.step}
              onClick={() => Y(p.step - 1)}
            >
              Back
            </button>
            <button
              type="button"
              className={`btn ${4 === p.step ? "btn-ink" : "btn-forest"}`}
              onClick={K}
            >
              {4 === p.step
                ? A
                  ? "Submitting"
                  : "Submit application"
                : "Save and continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

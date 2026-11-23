"use client";

import { RefreshCw as RefreshCwIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState, useCallback, useEffect, Fragment } from "react";
import Link from "next/link";
import { programmes, scoreCriteria, stages } from "@/lib/content";
let CI = RefreshCwIcon;
let o = (e = "") => ({
    title: "",
    dek: "",
    body: "",
    tag: "Community",
    outlet: "akarachi.org",
    url: "",
    published_on: e,
    published: true,
  }),
  d = () => new Date().toISOString().slice(0, 10),
  h = ["Applications", "People", "Mentor requests", "News"];
// The applicant's files. Each opens through a link that expires after a minute.
function DocumentList({ app }) {
  const [busy, setBusy] = useState(null);
  const needed = (
    programmes.find((p) => p.id === app.programme)?.documents ?? []
  ).filter((d) => !d.optional);
  const have = new Set((app.documents ?? []).map((d) => d.doc));
  const missing = needed.filter((d) => !have.has(d.name));
  async function open(d) {
    setBusy(d.id);
    const w = window.open("", "_blank");
    try {
      const r = await fetch(`/api/documents?id=${d.id}`);
      const { url } = await r.json();
      if (url && w) w.location.href = url;
      else w?.close();
    } catch {
      w?.close();
    }
    setBusy(null);
  }
  return (
    <div className="mt-2 text-sm">
      {(app.documents ?? []).map((d) => (
        <button
          type="button"
          key={d.id}
          onClick={() => open(d)}
          disabled={busy === d.id}
          className="mr-3 block text-left underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
        >
          {busy === d.id ? "Opening…" : d.doc}
        </button>
      ))}
      {missing.length > 0 && (
        <span className="mt-1 block text-brick">
          Missing: {missing.map((d) => d.name).join(", ")}
        </span>
      )}
    </div>
  );
}

export default function Admin() {
  let { user: e, ready: l } = useAuth(),
    [n, m] = useState(null),
    [p, x] = useState(null),
    [u, b] = useState("Applications"),
    [j, f] = useState(""),
    [g, N] = useState(null),
    [w, y] = useState(() => o()),
    [v, k] = useState(null),
    [S, C] = useState(null),
    [T, _] = useState({
      scores: {},
      note: "",
    }),
    [A, O] = useState(false),
    L = useCallback(async () => {
      try {
        let e = await fetch("/api/admin"),
          s = await e.json();
        if (!e.ok)
          return x({
            reason: s.reason ?? "error",
            message: s.error ?? "Could not load.",
          });
        (x(null), m(s));
      } catch {
        x({
          reason: "error",
          message: "We could not reach the server.",
        });
      }
    }, []);
  async function P(e) {
    N(e);
    let s = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "score",
          ref: e,
          scores: T.scores,
          note: T.note,
        }),
      }).catch(() => null),
      t = s ? await s.json().catch(() => null) : null;
    (s?.ok &&
      t?.ok &&
      (m((s) =>
        s
          ? {
              ...s,
              applications: s.applications.map((s) =>
                s.ref === e
                  ? {
                      ...s,
                      scores: t.scores,
                      score: t.score,
                      note: t.note,
                    }
                  : s,
              ),
            }
          : s,
      ),
      C(null)),
      N(null));
  }
  async function M(e, s) {
    N(e);
    let t = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "stage",
        ref: e,
        stage: s,
      }),
    }).catch(() => null);
    (t?.ok &&
      m((t) =>
        t
          ? {
              ...t,
              applications: t.applications.map((t) =>
                t.ref === e
                  ? {
                      ...t,
                      stage: s,
                    }
                  : t,
              ),
            }
          : t,
      ),
      N(null));
  }
  async function $(e) {
    if ((e.preventDefault(), w.title.trim().length < 4))
      return k({
        ok: false,
        text: "Give the post a title.",
      });
    if (w.url && !/^https:\/\//.test(w.url))
      return k({
        ok: false,
        text: "The link must start with https://",
      });
    N("news");
    let s = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "news_save",
          id: w.id,
          post: w,
        }),
      }).catch(() => null),
      t = s ? await s.json().catch(() => null) : null;
    if ((N(null), !t?.ok))
      return k({
        ok: false,
        text: t?.error ?? "Could not save the post. Try again.",
      });
    (m((e) =>
      e
        ? {
            ...e,
            news: [t.post, ...e.news.filter((e) => e.id !== t.post.id)].sort(
              (e, s) => (e.published_on < s.published_on ? 1 : -1),
            ),
          }
        : e,
    ),
      y(t.post),
      k({
        ok: true,
        text: t.post.published
          ? "Saved. It is live on the homepage."
          : "Saved as a draft. It is not on the site yet.",
      }));
  }
  async function D() {
    if (!w.id || !window.confirm(`Delete “${w.title}”? This cannot be undone.`))
      return;
    N("news");
    let e = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "news_delete",
        id: w.id,
      }),
    }).catch(() => null);
    if ((N(null), !e?.ok))
      return k({
        ok: false,
        text: "Could not delete the post.",
      });
    (m((e) =>
      e
        ? {
            ...e,
            news: e.news.filter((e) => e.id !== w.id),
          }
        : e,
    ),
      y(o(d())),
      k({
        ok: true,
        text: "Deleted.",
      }));
  }
  if (
    (useEffect(() => {
      l && L();
    }, [l, e, L]),
    useEffect(() => {
      y((e) =>
        e.published_on
          ? e
          : {
              ...e,
              published_on: d(),
            },
      );
    }, []),
    !l)
  )
    return <div className="wrap py-24" aria-busy="true" />;
  if (p)
    return (
      <div className="wrap py-20 md:py-28">
        <div className="mx-auto max-w-[38rem] border-t-8 border-ink pt-8">
          <h1 className="text-6xl">Master Admin</h1>
          <p className="mt-5 text-lg">
            {{
              not_connected:
                "The admin view reads from the database. It opens once the Supabase variables in Vercel hold real values.",
              signed_out:
                "Sign in with the Master Admin account to open this page.",
              forbidden:
                "This account is not the Master Admin. If it should be, confirm the email address from the link Supabase sent you, then sign in again.",
            }[p.reason] ?? p.message}
          </p>
          {"not_connected" !== p.reason && (
            <Link
              href="/portal/sign-in?next=/portal/admin"
              className="btn btn-forest mt-7"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    );
  if (!n) return <div className="wrap py-24" aria-busy="true" />;
  let F = j.trim().toLowerCase(),
    q = (...e) => !F || e.some((e) => e?.toLowerCase().includes(F)),
    R = n.applications.filter((e) =>
      q(e.ref, e.name, e.phone, e.ward, e.programme),
    ),
    E = A ? [...R].sort((e, s) => (s.score ?? -1) - (e.score ?? -1)) : R,
    I = n.people.filter((e) =>
      q(e.name, e.phone, e.email, e.ward, e.community),
    ),
    J = n.mentors.filter((e) => q(e.name, e.phone, e.sector, e.ward)),
    H = "border-t border-ink/15 px-3 py-3 align-top";
  return (
    <div className="bg-ivory">
      <div className="wrap py-8 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="ui text-xl text-slate">
              {"Signed in as "}
              {e?.name}
            </p>
            <h1 className="text-[clamp(3rem,6vw,5rem)]">Master Admin</h1>
          </div>
          <button type="button" className="btn btn-line" onClick={L}>
            <CI size={18} aria-hidden={true} />
            {" Refresh"}
          </button>
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-px bg-ink/15 lg:grid-cols-4">
          {[
            ["People registered", n.people.length],
            ["Applications", n.applications.length],
            [
              "Awaiting review",
              n.applications.filter((e) => e.stage < 2).length,
            ],
            ["News posts live", n.news.filter((e) => e.published).length],
          ].map(([e, t]) => (
            <div className="flex flex-col bg-white p-5" key={e}>
              <dd className="display order-1 text-6xl text-forest tabular-nums">
                {t}
              </dd>
              <dt className="order-2 text-[0.9375rem]">{e}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Admin sections"
            className="flex flex-wrap gap-2"
          >
            {h.map((e) => (
              <button
                type="button"
                aria-pressed={u === e}
                onClick={() => b(e)}
                className={`ui min-h-11 border-2 px-4 text-xl transition-colors ${u === e ? "border-ink bg-ink text-white" : "border-ink/25 bg-white hover:border-ink"}`}
                key={e}
              >
                {e}
              </button>
            ))}
          </div>
          {"News" !== u && (
            <div>
              <label htmlFor="adm-q" className="sr-only">
                Search
              </label>
              <input
                id="adm-q"
                className="field w-72 max-w-full"
                placeholder="Search name, phone, ward or reference"
                value={j}
                onChange={(e) => f(e.target.value)}
              />
            </div>
          )}
        </div>
        {"News" === u && (
          <div className="mt-5 grid gap-6 lg:grid-cols-[20rem_1fr]">
            <div className="bg-white p-4">
              <button
                type="button"
                className="btn btn-forest w-full"
                onClick={() => {
                  (y(o(d())), k(null));
                }}
              >
                New post
              </button>
              <ul className="mt-3">
                {n.news.map((e) => (
                  <li className="border-t border-ink/15" key={e.id}>
                    <button
                      type="button"
                      aria-pressed={w.id === e.id}
                      onClick={() => {
                        (y(e), k(null));
                      }}
                      className={`block w-full px-2 py-3 text-left ${w.id === e.id ? "bg-mint" : "hover:bg-ivory"}`}
                    >
                      <span className="block font-semibold leading-snug">
                        {e.title}
                      </span>
                      <span className="text-sm text-slate">
                        {e.published_on}
                        {", "}
                        {e.tag}
                        {!e.published && ", draft"}
                      </span>
                    </button>
                  </li>
                ))}
                {0 === n.news.length && (
                  <li className="border-t border-ink/15 py-3 text-[0.9375rem] text-slate">
                    No posts yet. Until the first one is published, the homepage
                    shows the stories built into the site.
                  </li>
                )}
              </ul>
            </div>
            <form onSubmit={$} className="space-y-5 bg-white p-6 md:p-8">
              <h2 className="text-4xl">{w.id ? "Edit post" : "New post"}</h2>
              <div>
                <label htmlFor="n-title" className="mb-1.5 block font-semibold">
                  Headline
                </label>
                <input
                  id="n-title"
                  className="field"
                  value={w.title}
                  maxLength={200}
                  onChange={(e) =>
                    y({
                      ...w,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="n-tag" className="mb-1.5 block font-semibold">
                    Category
                  </label>
                  <select
                    id="n-tag"
                    className="field"
                    value={w.tag}
                    onChange={(e) =>
                      y({
                        ...w,
                        tag: e.target.value,
                      })
                    }
                  >
                    {["Legislation", "Empowerment", "Community", "Awards"].map(
                      (e) => (
                        <option key={e}>{e}</option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="n-date"
                    className="mb-1.5 block font-semibold"
                  >
                    Date
                  </label>
                  <input
                    id="n-date"
                    type="date"
                    className="field"
                    value={w.published_on}
                    onChange={(e) =>
                      y({
                        ...w,
                        published_on: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label htmlFor="n-dek" className="mb-1.5 block font-semibold">
                  Summary
                </label>
                <textarea
                  id="n-dek"
                  rows={2}
                  className="field"
                  value={w.dek}
                  maxLength={400}
                  onChange={(e) =>
                    y({
                      ...w,
                      dek: e.target.value,
                    })
                  }
                />
                <p className="mt-1.5 text-sm text-slate">
                  One or two sentences. This shows on the homepage card.
                </p>
              </div>
              <div>
                <label htmlFor="n-body" className="mb-1.5 block font-semibold">
                  Story
                </label>
                <textarea
                  id="n-body"
                  rows={9}
                  className="field"
                  value={w.body}
                  onChange={(e) =>
                    y({
                      ...w,
                      body: e.target.value,
                    })
                  }
                />
                <p className="mt-1.5 text-sm text-slate">
                  Leave a blank line between paragraphs. Not needed if you link
                  to the original below.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-[1fr_14rem]">
                <div>
                  <label htmlFor="n-url" className="mb-1.5 block font-semibold">
                    Link to the original (optional)
                  </label>
                  <input
                    id="n-url"
                    className="field"
                    inputMode="url"
                    placeholder="https://"
                    value={w.url}
                    onChange={(e) =>
                      y({
                        ...w,
                        url: e.target.value.trim(),
                      })
                    }
                  />
                  <p className="mt-1.5 text-sm text-slate">
                    If set, the card opens this page instead of the story above.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="n-outlet"
                    className="mb-1.5 block font-semibold"
                  >
                    Source name
                  </label>
                  <input
                    id="n-outlet"
                    className="field"
                    value={w.outlet}
                    onChange={(e) =>
                      y({
                        ...w,
                        outlet: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <label className="flex min-h-11 items-center gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[#14573f]"
                  checked={w.published}
                  onChange={(e) =>
                    y({
                      ...w,
                      published: e.target.checked,
                    })
                  }
                />
                Show this post on the site
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <button className="btn btn-forest" disabled={"news" === g}>
                  {"news" === g
                    ? "Saving"
                    : w.published
                      ? "Save and publish"
                      : "Save draft"}
                </button>
                {w.id && (
                  <button
                    type="button"
                    className="btn btn-line"
                    disabled={"news" === g}
                    onClick={D}
                  >
                    Delete post
                  </button>
                )}
                <p
                  aria-live="polite"
                  className={`text-[0.9375rem] font-semibold ${v?.ok ? "text-forest" : "text-brick"}`}
                >
                  {v?.text}
                </p>
              </div>
            </form>
          </div>
        )}
        {"Applications" === u && (
          <label className="ui mt-5 flex min-h-11 w-fit cursor-pointer items-center gap-3 text-lg">
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#101413]"
              checked={A}
              onChange={(e) => O(e.target.checked)}
            />
            Highest score first
          </label>
        )}
        <div
          className={`mt-5 overflow-x-auto bg-white ${"News" === u ? "hidden" : ""}`}
        >
          {"Applications" === u && (
            <table className="w-full min-w-[52rem] text-left text-[0.9375rem]">
              <thead className="ui text-lg">
                <tr>
                  {[
                    "Reference",
                    "Applicant",
                    "Ward",
                    "Programme",
                    "Request",
                    "Score",
                    "Stage",
                  ].map((e) => (
                    <th className="px-3 py-3" key={e}>
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {E.map((e) => {
                  let t;
                  return (
                    <Fragment key={e.ref}>
                      <tr>
                        <td className={`${H} tabular-nums`}>
                          {e.ref}
                          <span className="block text-sm text-slate">
                            {e.submitted}
                          </span>
                        </td>
                        <td className={H}>
                          <span className="font-semibold">{e.name}</span>
                          <span className="block text-sm tabular-nums text-slate">
                            {e.phone}
                          </span>
                        </td>
                        <td className={H}>
                          {e.ward}
                          <span className="block text-sm text-slate">
                            {e.lga}
                          </span>
                        </td>
                        <td className={H}>
                          {
                            ((t = e.programme),
                            programmes.find((e) => e.id === t)?.short ?? t)
                          }
                        </td>
                        <td className={H}>
                          {e.summary}
                          <DocumentList app={e} />
                        </td>
                        <td className={H}>
                          <button
                            type="button"
                            aria-expanded={S === e.ref}
                            className="ui min-h-10 whitespace-nowrap text-lg underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                            onClick={() => {
                              if (S === e.ref) return C(null);
                              (_({
                                scores: Object.fromEntries(
                                  scoreCriteria.map((s) => [
                                    s.key,
                                    e.scores?.[s.key] ?? 0,
                                  ]),
                                ),
                                note: e.note,
                              }),
                                C(e.ref));
                            }}
                          >
                            {null === e.score ? (
                              "Score"
                            ) : (
                              <span className="tabular-nums">
                                {e.score}
                                {" / 20"}
                              </span>
                            )}
                          </button>
                        </td>
                        <td className={H}>
                          <label className="sr-only" htmlFor={`st-${e.ref}`}>
                            {"Stage for "}
                            {e.ref}
                          </label>
                          <select
                            id={`st-${e.ref}`}
                            className="field !min-h-10 !py-1.5"
                            value={e.stage}
                            disabled={g === e.ref}
                            onChange={(s) => M(e.ref, Number(s.target.value))}
                          >
                            {stages.map((e, t) => (
                              <option value={t} key={e.key}>
                                {t + 1}
                                {". "}
                                {e.label}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      {S === e.ref && (
                        <tr>
                          <td
                            colSpan={7}
                            className="border-t border-ink/10 bg-ivory px-3 py-5"
                          >
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                              {scoreCriteria.map((e) => (
                                <label className="block" key={e.key}>
                                  <span className="ui block text-lg">
                                    {e.label}
                                  </span>
                                  <span className="block min-h-10 text-sm text-slate">
                                    {e.help}
                                  </span>
                                  <select
                                    className="field mt-1.5 !min-h-10 !py-1.5"
                                    value={T.scores[e.key] ?? 0}
                                    onChange={(s) =>
                                      _({
                                        ...T,
                                        scores: {
                                          ...T.scores,
                                          [e.key]: Number(s.target.value),
                                        },
                                      })
                                    }
                                  >
                                    {[0, 1, 2, 3, 4, 5].map((e) => (
                                      <option value={e} key={e}>
                                        {e}
                                      </option>
                                    ))}
                                  </select>
                                </label>
                              ))}
                            </div>
                            <label className="mt-4 block max-w-[44rem]">
                              <span className="ui block text-lg">
                                Reviewer's note
                              </span>
                              <textarea
                                className="field mt-1.5 min-h-20"
                                maxLength={1e3}
                                value={T.note}
                                onChange={(e) =>
                                  _({
                                    ...T,
                                    note: e.target.value,
                                  })
                                }
                              />
                            </label>
                            <div className="mt-4 flex flex-wrap items-center gap-4">
                              <button
                                type="button"
                                className="btn btn-forest"
                                disabled={g === e.ref}
                                onClick={() => P(e.ref)}
                              >
                                {"Save score: "}
                                {scoreCriteria.reduce(
                                  (e, s) => e + (T.scores[s.key] ?? 0),
                                  0,
                                )}
                                {" / 20"}
                              </button>
                              <button
                                type="button"
                                className="ui min-h-11 text-lg underline decoration-ink/30 underline-offset-4"
                                onClick={() => C(null)}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
                {0 === R.length && (
                  <tr>
                    <td className={H} colSpan={7}>
                      {F
                        ? "Nothing matches that search."
                        : "No applications yet. They appear here the moment someone submits."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {"People" === u && (
            <table className="w-full min-w-[52rem] text-left text-[0.9375rem]">
              <thead className="ui text-lg">
                <tr>
                  {[
                    "Name",
                    "Phone",
                    "Email",
                    "Community and ward",
                    "Joined",
                    "Learning",
                  ].map((e) => (
                    <th className="px-3 py-3" key={e}>
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {I.map((e) => (
                  <tr key={e.id}>
                    <td className={`${H} font-semibold`}>{e.name}</td>
                    <td className={`${H} tabular-nums`}>{e.phone}</td>
                    <td className={`${H} break-all`}>
                      {e.email || "Not given"}
                    </td>
                    <td className={H}>
                      {e.community}
                      <span className="block text-sm text-slate">
                        {e.ward}
                        {" ward, "}
                        {e.lga}
                      </span>
                    </td>
                    <td className={H}>
                      {new Date(e.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className={H}>
                      {e.weeksDone}
                      {" of 12 weeks"}
                      {e.hasDraft && (
                        <span className="block text-sm text-slate">
                          Has an unfinished application
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                {0 === I.length && (
                  <tr>
                    <td className={H} colSpan={6}>
                      {F
                        ? "Nothing matches that search."
                        : "Nobody has registered yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {"Mentor requests" === u && (
            <table className="w-full min-w-[48rem] text-left text-[0.9375rem]">
              <thead className="ui text-lg">
                <tr>
                  {[
                    "Person",
                    "Sector",
                    "What they want help with",
                    "Contact by",
                    "Requested",
                  ].map((e) => (
                    <th className="px-3 py-3" key={e}>
                      {e}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {J.map((e, t) => (
                  <tr key={t}>
                    <td className={H}>
                      <span className="font-semibold">{e.name}</span>
                      <span className="block text-sm tabular-nums text-slate">
                        {e.phone}
                        {", "}
                        {e.ward}
                      </span>
                    </td>
                    <td className={H}>{e.sector}</td>
                    <td className={H}>{e.goal}</td>
                    <td className={H}>{e.channel}</td>
                    <td className={H}>{e.requested}</td>
                  </tr>
                ))}
                {0 === J.length && (
                  <tr>
                    <td className={H} colSpan={5}>
                      {F
                        ? "Nothing matches that search."
                        : "No mentor requests yet."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

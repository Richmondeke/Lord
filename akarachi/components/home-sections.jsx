"use client";

import {
  Minus as MinusIcon,
  Plus as PlusIcon,
  Zap as ZapIcon,
} from "lucide-react";
import { bills, news, wards, workAreas } from "@/lib/content";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Rise } from "@/components/motion";
let CM = MinusIcon;
let CX = PlusIcon;
let CP = ZapIcon;
let f = [0.16, 1, 0.3, 1],
  g = ["All", ...Array.from(new Set(bills.map((e) => e.theme)))],
  j = ["All", "Legislation", "Empowerment", "Community", "Awards"];
export function Bills() {
  let [e, i] = useState("All"),
    l = bills.filter((t) => "All" === e || t.theme === e);
  return (
    <div>
      <div
        role="group"
        aria-label="Filter bills by subject"
        className="flex flex-wrap gap-2"
      >
        {g.map((a) => (
          <button
            type="button"
            aria-pressed={e === a}
            onClick={() => i(a)}
            className={`ui min-h-11 border-2 px-4 text-xl transition-colors ${e === a ? "border-ink bg-ink text-white" : "border-ink/25 hover:border-ink"}`}
            key={a}
          >
            {a}
          </button>
        ))}
      </div>
      <p className="mt-4 text-[0.9375rem] text-slate" aria-live="polite">
        {l.length}
        {" of the "}
        {bills.length}
        {
          " bills matched to public records so far. Press reports put the full count at 38."
        }
      </p>
      <ul className="mt-5 border-b border-ink/20">
        {l.map((e) => (
          <motion.li
            layout="position"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
            }}
            className="grid gap-x-8 gap-y-2 border-t border-ink/20 py-6 md:grid-cols-[6.5rem_1fr_13rem]"
            key={e.title}
          >
            <p className="ui text-2xl text-slate">
              {e.id}
              <span className="block text-lg text-slate">{e.year}</span>
            </p>
            <div>
              <h3 className="text-[1.75rem] leading-[1.05]">{e.title}</h3>
              <p className="mt-2 max-w-[38rem]">{e.plain}</p>
            </div>
            <div className="md:text-right">
              <span
                className={`badge ${"First reading" === e.stage ? "badge-green" : "badge-plain"}`}
              >
                {e.stage}
              </span>
              <p className="mt-2 text-[0.9375rem] text-slate">{e.stageNote}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
export function Contact() {
  let [e, s] = useState({
      name: "",
      subject: "",
      message: "",
    }),
    i = e.name.trim().length > 1 && e.message.trim().length > 9,
    l = `mailto:info@akarachi.org?subject=${encodeURIComponent(e.subject || `Message from ${e.name}`)}&body=${encodeURIComponent(`${e.message}

${e.name}`)}`;
  return (
    <form
      className="portal space-y-4"
      onSubmit={(e) => {
        (e.preventDefault(), i && (window.location.href = l));
      }}
    >
      <div>
        <label htmlFor="c-name" className="ui mb-1.5 block text-xl">
          Your name
        </label>
        <input
          id="c-name"
          className="field"
          autoComplete="name"
          value={e.name}
          onChange={(t) =>
            s({
              ...e,
              name: t.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="c-sub" className="ui mb-1.5 block text-xl">
          Subject
        </label>
        <input
          id="c-sub"
          className="field"
          value={e.subject}
          onChange={(t) =>
            s({
              ...e,
              subject: t.target.value,
            })
          }
        />
      </div>
      <div>
        <label htmlFor="c-msg" className="ui mb-1.5 block text-xl">
          Your message
        </label>
        <textarea
          id="c-msg"
          rows={5}
          className="field"
          value={e.message}
          onChange={(t) =>
            s({
              ...e,
              message: t.target.value,
            })
          }
        />
      </div>
      <button className="btn btn-forest" disabled={!i}>
        {"Open in my email app "}
        <ArrowUpRight size={20} aria-hidden={true} />
      </button>
      <p className="text-sm text-slate">
        This opens a draft to info@akarachi.org in your own email app. Nothing
        is sent from this page.
      </p>
    </form>
  );
}
export function News() {
  let [e, i] = useState("All"),
    [l, r] = useState(news);
  useEffect(() => {
    fetch("/api/news")
      .then((e) => e.json())
      .then((e) => {
        Array.isArray(e.stories) && e.stories.length && r(e.stories);
      })
      .catch(() => {});
  }, []);
  let c = l.filter((t) => "All" === e || t.tag === e).slice(0, 6);
  return (
    <div className="grid gap-x-10 gap-y-8 lg:grid-cols-[22rem_1fr]">
      <div className="flex flex-col bg-mint p-8 lg:sticky lg:top-28 lg:self-start">
        <p className="ui text-2xl">Latest</p>
        <h2 className="mt-5 text-5xl">News from Mbaike and the House.</h2>
        <div
          role="group"
          aria-label="Filter stories"
          className="mt-8 flex flex-wrap gap-2"
        >
          {j.map((a) => (
            <button
              type="button"
              aria-pressed={e === a}
              onClick={() => i(a)}
              className={`ui min-h-10 border-2 px-3 text-lg transition-colors ${e === a ? "border-ink bg-ink text-white" : "border-ink/30 hover:border-ink"}`}
              key={a}
            >
              {a}
            </button>
          ))}
        </div>
        <a
          href="https://akarachi.org/?page_id=903"
          target="_blank"
          rel="noreferrer"
          className="go mt-10"
        >
          <span className="go-under">View all stories</span>{" "}
          <ArrowRight size={20} aria-hidden={true} />
        </a>
      </div>
      <ul className="grid sm:grid-cols-2">
        {c.map((e, a) => (
          <motion.li
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: f,
              delay: 0.04 * a,
            }}
            className="border-ink/20 py-6 max-sm:border-b sm:px-7 sm:odd:border-r sm:odd:pl-0 sm:[&:nth-child(n+3)]:border-t"
            key={e.title}
          >
            <a
              href={e.url}
              {...(e.internal
                ? {}
                : {
                    target: "_blank",
                    rel: "noreferrer",
                  })}
              className="group block"
            >
              <p className="ui text-lg text-slate">
                {e.tag} <span aria-hidden={true}>/</span> {e.date}
              </p>
              <h3 className="mt-2 text-[1.875rem] leading-[1.02] transition-colors group-hover:text-emerald">
                {e.title}
              </h3>
              <p className="mt-3 text-[0.9375rem]">{e.dek}</p>
              <span className="go mt-4 !text-lg">
                <span className="go-under">
                  {e.internal ? "Read the story" : `Read at ${e.outlet}`}
                </span>{" "}
                <ArrowUpRight size={18} aria-hidden={true} />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
export function Wards() {
  let [e, s] = useState(wards[0]),
    n = useRef(null),
    o = useInView(n, {
      once: true,
      margin: "-12% 0px",
    }),
    c = useReducedMotion(),
    d = o || c;
  return (
    <div ref={n} className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_1.45fr]">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Rise
          text="Twenty-four wards, counted"
          className="text-[clamp(2.75rem,5.5vw,5rem)]"
        />
        <p className="mt-6 max-w-[28rem] text-lg text-white/85">
          Every dot is a student registered free for the 2026 JAMB, placed in
          their ward from the office register. A bolt marks wards whose
          communities also received tools and a transformer this year.
        </p>
        <div aria-live="polite" className="mt-8 border-l-4 border-white pl-5">
          <p className="display text-5xl">{e.name}</p>
          <p className="ui mt-1 text-2xl text-white/75">
            {e.jamb}
            {" students, "}
            {e.lga}
          </p>
          <p className="mt-2 max-w-[26rem] text-white/85">
            {e.communities.length > 0
              ? `Tools and a 500KVA transformer in 2026: ${e.communities.join(", ")}.`
              : "No community from this ward appears in the 2026 equipment register supplied so far."}
          </p>
        </div>
      </div>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {["Mbaitoli", "Ikeduru"].map((a) => {
          let i = wards.filter((e) => e.lga === a);
          return (
            <div key={a}>
              <p className="ui flex items-baseline justify-between border-b-2 border-white pb-2 text-3xl">
                {a}{" "}
                <span className="text-xl text-white/65">
                  {i.reduce((e, t) => e + t.jamb, 0)}
                </span>
              </p>
              <ul>
                {i.map((a, i) => {
                  let l = e.name === a.name;
                  return (
                    <li className="border-b border-white/15" key={a.name}>
                      <button
                        type="button"
                        aria-pressed={l}
                        aria-label={`${a.name} ward, ${a.jamb} students${a.communities.length ? `, ${a.communities.length} communities equipped in 2026` : ""}`}
                        onClick={() => s(a)}
                        onMouseEnter={() => s(a)}
                        onFocus={() => s(a)}
                        className="block w-full py-2.5 text-left"
                      >
                        <span className="flex items-baseline justify-between gap-3">
                          <span
                            className={`ui text-xl transition-colors ${l ? "text-white" : "text-white/60"}`}
                          >
                            {a.name}
                            {a.communities.length > 0 && (
                              <CP
                                size={14}
                                className="mb-1 ml-1.5 inline"
                                aria-hidden={true}
                                strokeWidth={2.5}
                              />
                            )}
                          </span>
                          <span
                            className={`ui text-xl tabular-nums transition-colors ${l ? "text-white" : "text-white/50"}`}
                          >
                            {a.jamb}
                          </span>
                        </span>
                        <span
                          className="mt-1.5 flex flex-wrap gap-[3px]"
                          aria-hidden={true}
                        >
                          {Array.from(
                            {
                              length: a.jamb,
                            },
                            (e, a) => (
                              <span
                                className={`h-[5px] w-[5px] rounded-full ${l ? "bg-white" : "bg-white/35"}`}
                                style={{
                                  opacity: +!!d,
                                  transition: c
                                    ? undefined
                                    : `opacity 0.5s ease ${45 * i + 5 * a}ms`,
                                }}
                                key={a}
                              />
                            ),
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export function WorkList() {
  let [e, i] = useState(0),
    r = useReducedMotion();
  return (
    <ul className="border-b border-ink">
      {workAreas.map((a, l) => {
        let n = e === l;
        return (
          <li className="border-t border-ink" key={a.title}>
            <button
              type="button"
              aria-expanded={n}
              aria-controls={`work-${l}`}
              onClick={() => i(n ? -1 : l)}
              onMouseEnter={() => i(l)}
              className="group flex w-full items-center justify-between gap-6 py-4 text-left md:py-5"
            >
              <span
                className={`display text-[clamp(2.25rem,5vw,4.25rem)] transition-colors duration-300 ${n ? "text-forest" : "text-ink/35 group-hover:text-ink"}`}
              >
                {a.title}
              </span>
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center transition-colors ${n ? "bg-ink text-white" : "border border-ink"}`}
              >
                {n ? (
                  <CM size={20} aria-hidden={true} />
                ) : (
                  <CX size={20} aria-hidden={true} />
                )}
              </span>
            </button>
            <motion.div
              id={`work-${l}`}
              initial={false}
              animate={{
                height: n ? "auto" : 0,
                opacity: +!!n,
              }}
              transition={
                r
                  ? {
                      duration: 0,
                    }
                  : {
                      duration: 0.5,
                      ease: f,
                    }
              }
              className="overflow-hidden"
            >
              <p className="max-w-[40rem] pb-7 text-lg md:pl-1">{a.body}</p>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}

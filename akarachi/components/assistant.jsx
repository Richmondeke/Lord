"use client";

import {
  ArrowUp as ArrowUpIcon,
  MessageCircleQuestionMark as MessageCircleQuestionMarkIcon,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useReducedMotion, motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { matchAnswer, suggestions } from "@/lib/kb";
let CC = ArrowUpIcon;
let CD = MessageCircleQuestionMarkIcon;
export default function Assistant() {
  let [e, o] = useState(false),
    [l, h] = useState([]),
    [u, p] = useState(""),
    [w, y] = useState(false),
    k = useReducedMotion(),
    x = useRef(null),
    v = useRef(null);
  async function j(e) {
    let a,
      t = e.trim();
    if (!t || w) return;
    let r = l.map(({ role: e, text: a }) => ({
      role: e,
      text: a,
    }));
    (h((e) => [
      ...e,
      {
        role: "user",
        text: t,
      },
    ]),
      p(""),
      y(true));
    try {
      let e = await fetch("/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: t,
            history: r,
          }),
        }),
        s = await e.json();
      a = {
        role: "assistant",
        text: s.answer,
        link: s.link,
      };
    } catch {
      let e = matchAnswer(t);
      a = {
        role: "assistant",
        text: e.answer,
        link: e.link,
      };
    }
    (h((e) => [...e, a]), y(false));
  }
  return (
    useEffect(() => {
      x.current?.scrollIntoView({
        block: "end",
      });
    }, [l, w]),
    useEffect(() => {
      if (!e) return;
      v.current?.focus();
      let a = (e) => "Escape" === e.key && o(false);
      return (
        window.addEventListener("keydown", a),
        () => window.removeEventListener("keydown", a)
      );
    }, [e]),
    (
      <>
        <button
          type="button"
          onClick={() => o(!e)}
          aria-expanded={e}
          aria-controls="assistant"
          className="ui fixed bottom-4 right-4 z-[55] flex h-14 items-center gap-2.5 border border-ink bg-white px-5 text-xl font-bold text-ink shadow-[0_6px_24px_rgb(6_36_27/0.35)] transition-colors hover:bg-ink hover:text-white md:bottom-6 md:right-6"
        >
          {e ? (
            <X size={22} aria-hidden={true} />
          ) : (
            <CD size={22} aria-hidden={true} />
          )}
          <span className={e ? "sr-only" : "max-sm:sr-only"}>
            {e ? "Close assistant" : "Ask a question"}
          </span>
        </button>
        {e && (
          <motion.section
            id="assistant"
            role="dialog"
            aria-label="Ask a question"
            initial={
              !k && {
                opacity: 0,
                y: 24,
                scale: 0.98,
              }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="portal fixed inset-x-0 bottom-0 z-[54] flex h-[min(34rem,85svh)] flex-col bg-white shadow-[0_12px_48px_rgb(6_36_27/0.4)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[24rem]"
          >
            <header className="bg-forest px-5 py-4 text-white">
              <p className="display text-3xl">Ask about Akarachi</p>
              <p className="text-sm text-white/80">
                An AI assistant. It answers from what the office has published.
              </p>
            </header>
            <div
              className="flex-1 space-y-3 overflow-y-auto p-4"
              aria-live="polite"
            >
              {0 === l.length && (
                <div>
                  <p className="mb-3 text-[0.9375rem] text-slate">
                    Try one of these, or type your own.
                  </p>
                  <ul className="space-y-2">
                    {suggestions.map((e) => (
                      <li key={e}>
                        <button
                          type="button"
                          onClick={() => j(e)}
                          className="flex min-h-11 w-full items-center justify-between gap-3 border border-ink/25 px-3.5 text-left transition-colors hover:border-forest hover:bg-mint"
                        >
                          {e}{" "}
                          <ArrowRight
                            size={16}
                            className="shrink-0"
                            aria-hidden={true}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {l.map((e, r) => (
                <div
                  className={
                    "user" === e.role
                      ? "ml-10 bg-forest p-3 text-white"
                      : "mr-6 bg-ivory p-3"
                  }
                  key={r}
                >
                  <p className="whitespace-pre-wrap text-[0.9375rem] leading-relaxed">
                    {e.text}
                  </p>
                  {e.link && (
                    <Link
                      href={e.link.href}
                      onClick={() => o(false)}
                      className="link mt-2 inline-block text-[0.9375rem]"
                    >
                      {e.link.label}
                    </Link>
                  )}
                </div>
              ))}
              {w && (
                <p className="mr-6 bg-ivory p-3 text-[0.9375rem] text-slate">
                  Looking that up
                </p>
              )}
              <div ref={x} />
            </div>
            <form
              className="flex gap-2 border-t border-line p-3 pr-[4.5rem] sm:pr-3"
              onSubmit={(e) => {
                (e.preventDefault(), j(u));
              }}
            >
              <label htmlFor="ask" className="sr-only">
                Your question
              </label>
              <input
                ref={v}
                id="ask"
                className="field"
                placeholder="Type a question"
                value={u}
                maxLength={500}
                onChange={(e) => p(e.target.value)}
              />
              <button
                className="grid h-12 w-12 shrink-0 place-items-center bg-forest text-white disabled:opacity-40"
                disabled={!u.trim() || w}
                aria-label="Send question"
              >
                <CC size={20} aria-hidden={true} />
              </button>
            </form>
          </motion.section>
        )}
      </>
    )
  );
}

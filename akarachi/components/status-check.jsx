"use client";

import { useState } from "react";
import { Rise } from "@/components/motion";
import { store } from "@/lib/auth";
import Link from "next/link";
import { programmes, stages } from "@/lib/content";
import { Check } from "lucide-react";
export default function StatusCheck() {
  let [e, c] = useState(""),
    [o, m] = useState(null);
  return (
    <div className="wrap py-16 md:py-24">
      <div className="mx-auto max-w-[44rem]">
        <Rise
          as="h1"
          text="Check application status"
          className="text-[clamp(3.25rem,7vw,6rem)]"
        />
        <p className="mt-5 text-lg">
          Enter your reference number, or the phone number you registered with.
        </p>
        <form
          className="mt-8 flex flex-wrap gap-3"
          onSubmit={(t) => {
            (t.preventDefault(),
              m(store.find(e)),
              fetch(`/api/status?ref=${encodeURIComponent(e.trim())}`)
                .then((e) => e.json())
                .then((e) => {
                  "supabase" === e.backend && e.matches?.length && m(e.matches);
                })
                .catch(() => {}));
          }}
        >
          <label htmlFor="ref" className="sr-only">
            Reference number or phone
          </label>
          <input
            id="ref"
            className="field min-w-0 flex-1 !min-h-14 text-lg"
            placeholder="MBK-2026-0000 or 0803 123 4567"
            value={e}
            onChange={(e) => c(e.target.value)}
          />
          <button
            className="btn btn-forest !min-h-14"
            disabled={e.trim().length < 3}
          >
            Check status
          </button>
        </form>
        <div aria-live="polite" className="mt-10">
          {o && 0 === o.length && (
            <div className="border-l-4 border-forest bg-ivory p-5">
              <p className="font-semibold">Nothing matches “{e.trim()}”.</p>
              <p className="mt-1">
                {
                  "Check each character of the reference. Reference numbers exist only once an application has been submitted. "
                }
                <Link href="/portal/apply" className="link">
                  Start or continue an application
                </Link>
                .
              </p>
            </div>
          )}
          {o?.map(({ app: e, owner: s }) => {
            let a =
              programmes.find((t) => t.id === e.programme) ?? programmes[0];
            return (
              <div className="mb-6 border-t-8 border-ink pt-6" key={e.ref}>
                <p className="text-slate">
                  <span className="tabular-nums">{e.ref}</span>
                  {", submitted "}
                  {e.submitted}
                  {s ? ` by ${s.split(" ")[0]}` : ""}
                </p>
                <h2 className="mt-1 text-4xl">{a.name}</h2>
                <ol className="mt-6">
                  {stages.map((s, a) => (
                    <li
                      className="flex gap-4 pb-4 last:pb-0"
                      aria-current={a === e.stage ? "step" : undefined}
                      key={s.key}
                    >
                      <span
                        className={`ui grid h-10 w-10 shrink-0 place-items-center border-2 text-xl ${a < e.stage ? "border-forest bg-forest text-white" : a === e.stage ? "border-ink bg-ink text-white" : "border-ink/25 text-slate"}`}
                      >
                        {a < e.stage ? (
                          <Check size={18} strokeWidth={3} aria-label="Done" />
                        ) : (
                          a + 1
                        )}
                      </span>
                      <span className="pt-1.5">
                        <span
                          className={`ui block text-2xl ${a > e.stage ? "text-slate" : ""}`}
                        >
                          {s.label}
                        </span>
                        {a === e.stage && (
                          <span className="text-[0.9375rem]">{s.help}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </div>
        <p className="mt-10 border-t border-line pt-5 text-sm text-slate">
          <Link href="/portal/sign-in" className="link">
            Sign in
          </Link>
          {" for your full dashboard, messages and learning track."}
        </p>
      </div>
    </div>
  );
}

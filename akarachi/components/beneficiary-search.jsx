"use client";

import {
  BadgeCheck as BadgeCheckIcon,
  Search as SearchIcon,
  ShieldCheck as ShieldCheckIcon,
} from "lucide-react";
import { useReducedMotion, motion } from "framer-motion";
import { useState } from "react";
import { Rise } from "@/components/motion";
import { registerTotals } from "@/lib/content";
import Link from "next/link";
let CO = BadgeCheckIcon;
let CD = SearchIcon;
let CH = ShieldCheckIcon;
function CP({ rows: e }) {
  let s = Math.max(...e.map((e) => e[1])),
    a = useReducedMotion();
  return (
    <ul className="mt-5 space-y-2">
      {e.map(([e, r]) => (
        <li
          className="grid grid-cols-[8.5rem_1fr_2rem] items-center gap-3 text-[0.9375rem]"
          key={e}
        >
          <span>{e}</span>
          <span className="h-3 bg-sand">
            <motion.span
              className="block h-full origin-left bg-forest"
              initial={
                !a && {
                  scaleX: 0,
                }
              }
              whileInView={{
                scaleX: r / s,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={
                a
                  ? {
                      transform: `scaleX(${r / s})`,
                    }
                  : undefined
              }
            />
          </span>
          <span className="ui text-right text-lg tabular-nums">{r}</span>
        </li>
      ))}
    </ul>
  );
}
export default function BeneficiarySearch() {
  let [e, r] = useState(""),
    [l, n] = useState({
      status: "idle",
      matches: [],
    });
  async function c(t) {
    t.preventDefault();
    let s = e.trim();
    if (s.split(/\s+/).filter((e) => e.length > 2).length < 2)
      return n({
        status: "error",
        matches: [],
        message:
          "Enter a first name and a surname, three letters or more each.",
      });
    n({
      status: "busy",
      matches: [],
    });
    try {
      let e = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: s,
          }),
        }),
        t = await e.json();
      if (!e.ok)
        return n({
          status: "error",
          matches: [],
          message: t.error,
        });
      n({
        status: "done",
        matches: t.matches,
        asked: s,
      });
    } catch {
      n({
        status: "error",
        matches: [],
        message:
          "We could not reach the registers. Check your connection and try again.",
      });
    }
  }
  return (
    <>
      <section className="bg-forest text-white">
        <div className="wrap py-14 md:py-24">
          <Rise
            as="h1"
            text="Is your name on the register?"
            className="max-w-[16ch] text-[clamp(3.25rem,8vw,7.5rem)]"
          />
          <p className="mt-5 max-w-[38rem] text-lg text-white/85">
            Confirm an award from the 2026 free JAMB registration, the 2026
            equipment handover or the university scholarship. Enter the first
            name and surname as they were registered.
          </p>
          <form
            onSubmit={c}
            className="mt-8 flex max-w-[44rem] flex-wrap gap-3"
          >
            <label htmlFor="who" className="sr-only">
              First name and surname
            </label>
            <input
              id="who"
              className="field min-w-0 flex-1 basis-64 !min-h-16 !text-xl"
              placeholder="First name and surname"
              autoComplete="off"
              value={e}
              onChange={(e) => r(e.target.value)}
            />
            <button
              className="btn btn-white !min-h-16 !px-7 !text-2xl"
              disabled={"busy" === l.status}
            >
              <CD size={22} aria-hidden={true} />{" "}
              {"busy" === l.status ? "Searching" : "Check"}
            </button>
          </form>
          <div aria-live="polite" className="mt-6 max-w-[44rem]">
            {"error" === l.status && (
              <p className="border-l-4 border-white bg-white/10 p-4">
                {l.message}
              </p>
            )}
            {"done" === l.status && 0 === l.matches.length && (
              <div className="border-l-4 border-white bg-white/10 p-4">
                <p className="font-semibold">No record matches “{l.asked}”.</p>
                <p className="mt-1 text-white/85">
                  Try the spelling used when you registered, or the order
                  surname then first name. If you believe you were awarded and
                  are not listed, write to info@akarachi.org.
                </p>
              </div>
            )}
            {l.matches.map((e, s) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.06 * s,
                }}
                className="mb-3 bg-white p-5 text-ink"
                key={s}
              >
                <p className="flex items-center gap-2 text-forest">
                  <CO size={20} aria-hidden={true} />
                  <span className="ui text-xl">
                    {e.programme}
                    {", "}
                    {e.year}
                  </span>
                </p>
                <p className="display mt-1 text-4xl">{e.name}</p>
                <dl className="mt-3 grid gap-x-8 gap-y-2 text-[0.9375rem] sm:grid-cols-2">
                  <div>
                    <dt className="text-slate">Community and ward</dt>
                    <dd className="font-semibold">
                      {e.place || "Not recorded"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate">
                      {"scholar" === e.kind ? "Institution" : "Awarded"}
                    </dt>
                    <dd className="font-semibold">{e.detail}</dd>
                  </div>
                  <div>
                    <dt className="text-slate">Phone on record</dt>
                    <dd className="font-semibold tabular-nums">
                      {e.phoneEnding
                        ? `Ends in ${e.phoneEnding}`
                        : "None recorded"}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 border-t border-line pt-3 text-sm text-slate">
                  Not you, or a detail is wrong? Write to info@akarachi.org with
                  your name and community.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap py-16 md:py-24">
        <div className="rule pt-8">
          <h2 className="text-[clamp(2.75rem,6vw,5rem)]">
            What the registers hold
          </h2>
          <div className="mt-10 grid gap-x-12 gap-y-12 lg:grid-cols-3">
            <div>
              <p className="display text-7xl text-forest tabular-nums">
                {registerTotals.jamb.total}
              </p>
              <h3 className="mt-1 text-3xl">Free JAMB registrations, 2026</h3>
              <CP
                rows={[
                  ["Mbaitoli", registerTotals.jamb.mbaitoli],
                  ["Ikeduru", registerTotals.jamb.ikeduru],
                ]}
              />
            </div>
            <div>
              <p className="display text-7xl text-forest tabular-nums">
                {registerTotals.equipment.total}
              </p>
              <h3 className="mt-1 text-3xl">
                {"People equipped in "}
                {registerTotals.equipment.communities}
                {" communities, 2026"}
              </h3>
              <CP rows={registerTotals.equipment.items} />
              <p className="mt-3 text-sm text-slate">
                Each community also received a 500KVA transformer. A few rows in
                the register have no item recorded.
              </p>
            </div>
            <div>
              <p className="display text-7xl text-forest tabular-nums">
                {registerTotals.scholars.total}
              </p>
              <h3 className="mt-1 text-3xl">
                University scholars since 2022/23
              </h3>
              <CP rows={registerTotals.scholars.sessions} />
            </div>
          </div>
          <div className="mt-14 flex gap-4 bg-ivory p-6">
            <CH className="shrink-0 text-forest" size={28} aria-hidden={true} />
            <div>
              <h3 className="text-3xl">
                Why the full list is not printed here
              </h3>
              <p className="mt-2 max-w-[46rem]">
                The registers hold the names and phone numbers of more than a
                thousand people, many of them students. Anyone can confirm an
                award by name, but nobody can download the list or see a phone
                number. If you want your record corrected or removed, write to
                info@akarachi.org.
              </p>
              <Link href="/portal/apply" className="link mt-3 inline-block">
                Not on a register yet? Apply for a programme
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

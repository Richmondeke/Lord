"use client";

import { RotateCcw as RotateCcwIcon } from "lucide-react";
import { useState } from "react";
import { programmes } from "@/lib/content";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
let CO = RotateCcwIcon;
let d = [
    {
      id: "education",
      label: "School fees for a place in a tertiary institution",
    },
    {
      id: "startup",
      label: "Tools or support to start a trade or business",
    },
    {
      id: "growth",
      label: "Help to grow a business I already run",
    },
  ],
  c = {
    education: {
      q: "Did you score 200 or above in the UTME, and do you have admission to a Federal or State institution?",
      options: [
        {
          v: "yes",
          label: "Yes, both",
        },
        {
          v: "no",
          label: "Not yet",
        },
      ],
    },
    startup: {
      q: "Are you 18 or older?",
      options: [
        {
          v: "yes",
          label: "Yes",
        },
        {
          v: "no",
          label: "No",
        },
      ],
    },
    growth: {
      q: "Are you 18 or older, and is the business registered with the Corporate Affairs Commission?",
      options: [
        {
          v: "yes",
          label: "Yes, both",
        },
        {
          v: "unregistered",
          label: "18 or older, not registered",
        },
        {
          v: "no",
          label: "Under 18",
        },
      ],
    },
  };
export default function PortalHome() {
  let [e, r] = useState({}),
    n = (function (e) {
      let t = (e) => programmes.find((t) => t.id === e);
      if ("outside" === e.origin)
        return {
          title: "These programmes are for Mbaitoli and Ikeduru",
          body: "Every programme asks that you come from the constituency. Growth support is also open to people who live there.",
        };
      if (!e.need) return null;
      if ("resident" === e.origin && "growth" !== e.need)
        return {
          title: "This one is for indigenes",
          body: `${t(e.need).name} asks that you are an indigene of Mbaitoli/Ikeduru. If you live there and already run a business, Growth Support is open to residents.`,
        };
      if (!e.ready) return null;
      if ("education" === e.need)
        return "yes" === e.ready
          ? {
              fit: t("education"),
              title: "You can apply for Education Empowerment",
              body: "Have your JAMB result slip, admission letter, an ID, a passport photograph and your certificate of origin ready.",
            }
          : {
              title: "Not yet for Education Empowerment",
              body: "It needs a UTME score of 200 or above and an admission to a Federal or State institution. Come back when you have both.",
            };
      if ("no" === e.ready)
        return {
          title: "Business support starts at 18",
          body: "Both business programmes ask that you are 18 or older.",
        };
      if ("growth" === e.need && "unregistered" === e.ready)
        return "indigene" === e.origin
          ? {
              fit: t("startup"),
              title: "Start-Up Support fits you better",
              body: "Growth Support needs a CAC-registered business. Start-Up Support does not, and is open to you now.",
            }
          : {
              title: "Register the business first",
              body: "Growth Support needs a CAC registration certificate. Start-Up Support, which does not, is for indigenes only.",
            };
      let i = t(e.need);
      return {
        fit: i,
        title: `You can apply for ${i.name}`,
        body: "Your Traditional Ruler will need to attest to your application, and the team may visit you. Have an ID and a passport photograph ready.",
      };
    })(e),
    u = e.origin ? (e.need ? 2 : 1) : 0,
    p =
      0 === u
        ? {
            q: "Where are you from?",
            options: [
              {
                label: "Mbaitoli or Ikeduru",
                pick: () =>
                  r({
                    origin: "indigene",
                  }),
              },
              {
                label: "Elsewhere, but I live there",
                pick: () =>
                  r({
                    origin: "resident",
                  }),
              },
              {
                label: "Somewhere else",
                pick: () =>
                  r({
                    origin: "outside",
                  }),
              },
            ],
          }
        : 1 === u
          ? {
              q: "What do you need?",
              options: d.map((t) => ({
                label: t.label,
                pick: () =>
                  r({
                    ...e,
                    need: t.id,
                  }),
              })),
            }
          : {
              q: c[e.need].q,
              options: c[e.need].options.map((t) => ({
                label: t.label,
                pick: () =>
                  r({
                    ...e,
                    ready: t.v,
                  }),
              })),
            };
  return (
    <section id="check" className="scroll-mt-28 bg-ink text-white">
      <div className="wrap grid gap-x-16 gap-y-10 py-20 md:py-28 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="text-[clamp(3rem,6.5vw,6rem)]">Do you qualify?</h2>
          <p className="mt-5 max-w-[26rem] text-lg text-white/80">
            Three questions, no account needed. Your answers stay on this screen
            and are not saved.
          </p>
        </div>
        <div aria-live="polite" className="min-h-[19rem]">
          {n ? (
            <div>
              <p className="ui text-xl text-white/60">
                {n.fit ? "Result" : "Result: not this time"}
              </p>
              <p className="display mt-2 text-[clamp(2.25rem,4vw,3.5rem)]">
                {n.title}
              </p>
              <p className="mt-4 max-w-[34rem] text-lg text-white/85">
                {n.body}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                {n.fit && (
                  <Link
                    href={`/portal/apply?programme=${n.fit.id}`}
                    className="btn btn-white"
                  >
                    {"Start this application "}
                    <ArrowRight size={20} aria-hidden={true} />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={() => r({})}
                  className="ui inline-flex min-h-11 items-center gap-2 text-xl underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  <CO size={18} aria-hidden={true} />
                  {" Start again"}
                </button>
              </div>
            </div>
          ) : (
            <fieldset>
              <legend className="w-full">
                <span className="ui block text-xl text-white/60">
                  {"Question "}
                  {u + 1}
                  {" of 3"}
                </span>
                <span className="display mt-2 block text-[clamp(2rem,3.4vw,3rem)]">
                  {p.q}
                </span>
              </legend>
              <div className="mt-6 border-b border-white/25">
                {p.options.map((e) => (
                  <button
                    type="button"
                    onClick={e.pick}
                    className="group flex min-h-16 w-full items-center justify-between gap-6 border-t border-white/25 py-4 text-left text-xl transition-colors hover:bg-white hover:px-4 hover:text-ink"
                    key={e.label}
                  >
                    {e.label}
                    <ArrowRight
                      size={22}
                      aria-hidden={true}
                      className="shrink-0 opacity-50 transition-transform group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </button>
                ))}
              </div>
              {u > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    r(
                      1 === u
                        ? {}
                        : {
                            origin: e.origin,
                          },
                    )
                  }
                  className="ui mt-5 inline-flex min-h-11 items-center text-xl underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  Back
                </button>
              )}
            </fieldset>
          )}
        </div>
      </div>
    </section>
  );
}

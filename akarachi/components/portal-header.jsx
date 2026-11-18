"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, UserRound, X, Menu } from "lucide-react";
import Image from "next/image";
let d = [
  {
    href: "/portal/programmes",
    label: "Programmes",
  },
  {
    href: "/portal#impact",
    label: "Impact",
  },
  {
    href: "/portal/beneficiaries",
    label: "Beneficiaries",
  },
  {
    href: "/portal/status",
    label: "Check status",
  },
];
export default function PortalHeader() {
  let e = usePathname(),
    { user: m, ready: u } = useAuth(),
    [p, f] = useState(false);
  useEffect(() => f(false), [e]);
  let g = m?.name.split(" ")[0];
  return (
    <header
      style={{
        viewTransitionName: "site-header",
      }}
      className="portal sticky top-0 z-50 bg-white shadow-[0_1px_0_rgb(16_20_19/0.12)]"
    >
      <div className="bg-ink text-white">
        <div className="wrap flex h-9 items-center justify-between text-sm">
          <p className="hidden sm:block">
            Constituency office of Hon. Engr. Akarachi Amadi, Mbaitoli/Ikeduru
          </p>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1 font-semibold hover:underline"
          >
            {"akarachi.org "}
            <ArrowUpRight size={14} aria-hidden={true} />
          </Link>
        </div>
      </div>
      <div className="wrap flex h-[4.5rem] items-stretch justify-between">
        <Link href="/portal" className="flex items-center gap-3">
          <Image
            src="/img/logo.webp"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full"
            priority={true}
          />
          <span className="ui text-[1.5rem] font-bold leading-none">
            Empowerment<span className="block text-forest">Portal</span>
          </span>
        </Link>
        <nav aria-label="Portal" className="hidden items-center gap-7 lg:flex">
          {d.map((t) => {
            let s = e === t.href;
            return (
              <Link
                href={t.href}
                aria-current={s ? "page" : undefined}
                className={`ui relative py-2 text-xl ${s ? "text-forest" : "hover:text-forest"}`}
                key={t.href}
              >
                {t.label}
                {s && (
                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-forest" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-stretch">
          {u && m ? (
            <Link
              href="/portal/dashboard"
              className="ui hidden items-center gap-2 px-4 text-xl hover:text-forest sm:flex"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-forest">
                <UserRound size={18} aria-hidden={true} />
              </span>
              {g}
            </Link>
          ) : (
            <Link
              href="/portal/sign-in"
              className="ui hidden items-center px-4 text-xl hover:text-forest sm:flex"
            >
              Sign in
            </Link>
          )}
          <Link
            href="/portal/apply"
            className="ui hidden items-center bg-forest px-7 text-xl font-bold text-white transition-colors hover:bg-leaf sm:flex"
          >
            Apply now
          </Link>
          <button
            className="grid w-12 place-items-center lg:hidden"
            aria-expanded={p}
            aria-controls="portal-menu"
            aria-label={p ? "Close menu" : "Open menu"}
            onClick={() => f(!p)}
          >
            {p ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {p && (
        <nav
          id="portal-menu"
          aria-label="Portal"
          className="wrap flex flex-col border-t border-line pb-5 lg:hidden"
        >
          {[
            ...d,
            m
              ? {
                  href: "/portal/dashboard",
                  label: `My portal (${g})`,
                }
              : {
                  href: "/portal/sign-in",
                  label: "Sign in",
                },
          ].map((e) => (
            <Link
              href={e.href}
              className="ui border-b border-line py-3.5 text-2xl"
              key={e.href}
            >
              {e.label}
            </Link>
          ))}
          <Link href="/portal/apply" className="btn btn-forest mt-4">
            Apply now
          </Link>
        </nav>
      )}
    </header>
  );
}

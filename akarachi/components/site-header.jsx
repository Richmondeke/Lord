"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, X, Menu } from "lucide-react";
let c = [
  {
    hash: "story",
    label: "The man",
  },
  {
    hash: "enterprise",
    label: "Enterprise",
  },
  {
    hash: "work",
    label: "Giving",
  },
  {
    hash: "record",
    label: "In the House",
  },
  {
    hash: "press",
    label: "News",
  },
  {
    hash: "contact",
    label: "Contact",
  },
];
export default function SiteHeader() {
  let e = usePathname(),
    m = c.map((e) => ({
      href: `/#${e.hash}`,
      label: e.label,
    })),
    [p, u] = useState(false),
    [f, b] = useState(false),
    g = useReducedMotion();
  (useEffect(() => {
    let e = () => u(window.scrollY > 48);
    return (
      e(),
      window.addEventListener("scroll", e, {
        passive: true,
      }),
      () => window.removeEventListener("scroll", e)
    );
  }, []),
    useEffect(
      () => (
        (document.body.style.overflow = f ? "hidden" : ""),
        () => {
          document.body.style.overflow = "";
        }
      ),
      [f],
    ));
  let w = p || "/" !== e || f;
  return (
    <header
      style={{
        viewTransitionName: "site-header",
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${w ? "bg-white text-ink shadow-[0_1px_0_rgb(16_20_19/0.12)]" : "bg-transparent text-white"}`}
    >
      <div className="wrap flex h-[4.75rem] items-stretch justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            onClick={() => b(false)}
            className="flex items-center gap-3"
            aria-label="AAK Legacy Foundation, home"
          >
            {/* Small tree on phones and on crowded widths; the horizontal logo where it fits. */}
            <Image
              src={
                w ? "/brand/symbol-on-light.svg" : "/brand/symbol-on-dark.svg"
              }
              alt=""
              width={40}
              height={46}
              className="h-[2.875rem] w-auto sm:hidden lg:block xl:hidden"
              priority={true}
            />
            <Image
              src={
                w
                  ? "/brand/wordmark-on-light.svg"
                  : "/brand/wordmark-on-dark.svg"
              }
              alt=""
              width={153}
              height={53}
              className="hidden h-[3.3rem] w-auto sm:block lg:hidden xl:block"
              priority={true}
            />
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {m.map((e) => (
              <Link
                href={e.href}
                className="ui group relative py-2 text-[1.375rem]"
                key={e.href}
              >
                {e.label}
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-stretch">
          <Link
            href="/portal"
            className={`ui hidden items-center gap-2 px-7 text-[1.375rem] font-bold transition-colors duration-300 sm:flex ${w ? "bg-forest text-white hover:bg-leaf" : "bg-white text-ink hover:bg-mint"}`}
          >
            {"Empowerment Portal "}
            <ArrowUpRight size={20} aria-hidden={true} />
          </Link>
          <button
            className="grid w-14 place-items-center lg:hidden"
            aria-expanded={f}
            aria-controls="site-menu"
            aria-label={f ? "Close menu" : "Open menu"}
            onClick={() => b(!f)}
          >
            {f ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {f && (
        <motion.nav
          id="site-menu"
          aria-label="Main"
          initial={
            !g && {
              clipPath: "inset(0 0 100% 0)",
            }
          }
          animate={{
            clipPath: "inset(0 0 0% 0)",
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-x-0 bottom-0 top-[4.75rem] flex flex-col bg-forest text-white lg:hidden"
        >
          <ul className="wrap flex-1 pt-8">
            {m.map((e, t) => (
              <li
                className="overflow-hidden border-b border-white/15"
                key={e.href}
              >
                <motion.div
                  initial={
                    !g && {
                      y: "100%",
                    }
                  }
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.15 + 0.05 * t,
                  }}
                >
                  <Link
                    href={e.href}
                    onClick={() => b(false)}
                    className="display block py-3 text-5xl"
                  >
                    {e.label}
                  </Link>
                </motion.div>
              </li>
            ))}
          </ul>
          <a
            href="https://akarachi.org"
            target="_blank"
            rel="noreferrer"
            className="ui wrap flex items-center gap-2 pb-2 text-2xl text-white/85 hover:text-white"
          >
            Hon. Akarachi Amadi, official site{" "}
            <ArrowUpRight size={20} aria-hidden={true} />
          </a>
          <Link
            href="/portal"
            onClick={() => b(false)}
            className="btn btn-white m-5 !min-h-16 !text-2xl"
          >
            {"Empowerment Portal "}
            <ArrowUpRight size={22} aria-hidden={true} />
          </Link>
        </motion.nav>
      )}
    </header>
  );
}

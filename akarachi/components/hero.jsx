"use client";

import { useReducedMotion, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
let r = [0.16, 1, 0.3, 1];
function CN({ children: e, delay: a = 0 }) {
  let s = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className="block"
        initial={
          !s && {
            y: "110%",
          }
        }
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.95,
          ease: r,
          delay: a,
        }}
      >
        {e}
      </motion.span>
    </span>
  );
}
export function Hero() {
  let e = useReducedMotion();
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
      <p
        aria-hidden={true}
        className="display pointer-events-none absolute inset-x-0 max-md:hidden top-[4.25rem] select-none whitespace-nowrap text-center text-[23vw] leading-none text-white/[0.07]"
      >
        Akarachi
      </p>
      <div className="wrap relative z-10 flex flex-1 items-end">
        <div className="pb-10 pt-28 lg:max-w-[52%] lg:pb-20 lg:pt-36">
          <motion.p
            initial={
              !e && {
                opacity: 0,
              }
            }
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
            className="ui text-2xl text-white/70"
          >
            Engr. Akarachi Etinosa Amadi
          </motion.p>
          <h1 className="mt-3 text-[clamp(3.75rem,9.5vw,9rem)] leading-[0.84]">
            <CN>A man of</CN>
            <CN delay={0.1}>the people</CN>
          </h1>
          <motion.div
            initial={
              !e && {
                opacity: 0,
                y: 16,
              }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: r,
              delay: 0.45,
            }}
          >
            <blockquote className="mt-8 max-w-[29rem] border-l-2 border-white/40 pl-5 text-xl italic leading-snug text-white/90 md:text-2xl">
              “True happiness belongs only to those who seek out and find ways
              to serve humanity.”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#story" className="btn btn-white hover:!bg-white/85">
                Meet the man
              </Link>
              <Link href="/portal" className="btn btn-line-light">
                Apply for support
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={
          !e && {
            opacity: 0,
            scale: 1.03,
          }
        }
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.4,
          ease: r,
          delay: 0.1,
        }}
        style={{
          transformOrigin: "50% 100%",
        }}
        className="relative aspect-[1661/1800] w-full lg:absolute lg:bottom-0 lg:right-0 lg:h-[86%] lg:w-auto lg:max-w-[60%] lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]"
      >
        <Image
          src="/img/new/mono-arms.webp"
          alt="Akarachi Amadi in a white shirt, leaning on a table with his arms crossed, looking straight at the camera, in black and white"
          fill={true}
          priority={true}
          quality={90}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-contain object-right-bottom"
        />
      </motion.div>
    </section>
  );
}

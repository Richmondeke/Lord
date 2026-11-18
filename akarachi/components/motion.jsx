"use client";

import { Play as PlayIcon } from "lucide-react";
import { useState, useRef } from "react";
import { useReducedMotion, useInView, motion } from "framer-motion";
import Image from "next/image";

// framer-motion's useInView, with the same signature the build used.
const l = (ref, options) => useInView(ref, options);
let CP = PlayIcon,
  m = [0.16, 1, 0.3, 1];
export function Count({
  value: e,
  suffix: i = "",
  prefix: a = "",
  className: s = "",
}) {
  return (
    <span className={`tabular-nums ${s}`}>
      {a}
      {e.toLocaleString("en-NG")}
      {i}
    </span>
  );
}
export function Film({ src: e, poster: a, title: s, className: r = "" }) {
  let [n, o] = useState(false);
  return (
    <div
      className={`group relative aspect-video overflow-hidden bg-black [border-radius:7.2%/12.8%] ${r}`}
    >
      {n ? (
        <video
          className="absolute inset-0 h-full w-full scale-[1.03] bg-black"
          src={e}
          poster={a}
          controls={true}
          autoPlay={true}
          playsInline={true}
        />
      ) : (
        <button
          type="button"
          onClick={() => o(true)}
          className="absolute inset-0 h-full w-full text-left"
          aria-label={`Play film: ${s}`}
        >
          <img
            src={a}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <span className="absolute bottom-0 left-0 flex items-end gap-4 p-4 md:p-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center bg-white text-ink transition-colors group-hover:bg-mint md:h-[4.5rem] md:w-[4.5rem]">
              <CP className="fill-current" size={26} aria-hidden={true} />
            </span>
            <span className="ui pb-1 text-xl text-white md:text-2xl">{s}</span>
          </span>
        </button>
      )}
    </div>
  );
}
export function Lift({
  children: e,
  className: i = "",
  delay: a = 0,
  as: r = "div",
}) {
  let n = useReducedMotion(),
    CO = "li" === r ? motion.li : motion.div;
  return (
    <CO
      className={i}
      initial={
        !n && {
          opacity: 0,
        }
      }
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
        margin: "-10% 0px",
      }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: a,
      }}
    >
      {e}
    </CO>
  );
}
export function Rise({
  text: e,
  as: CA = "h2",
  className: r = "",
  delay: n = 0,
}) {
  let o = useRef(null),
    c = l(o, {
      once: true,
      margin: "-12% 0px",
    }),
    u = useReducedMotion(),
    p = e.split(" ");
  return (
    <CA ref={o} className={r}>
      {p.map((e, i) => (
        <span
          className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]"
          key={i}
        >
          <motion.span
            className="inline-block"
            initial={
              !u && {
                y: "105%",
              }
            }
            animate={
              c || u
                ? {
                    y: 0,
                  }
                : undefined
            }
            transition={{
              duration: 0.9,
              ease: m,
              delay: n + 0.045 * i,
            }}
          >
            {e}
            {i < p.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </CA>
  );
}
export function Video({ id: e, title: a, className: s = "" }) {
  let [r, n] = useState(false);
  return (
    <div
      className={`group relative aspect-video overflow-hidden rounded-[1.75rem] bg-black ${s}`}
    >
      {r ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${e}?autoplay=1&rel=0`}
          title={a}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen={true}
        />
      ) : (
        <button
          type="button"
          onClick={() => n(true)}
          className="absolute inset-0 h-full w-full text-left"
          aria-label={`Play video: ${a}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${e}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
          <span className="absolute bottom-0 left-0 flex items-end gap-4 p-4 md:p-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center bg-white text-ink transition-colors group-hover:bg-mint md:h-[4.5rem] md:w-[4.5rem]">
              <CP className="fill-current" size={26} aria-hidden={true} />
            </span>
            <span className="ui pb-1 text-xl text-white md:text-2xl">{a}</span>
          </span>
        </button>
      )}
    </div>
  );
}
export function Wipe({
  src: e,
  alt: r,
  className: n = "",
  sizes: o = "(min-width: 1024px) 50vw, 100vw",
  pos: c = "50% 50%",
  priority: u = false,
}) {
  let p = useRef(null),
    m = l(p, {
      once: true,
      margin: "-10% 0px",
    }),
    h = useReducedMotion();
  return (
    <div ref={p} className={`relative overflow-hidden ${n}`}>
      <motion.div
        className="absolute inset-0"
        initial={
          !h && {
            opacity: 0,
          }
        }
        animate={
          m || h
            ? {
                opacity: 1,
              }
            : undefined
        }
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
      >
        <Image
          src={e}
          alt={r}
          fill={true}
          sizes={o}
          priority={u}
          className="object-cover"
          style={{
            objectPosition: c,
          }}
        />
      </motion.div>
    </div>
  );
}

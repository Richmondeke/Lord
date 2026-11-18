"use client";

import { useEffect } from "react";
export default function KeepAlive() {
  return (
    useEffect(() => {
      try {
        let e = "akarachi.keepalive",
          a = new Date().toISOString().slice(0, 10);
        if (window.localStorage.getItem(e) === a) return;
        (window.localStorage.setItem(e, a),
          fetch("/api/keepalive").catch(() => {}));
      } catch {}
    }, []),
    null
  );
}

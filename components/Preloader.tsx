"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const TOTAL_DURATION = 3500; // 3.5s — tune between 3000–4000 to taste

// Interpolates between two hex colors based on t (0–1)
function lerpColor(hexA: string, hexB: string, t: number) {
  const a = hexA.match(/\w\w/g)!.map((h) => parseInt(h, 16));
  const b = hexB.match(/\w\w/g)!.map((h) => parseInt(h, 16));
  const rgb = a.map((v, i) => Math.round(v + (b[i] - v) * t));
  return `rgb(${rgb.join(",")})`;
}

const GREY = "#404040"; // neutral-700-ish, matches your dashed ring color
const ORANGE = "#f97316"; // adjust to your exact brand orange

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pageReady = document.readyState === "complete";
      const timeBased = Math.min(95, (elapsed / TOTAL_DURATION) * 95);

      setProgress((prev) => {
        const target = pageReady && elapsed >= TOTAL_DURATION ? 100 : timeBased;
        return prev < target ? Math.min(target, prev + 1.5) : prev;
      });

      if (elapsed < TOTAL_DURATION || !pageReady) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(100);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  const t = progress / 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-neutral-950"
        >
          <div className="relative flex h-500 w-500 items-center justify-center">
            {/* Rings — gradually shift from grey to orange as progress climbs */}
            {[0, 1, 2].map((i) => {
              // Each ring lags slightly behind the previous, so the color
              // change itself ripples outward rather than all three
              // shifting in perfect unison
              const ringT = Math.max(0, Math.min(1, t * 1.3 - i * 0.15));
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-dashed"
                  style={{
                    height: `${240 + i * 130}px`,
                    width: `${240 + i * 130}px`,
                    borderColor: lerpColor(GREY, ORANGE, ringT),
                  }}
                  animate={{
                    scale: [1, 1.06, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              );
            })}

            {/* Logo — grey base + color layer revealed bottom-up via clip-path */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-24 w-24"
            >
              {/* Grey/dim base layer, always fully visible */}
              <Image
                src="/pl.png"
                alt=""
                fill
                priority
                className="object-contain opacity-100 grayscale brightness-[0.55]"
              />
              {/* Color layer, clipped from the bottom, grows upward with progress */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
              >
                <Image
                  src="/pl.png"
                  alt="The Orchard Thieves"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>

          <motion.span
            key={Math.round(progress)}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="mt-6 text-3xl font-bold text-white"
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   SplashScreen — Premium Editorial Edition
   AWG Geometric Monogram · Apple/Linear Aesthetic
   #0B0B0B · Warm Off-White · Maroon Accent #9B1C31
   ───────────────────────────────────────────────────────────── */

/* ── AWG Mark geometry (viewBox 0 0 80 96) ──────────────────
   A: apex (40,10) → legs to (14,78) and (66,78)
      crossbar at y=51: x=27→x=53
   W: inner valley M 28 69 L 40 58 L 52 69  (inside A legs)
   G: corner bracket (62,17)→(73,17)→(73,28)  [UI bounding-box handle]
   ·: cursor dot  cx=40 cy=51 r=2.4  [maroon accent — interactive focal pt]
   ─────────────────────────────────────────────────────────── */

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ACCENT = "#9B1C31";          // portfolio maroon
const INK    = "rgba(228, 224, 218, 0.88)";  // warm off-white strokes
const BG     = "#0B0B0B";

/* ── Spring Bounce Profiles for Slow-Mo Choreography ── */
const BOUNCE_SPRING = { type: "spring" as const, stiffness: 100, damping: 11, mass: 0.9 };
const BOUNCE_ELASTIC = { type: "spring" as const, stiffness: 140, damping: 9, mass: 0.85 };

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Force full motion animations (ignore OS reduced-motion suppressions for splash intro)
  const rm = false;
  const d = (base: number) => base;
  const dl = (base: number) => base;

  /* ── Lock scroll + drive progress bar (starts after text reveal) ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    let interval: ReturnType<typeof setInterval>;

    const delay = setTimeout(
      () => {
        interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            // Ease-out: fast start, slows near end
            const step = prev < 64 ? 1.45 : prev < 87 ? 0.88 : 0.42;
            return Math.min(100, prev + step);
          });
        }, 22);
      },
      rm ? 350 : 3400
    );

    return () => {
      clearTimeout(delay);
      clearInterval(interval!);
      document.body.style.overflow = "";
    };
  }, [rm]);

  /* ── Exit when progress reaches 100% ── */
  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }, 550);
      return () => clearTimeout(t);
    }
  }, [progress]);



  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-editorial"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: rm ? 0.4 : 0.88,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: BG,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            fontFamily: "'Inter', 'Helvetica Neue', -apple-system, sans-serif",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          {/* ── Subtle radial warmth behind the mark — pulsing motion ── */}
          <motion.div
            aria-hidden
            animate={
              rm
                ? { opacity: 0.04 }
                : {
                    opacity: [0.03, 0.10, 0.03],
                    scale: [0.90, 1.15, 0.90],
                  }
            }
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 55% 45% at 50% 44%, rgba(155, 28, 49, 0.13) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* ════════════════════════════════════════════════
              AWG GEOMETRIC MONOGRAM — SLOW-MO BOUNCE CHOREOGRAPHY
              1. A Frame descends with elastic bounce + slow path draw
              2. W Valley rises from below & spring-locks into A
              3. G UI Bracket magnetic snap from top-right with spring recoil
              4. Maroon Cursor Dot spring-pops with elastic bounce + radar ring
              ════════════════════════════════════════════════ */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={
              rm
                ? { scale: 1, opacity: 1 }
                : {
                    scale: 1,
                    opacity: 1,
                    y: [0, -4, 0],
                  }
            }
            transition={{
              scale: { duration: d(0.9), delay: dl(0.1), ease: EASE_OUT },
              opacity: { duration: d(0.5), delay: dl(0.1) },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dl(2.2),
              },
            }}
          >
            <svg
              style={{
                width: "clamp(58px, 5.8vw, 86px)",
                height: "clamp(70px, 6.9vw, 104px)",
                overflow: "visible",
              }}
              viewBox="0 0 80 96"
              fill="none"
              aria-label="AWG — Aniz Wiz Gouki monogram"
            >
              {/* ── PIECE 1: 'A' FRAME (Descends with Slow-Mo Spring Bounce) ── */}
              <motion.g
                initial={rm ? { opacity: 0 } : { y: -28, opacity: 0, scale: 0.94 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  y: rm ? { duration: 0.3 } : BOUNCE_SPRING,
                  scale: rm ? { duration: 0.3 } : BOUNCE_SPRING,
                  opacity: { duration: d(0.6), delay: dl(0.2) },
                  delay: dl(0.2),
                }}
              >
                {/* A left leg */}
                <motion.path
                  d="M 14 78 L 40 10"
                  stroke={INK}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: d(1.0), delay: dl(0.25), ease: EASE_OUT }}
                />

                {/* A right leg */}
                <motion.path
                  d="M 40 10 L 66 78"
                  stroke={INK}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: d(1.0), delay: dl(0.42), ease: EASE_OUT }}
                />

                {/* A crossbar */}
                <motion.path
                  d="M 27 51 L 53 51"
                  stroke={INK}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: d(0.7), delay: dl(0.70), ease: EASE_OUT }}
                />
              </motion.g>

              {/* ── PIECE 2: 'W' VALLEY (Rises from below & Spring-Locks) ── */}
              <motion.g
                initial={rm ? { opacity: 0 } : { y: 24, opacity: 0, scale: 0.7 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  y: rm ? { duration: 0.3 } : { ...BOUNCE_SPRING, delay: dl(0.85) },
                  scale: rm ? { duration: 0.3 } : { ...BOUNCE_SPRING, delay: dl(0.85) },
                  opacity: { duration: d(0.5), delay: dl(0.85) },
                }}
              >
                <motion.path
                  d="M 28 69 L 40 58 L 52 69"
                  stroke={INK}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: d(0.8), delay: dl(0.92), ease: EASE_OUT }}
                />
              </motion.g>

              {/* ── PIECE 3: 'G' UI BRACKET (Magnetic Spring Snap from Top-Right) ── */}
              <motion.g
                initial={rm ? { opacity: 0 } : { x: 22, y: -22, opacity: 0, scale: 0.4, rotate: 15 }}
                animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  x: rm ? { duration: 0.3 } : { ...BOUNCE_ELASTIC, delay: dl(1.25) },
                  y: rm ? { duration: 0.3 } : { ...BOUNCE_ELASTIC, delay: dl(1.25) },
                  scale: rm ? { duration: 0.3 } : { ...BOUNCE_ELASTIC, delay: dl(1.25) },
                  rotate: rm ? { duration: 0.3 } : { ...BOUNCE_ELASTIC, delay: dl(1.25) },
                  opacity: { duration: d(0.4), delay: dl(1.25) },
                }}
              >
                <motion.path
                  d="M 61 17 L 73 17 L 73 29"
                  stroke={ACCENT}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={
                    rm
                      ? { pathLength: 1 }
                      : {
                          pathLength: 1,
                          opacity: [1, 0.45, 1],
                        }
                  }
                  transition={{
                    pathLength: { duration: d(0.55), delay: dl(1.30), ease: EASE_OUT },
                    opacity: {
                      duration: 3,
                      repeat: Infinity,
                      delay: dl(2.0),
                      ease: "easeInOut",
                    },
                  }}
                />
              </motion.g>

              {/* ── PIECE 4: MAROON CURSOR DOT (Elastic Bounce Pop into Center) ── */}
              <motion.g
                initial={rm ? { opacity: 0 } : { y: 16, opacity: 0, scale: 0 }}
                animate={
                  rm
                    ? { y: 0, opacity: 1, scale: 1 }
                    : {
                        y: 0,
                        opacity: 1,
                        scale: [0, 1.45, 0.9, 1],
                      }
                }
                transition={{
                  y: rm ? { duration: 0.3 } : { ...BOUNCE_ELASTIC, delay: dl(1.55) },
                  scale: rm ? { duration: 0.3 } : { duration: d(0.65), delay: dl(1.55), ease: "easeOut" },
                  opacity: { duration: d(0.35), delay: dl(1.55) },
                }}
              >
                {/* Double Radar Ripple Ring on Maroon Cursor Dot */}
                {!rm && (
                  <>
                    <motion.circle
                      cx="40"
                      cy="51"
                      r="2.4"
                      stroke={ACCENT}
                      strokeWidth="0.8"
                      fill="none"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{
                        scale: [1, 3.8],
                        opacity: [0.85, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: dl(1.7),
                        ease: "easeOut",
                      }}
                    />
                    <motion.circle
                      cx="40"
                      cy="51"
                      r="2.4"
                      stroke={ACCENT}
                      strokeWidth="0.5"
                      fill="none"
                      initial={{ scale: 1, opacity: 0 }}
                      animate={{
                        scale: [1, 5.2],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        delay: dl(2.0),
                        ease: "easeOut",
                      }}
                    />
                  </>
                )}

                {/* Cursor dot */}
                <circle cx="40" cy="51" r="2.4" fill={ACCENT} />
              </motion.g>
            </svg>
          </motion.div>

          {/* ── Vertical spacer ── */}
          <div style={{ height: "clamp(28px, 3.6vw, 46px)" }} />

          {/* ════════════════════════════════════════════════
              NAME: "ANIZ WIZ GOuki"
              ════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: rm ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.8), delay: dl(1.95), ease: EASE_OUT }}
            style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}
          >
            <span
              style={{
                fontWeight: 300,
                fontSize: "clamp(14px, 1.9vw, 23px)",
                letterSpacing: "0.17em",
                color: "rgba(228, 224, 218, 0.92)",
                textTransform: "uppercase",
              }}
            >
              Aniz Wiz GO
            </span>
            <span
              style={{
                fontWeight: 200,
                fontSize: "clamp(14px, 1.9vw, 23px)",
                letterSpacing: "0.17em",
                color: "rgba(228, 224, 218, 0.42)",
              }}
            >
              uki
            </span>
          </motion.div>

          {/* ════════════════════════════════════════════════
              SUBTITLE — slides up
              ════════════════════════════════════════════════ */}
          <motion.p
            initial={{ opacity: 0, y: rm ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: d(0.75), delay: dl(2.25), ease: EASE_OUT }}
            style={{
              margin: 0,
              marginTop: "clamp(8px, 1vw, 12px)",
              fontWeight: 300,
              fontSize: "clamp(6.5px, 0.72vw, 8.5px)",
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: "rgba(228, 224, 218, 0.24)",
              lineHeight: 1,
            }}
          >
            UI/UX Designer&nbsp;&nbsp;·&nbsp;&nbsp;Frontend Developer
          </motion.p>

          {/* ════════════════════════════════════════════════
              LOADING SECTION — bottom anchored
              "LOADING EXPERIENCE..." + 1px progress line
              ════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: d(0.55), delay: dl(2.08) }}
            style={{
              position: "absolute",
              bottom: "clamp(38px, 6.8vh, 70px)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "clamp(130px, 16vw, 194px)",
            }}
          >
            {/* Loading label */}
            <span
              style={{
                fontWeight: 300,
                fontSize: "7px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: "rgba(228, 224, 218, 0.18)",
                whiteSpace: "nowrap",
              }}
            >
              Loading Experience...
            </span>

            {/* 1px ultra-thin progress track */}
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "rgba(228, 224, 218, 0.07)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <motion.div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: "rgba(228, 224, 218, 0.52)",
                  borderRadius: "999px",
                }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* ── Copyright ── */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: dl(2.3) }}
            style={{
              position: "absolute",
              bottom: "clamp(12px, 1.8vh, 20px)",
              fontWeight: 300,
              fontSize: "6.5px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(228, 224, 218, 0.09)",
            }}
          >
            © {new Date().getFullYear()} Aniz Wiz Gouki
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

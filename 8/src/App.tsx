import { AnimatePresence, motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Flower } from "./components/Flower";
import { FloatingPetals } from "./components/FloatingPetals";
import { LightBurst } from "./components/LightBurst";
import { NightSky } from "./components/NightSky";
import { YouTubeMusic } from "./components/YouTubeMusic";
import { useParallax } from "./hooks/useParallax";

const text = {
  recipientName: "Ph\u1ea1m Giang",
  senderName: "Anh Nghĩa",
  flowerTouched:
    "B\u00f4ng hoa \u0111\u00e3 nh\u1eadn \u0111\u01b0\u1ee3c c\u00e1i ch\u1ea1m d\u1ecbu d\u00e0ng",
  flowerPrompt:
    "Ch\u1ea1m v\u00e0o b\u00f4ng hoa \u0111\u1ec3 m\u1edf l\u1eddi nh\u1eafn",
  intro: "Anh c\u00f3 m\u1ed9t \u0111i\u1ec1u mu\u1ed1n t\u1eb7ng em...",
  giftLine: "T\u1eb7ng em m\u1ed9t b\u00f4ng hoa,",
  gentleLine:
    "v\u00ec em x\u1ee9ng \u0111\u00e1ng v\u1edbi nh\u1eefng \u0111i\u1ec1u d\u1ecbu d\u00e0ng nh\u1ea5t.",
  touchFlower: "Ch\u1ea1m v\u00e0o hoa",
  messageLine1:
    "Anh kh\u00f4ng bi\u1ebft ng\u00e0y mai s\u1ebd nh\u01b0 th\u1ebf n\u00e0o,",
  messageLine2: "nh\u01b0ng h\u00f4m nay,",
  messageLine3: "anh ch\u1ec9 mu\u1ed1n em bi\u1ebft r\u1eb1ng...",
  messageLine4:
    "em l\u00e0 m\u1ed9t \u0111i\u1ec1u r\u1ea5t \u0111\u1eb7c bi\u1ec7t.",
  finalLine: "Mong em lu\u00f4n m\u1ec9m c\u01b0\u1eddi.",
  sendWord: "g\u1eedi",
  flowerEmoji: "\ud83c\udf38",
  heartEmoji: "\u2764\ufe0f",
};

type Scene = "intro" | "seed" | "bloom" | "ready" | "message" | "final";

export default function App() {
  const [scene, setScene] = useState<Scene>("intro");
  const [touched, setTouched] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const { offset, handlers } = useParallax();
  const flowerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const schedule = [
      window.setTimeout(() => setScene("seed"), 2200),
      window.setTimeout(() => setScene("bloom"), 4800),
      window.setTimeout(() => setScene("ready"), 8200),
    ];

    return () => schedule.forEach(window.clearTimeout);
  }, []);

  const revealMessage = () => {
    if (touched) return;

    setTouched(true);
    setBurstId((value) => value + 1);
    setScene("message");
    window.setTimeout(() => setScene("final"), 5200);
  };

  const flowerLabel = useMemo(
    () => (touched ? text.flowerTouched : text.flowerPrompt),
    [touched],
  );

  return (
    <main
      className="relative min-h-dvh overflow-hidden bg-[#100814] text-rose-50"
      {...handlers}
    >
      <NightSky offset={offset} />
      <FloatingPetals
        active={scene === "ready" || scene === "message" || scene === "final"}
      />
      <LightBurst id={burstId} />
      <YouTubeMusic />

      <section className="relative z-10 flex min-h-dvh items-center justify-center px-5 py-10">
        <div className="relative flex min-h-[680px] w-full max-w-5xl flex-col items-center justify-center sm:min-h-[760px]">
          <AnimatePresence mode="wait">
            {scene === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute inset-x-0 top-[32%] text-center"
              >
                <p className="font-serif text-lg text-rose-100/90 sm:text-2xl">
                  {text.intro}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="relative flex w-full flex-1 items-center justify-center"
            animate={{
              x: offset.x * 12,
              y:
                offset.y * 8 +
                (scene === "message" || scene === "final" ? -92 : 0),
              scale: scene === "message" || scene === "final" ? 0.96 : 1,
            }}
            transition={{ type: "spring", stiffness: 45, damping: 22 }}
          >
            <button
              ref={flowerButtonRef}
              type="button"
              className="flower-touch relative z-10 mt-8 touch-manipulation rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-100/80"
              onClick={
                scene === "ready" || scene === "message" || scene === "final"
                  ? revealMessage
                  : undefined
              }
              aria-label={flowerLabel}
            >
              <Flower stage={scene} touched={touched} />
            </button>
          </motion.div>

          <AnimatePresence>
            {scene === "ready" && (
              <motion.div
                key="ready-copy"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute bottom-20 flex w-full flex-col items-center gap-7 text-center sm:bottom-24"
              >
                <div>
                  <p className="romantic-text font-serif text-2xl leading-tight text-[#fff8fb] sm:text-4xl">
                    {text.giftLine}
                  </p>
                  <p className="romantic-text mt-2 text-sm font-medium leading-7 text-[#ffe8ef] sm:text-lg">
                    {text.gentleLine}
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => flowerButtonRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-100/30 bg-rose-50/12 px-5 py-3 text-sm font-medium text-rose-50 shadow-[0_0_30px_rgba(255,155,180,0.2)] backdrop-blur-md transition hover:bg-rose-50/18 focus:outline-none focus:ring-2 focus:ring-rose-100/70 sm:text-base"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Sparkles size={17} />
                  {text.touchFlower} {text.flowerEmoji}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(scene === "message" || scene === "final") && (
              <motion.div
                key="love-note"
                initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 1.25, ease: "easeOut" }}
                className="love-note-panel absolute bottom-5 z-20 mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-5 text-center sm:bottom-8 sm:px-8 sm:py-6"
              >
                <p className="romantic-text max-w-[34rem] text-balance text-sm font-medium leading-7 text-[#fff6fa] sm:text-lg sm:leading-8">
                  {text.messageLine1}
                  <br />
                  {text.messageLine2}
                  <br />
                  {text.messageLine3}
                  <br />
                  {text.messageLine4}
                </p>

                <AnimatePresence>
                  {scene === "final" && (
                    <motion.div
                      key="final-line"
                      initial={{ opacity: 0, scale: 0.92, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-8"
                    >
                      <p className="romantic-text font-serif text-3xl leading-tight text-[#fffafc] drop-shadow-[0_0_22px_rgba(255,170,190,0.55)] sm:text-5xl">
                        {text.finalLine} {text.heartEmoji}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-7 inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-[#ffdbe5]/78">
                  <Heart size={12} fill="currentColor" />
                  {text.senderName} {text.sendWord} {text.recipientName}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

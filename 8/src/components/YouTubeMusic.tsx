import { AnimatePresence, motion } from "framer-motion";
import { Music2, Music4 } from "lucide-react";
import { useMemo, useState } from "react";

const musicVideoId = "tRD8YPTN4JI";
const musicText = {
  turnOff: "T\u1eaft nh\u1ea1c n\u1ec1n",
  turnOn: "B\u1eadt nh\u1ea1c n\u1ec1n",
  offShort: "T\u1eaft nh\u1ea1c",
  onShort: "B\u1eadt nh\u1ea1c",
  iframeTitle: "Nh\u1ea1c n\u1ec1n l\u00e3ng m\u1ea1n",
  label: "NH\u1ea0C N\u1ec0N",
};

export function YouTubeMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  const musicUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      loop: "1",
      playlist: musicVideoId,
      controls: "0",
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });

    return `https://www.youtube.com/embed/${musicVideoId}?${params.toString()}`;
  }, []);

  return (
    <div className="fixed right-4 top-4 z-30 flex flex-col items-end gap-3">
      <button
        type="button"
        onClick={() => setIsPlaying((value) => !value)}
        className="group grid size-11 place-items-center rounded-full border border-white/15 bg-white/8 text-rose-100 shadow-[0_0_24px_rgba(255,182,193,0.12)] backdrop-blur-md transition hover:bg-white/14 focus:outline-none focus:ring-2 focus:ring-rose-200/70"
        aria-label={isPlaying ? musicText.turnOff : musicText.turnOn}
      >
        {isPlaying ? <Music4 size={19} /> : <Music2 size={19} />}
        <span className="pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#211021]/80 px-3 py-1 text-xs text-rose-100 opacity-0 shadow-lg backdrop-blur-md transition group-hover:block group-hover:opacity-100">
          {isPlaying ? musicText.offShort : musicText.onShort}
        </span>
      </button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-[210px] overflow-hidden rounded-2xl border border-white/12 bg-[#160915]/80 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur-md"
          >
            <div className="pointer-events-none aspect-video overflow-hidden rounded-xl">
              <iframe
                className="h-full w-full"
                src={musicUrl}
                title={musicText.iframeTitle}
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="mt-2 text-center text-[11px] font-medium tracking-[0.18em] text-rose-100/70">
              {musicText.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { motion } from "framer-motion";

type NightSkyProps = {
  offset: { x: number; y: number };
};

const stars = Array.from({ length: 44 }, (_, index) => ({
  id: index,
  left: `${(index * 19 + 11) % 100}%`,
  top: `${(index * 31 + 7) % 82}%`,
  size: 1 + (index % 4) * 0.8,
  delay: (index % 8) * 0.45,
  duration: 4.5 + (index % 5),
}));

const fireflies = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 5) % 100}%`,
  top: `${18 + ((index * 23) % 68)}%`,
  delay: index * 0.38,
  drift: index % 2 === 0 ? 1 : -1,
}));

export function NightSky({ offset }: NightSkyProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,171,196,0.16),transparent_24%),radial-gradient(circle_at_18%_18%,rgba(198,153,255,0.14),transparent_26%),linear-gradient(180deg,#0b0814_0%,#160916_48%,#24101d_100%)]" />
      <motion.div
        className="absolute left-[8%] top-[7%] size-36 rounded-full bg-[#fff2d6] opacity-20 blur-[1px] sm:size-48"
        animate={{ x: offset.x * -10, y: offset.y * -8 }}
        transition={{ type: "spring", stiffness: 35, damping: 22 }}
      />
      <motion.div
        className="absolute left-[8%] top-[7%] size-40 rounded-full border border-[#fff9eb]/10 sm:size-52"
        animate={{ x: offset.x * -11, y: offset.y * -9 }}
        transition={{ type: "spring", stiffness: 35, damping: 22 }}
      />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(10,5,13,0.68),transparent)]" />

      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.12, 0.82, 0.22], scale: [0.7, 1.25, 0.85] }}
          transition={{
            delay: star.delay,
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {fireflies.map((fly) => (
        <motion.span
          key={fly.id}
          className="absolute size-1.5 rounded-full bg-rose-100 shadow-[0_0_16px_rgba(255,210,220,0.9)]"
          style={{ left: fly.left, top: fly.top }}
          animate={{
            x: [0, fly.drift * 18, fly.drift * -10, 0],
            y: [0, -22, 18, 0],
            opacity: [0, 0.72, 0.16, 0.5],
          }}
          transition={{
            delay: fly.delay,
            duration: 8 + (fly.id % 5),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

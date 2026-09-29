import { motion } from "framer-motion";

type FloatingPetalsProps = {
  active: boolean;
};

const petals = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 29 + 9) % 100}%`,
  delay: (index % 9) * 0.7,
  duration: 10 + (index % 7) * 1.1,
  size: 9 + (index % 5) * 3,
  rotate: index % 2 === 0 ? 1 : -1,
}));

export function FloatingPetals({ active }: FloatingPetalsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="petal absolute top-[-8%] rounded-[70%_20%_70%_20%] bg-[linear-gradient(135deg,#fff4f7,#ff9db7_58%,#d94f7d)] opacity-0 shadow-[0_0_14px_rgba(255,170,190,0.2)]"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.45,
          }}
          animate={
            active
              ? {
                  y: ["0vh", "114vh"],
                  x: [0, petal.rotate * 22, petal.rotate * -26, petal.rotate * 16],
                  rotate: [0, petal.rotate * 90, petal.rotate * 210, petal.rotate * 360],
                  opacity: [0, 0.48, 0.36, 0],
                }
              : { opacity: 0 }
          }
          transition={{
            delay: petal.delay,
            duration: petal.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

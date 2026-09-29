import { AnimatePresence, motion } from "framer-motion";

export function LightBurst({ id }: { id: number }) {
  return (
    <AnimatePresence>
      {id > 0 && (
        <motion.div
          key={id}
          className="pointer-events-none absolute left-1/2 top-1/2 z-[3] size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose-100/50"
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 18, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </AnimatePresence>
  );
}

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const phrases = ["HEADCOUNT", "ISN'T", "LEVERAGE."];

export default function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {phrases.map((phrase, i) => {
          const start = i / phrases.length;
          const end = (i + 1) / phrases.length;
          const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
          const scale = useTransform(scrollYProgress, [start, start + 0.1], [0.8, 1]);

          return (
            <motion.div
              key={phrase}
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity, scale }}
            >
              <span
                className={`text-7xl sm:text-[10rem] md:text-[14rem] font-bold tracking-tighter ${
                  phrase === "LEVERAGE."
                    ? "text-gradient-neon"
                    : "text-foreground"
                }`}
              >
                {phrase}
              </span>
            </motion.div>
          );
        })}

        {/* Line accents */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 text-muted-foreground text-sm tracking-[0.3em] uppercase"
          style={{ opacity: useTransform(scrollYProgress, [0.85, 1], [0, 1]) }}
        >
          Scaling used to mean hiring
        </motion.div>
      </div>
    </section>
  );
}

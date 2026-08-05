import { motion } from "framer-motion";
import ParticleField from "./ParticleField";

const words = ["Run A Giant Company.", "Your Only Employee", "Is You."];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(82_100%_55%_/_0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-8">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className={`block ${i === words.length - 1 ? "text-gradient-neon" : "text-foreground"}`}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          The platform for lean giants — one-person, zero-person, and small teams
          running companies like much bigger ones.
          <br />
          <span className="text-foreground font-medium">No headcount. Just proof.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
        >
          <motion.button
            className="group relative px-8 py-4 rounded-full glass font-semibold text-foreground overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            {/* Glow border */}
            <span className="absolute inset-0 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500 glow-neon" />
            {/* Inner gradient */}
            <span className="absolute inset-[1px] rounded-full bg-gradient-to-r from-neon/10 to-electric/10 group-hover:from-neon/20 group-hover:to-electric/20 transition-all duration-500" />
            <span className="relative z-10">Join the Waitlist →</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-neon"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

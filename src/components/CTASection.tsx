import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative py-32 px-6 min-h-screen flex items-center justify-center">
      {/* Portal glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ scale, opacity }}
      >
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-neon/5 to-electric/5 blur-3xl animate-pulse-glow" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center max-w-2xl mx-auto"
        style={{ opacity }}
      >
        <motion.h2
          className="text-4xl sm:text-7xl font-bold tracking-tight text-foreground mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Your Co-Founder
          <br />
          <span className="text-gradient-neon">Is Waiting</span>
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-12 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Join the next generation of builders.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex items-center max-w-md mx-auto glass rounded-full p-1.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <span className="text-neon/60 pl-4 font-mono text-sm select-none">&gt;</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter email..."
                className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm px-3 py-3 placeholder:text-muted-foreground/50"
              />
              <motion.button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-neon text-primary-foreground font-semibold text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                🚀
              </motion.div>
              <p className="text-neon font-semibold text-xl">Welcome aboard.</p>
              <p className="text-muted-foreground text-sm mt-2">Check your inbox for the next steps.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

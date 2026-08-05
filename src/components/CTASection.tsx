import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const stages = [
  { value: "idea", label: "Idea" },
  { value: "building", label: "Building" },
  { value: "live", label: "Live" },
  { value: "scaling", label: "Scaling" },
];

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [building, setBuilding] = useState("");
  const [stage, setStage] = useState("");
  const [committed, setCommitted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const isValid = email.trim() !== "" && building.trim() !== "" && stage !== "" && committed;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, building, stage }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" ref={ref} className="relative py-32 px-6 min-h-screen flex items-center justify-center">
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
          className="text-muted-foreground mb-3 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Join the builders running giant companies with a team of one.
        </motion.p>

        <motion.p
          className="text-muted-foreground/60 mb-12 text-xs tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          This isn't a newsletter. It's for people building right now.
        </motion.p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="flex flex-col items-stretch gap-3 max-w-md mx-auto text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center w-full glass rounded-full p-1.5">
                <span className="text-neon/60 pl-4 font-mono text-sm select-none">&gt;</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter email..."
                  disabled={loading}
                  className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm px-3 py-3 placeholder:text-muted-foreground/50 disabled:opacity-50"
                />
              </div>

              <div className="w-full glass rounded-2xl px-5 py-1">
                <input
                  type="text"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  placeholder="what are you building?"
                  disabled={loading}
                  className="w-full bg-transparent border-none outline-none text-foreground text-sm py-3 placeholder:text-muted-foreground/50 disabled:opacity-50"
                />
              </div>

              <div className="w-full glass rounded-2xl px-5 py-1">
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  disabled={loading}
                  className="w-full bg-transparent border-none outline-none text-sm py-3 disabled:opacity-50 [&>option]:bg-background [&>option]:text-foreground"
                  style={{ color: stage ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground) / 0.5)" }}
                >
                  <option value="" disabled>
                    stage — idea, building, live, or scaling?
                  </option>
                  {stages.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-start gap-2.5 px-2 py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={committed}
                  onChange={(e) => setCommitted(e.target.checked)}
                  disabled={loading}
                  className="mt-0.5 w-4 h-4 rounded accent-neon shrink-0"
                />
                <span className="text-xs text-muted-foreground">
                  I'm actively building this — not just browsing.
                </span>
              </label>

              <motion.button
                type="submit"
                disabled={loading || !isValid}
                className="w-full px-6 py-3.5 rounded-full bg-neon text-primary-foreground font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                whileHover={loading || !isValid ? {} : { scale: 1.03 }}
                whileTap={loading || !isValid ? {} : { scale: 0.97 }}
              >
                {loading ? "Sending..." : "Apply for Early Access →"}
              </motion.button>

              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}
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

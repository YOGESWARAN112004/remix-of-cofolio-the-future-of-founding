import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Code2, TrendingUp, Rocket } from "lucide-react";

const cards = [
  {
    title: "Nomad Legal",
    stack: "GPT-4, Next.js, Stripe",
    stage: "Live",
    team: "1",
    accent: "neon" as const,
    icon: Rocket,
  },
  {
    title: "OneDesk Ops",
    stack: "Python, Agents, Zapier",
    stage: "Scaling",
    team: "0 · AI-run",
    accent: "electric" as const,
    icon: Code2,
  },
  {
    title: "Ledger One",
    stack: "Rust, Postgres, Plaid",
    stage: "Building",
    team: "1",
    accent: "neon" as const,
    icon: TrendingUp,
  },
  {
    title: "Atlas Compliance",
    stack: "n8n, GST APIs, WhatsApp",
    stage: "Live",
    team: "2",
    accent: "electric" as const,
    icon: Zap,
  },
];

export default function PortfolioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  return (
    <section ref={ref} className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-electric text-sm tracking-[0.3em] uppercase mb-4">The Directory</p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
            Your Company <span className="text-gradient-neon">Is</span> The Listing
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {cards.map((card, i) => {
            const rotate = useTransform(scrollYProgress, [0, 1], [10 + i * 3, 0]);
            const y = useTransform(scrollYProgress, [0, 1], [60 + i * 30, 0]);
            const Icon = card.icon;

            return (
              <motion.div
                key={i}
                className={`group relative glass rounded-xl p-6 cursor-pointer transition-shadow duration-500 ${card.accent === "neon" ? "hover:glow-neon" : "hover:glow-accent"
                  }`}
                style={{ rotate, y }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-2 rounded-lg ${card.accent === "neon" ? "bg-neon/10" : "bg-electric/10"}`}>
                    <Icon className={`w-5 h-5 ${card.accent === "neon" ? "text-neon" : "text-electric"}`} />
                  </div>
                  <span className="text-xs text-muted-foreground tracking-wider uppercase">{card.stage}</span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Stack: {card.stack}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">Team Size</span>
                  <span className={`text-sm font-bold ${card.accent === "neon" ? "text-neon" : "text-electric"}`}>
                    {card.team}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-3.5 rounded-full bg-neon/10 border border-neon/30 text-neon font-semibold text-sm hover:bg-neon/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            List Your Company →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

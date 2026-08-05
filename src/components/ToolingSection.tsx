import { motion } from "framer-motion";
import { Bot, Layers, ShieldCheck } from "lucide-react";

const cards = [
  {
    title: "AI Cofounder",
    description:
      "Onboards your business, recommends which agents to wire up, and handles the ongoing work — scheduling, drafting, first-pass compliance.",
    accent: "neon" as const,
    icon: Bot,
  },
  {
    title: "Curated Stacks",
    description:
      "Templates for agents, MCPs, skills, and fine-tuned models — wired up in minutes, not weeks.",
    accent: "electric" as const,
    icon: Layers,
  },
  {
    title: "India Back-Office",
    description:
      "GST, ITR, and ROC filings guided inside the platform. Compliance handled, not chased.",
    accent: "neon" as const,
    icon: ShieldCheck,
  },
];

export default function ToolingSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-neon text-sm tracking-[0.3em] uppercase mb-4">The Tooling</p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-6">
            Meet Your <span className="text-gradient-neon">AI Cofounder</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Not just automation — a thinking partner that knows your business and gets things done.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                className={`group relative glass rounded-xl p-6 transition-shadow duration-500 ${
                  card.accent === "neon" ? "hover:glow-neon" : "hover:glow-accent"
                }`}
                initial={{ opacity: 0, y: 40 + i * 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`inline-flex p-2 rounded-lg mb-6 ${card.accent === "neon" ? "bg-neon/10" : "bg-electric/10"}`}>
                  <Icon className={`w-5 h-5 ${card.accent === "neon" ? "text-neon" : "text-electric"}`} />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
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
            Meet Your AI Cofounder →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

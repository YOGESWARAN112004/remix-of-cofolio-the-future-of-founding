import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, CheckCircle2, Code2 } from "lucide-react";

const chatMessages = [
  { user: "You", msg: "Ship the landing page 🔥", delay: 0 },
  { user: "Cofounder AI", msg: "Deployed. Also filed your GST return.", delay: 1.5 },
  { user: "Ops Agent", msg: "Compliance check passed ✅", delay: 3 },
];

const kanbanCards = [
  { title: "Auth Flow", status: "done" },
  { title: "GST Filing", status: "progress" },
  { title: "Investor Update", status: "todo" },
];

function TypingCursor() {
  const [text, setText] = useState("");
  const code = 'const cofounder = await cofolio.spawn("ops-agent");';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(code.slice(0, i + 1));
      i++;
      if (i >= code.length) {
        setTimeout(() => { i = 0; setText(""); }, 2000);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-sm text-neon/80">
      <span>{text}</span>
      <span className="animate-pulse">|</span>
    </div>
  );
}

export default function WarRoomSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -5]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);

  return (
    <section ref={ref} className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-neon text-sm tracking-[0.3em] uppercase mb-4">The War Room</p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
            Where Your Company <span className="text-gradient-neon">Comes Alive</span>
          </h2>
        </motion.div>

        <motion.div
          className="relative"
          style={{ rotateX, y, perspective: "1200px" }}
        >
          <div className="glass rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-4">
                <MessageSquare className="w-4 h-4" /> Team Chat
              </div>
              {chatMessages.map((m, i) => (
                <motion.div
                  key={i}
                  className="glass rounded-lg p-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: m.delay * 0.3 + 0.5 }}
                >
                  <span className="text-neon text-xs font-semibold">{m.user}</span>
                  <p className="text-foreground/80 text-sm mt-1">{m.msg}</p>
                </motion.div>
              ))}
            </div>

            {/* Kanban */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-4 h-4" /> Sprint Board
              </div>
              {kanbanCards.map((card, i) => (
                <motion.div
                  key={i}
                  className={`rounded-lg p-3 border ${card.status === "done"
                      ? "border-neon/30 bg-neon/5"
                      : card.status === "progress"
                        ? "border-electric/30 bg-electric/5"
                        : "border-border bg-secondary/50"
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.2 }}
                >
                  <p className="text-sm text-foreground">{card.title}</p>
                  <span className={`text-xs mt-1 inline-block ${card.status === "done" ? "text-neon" : card.status === "progress" ? "text-electric" : "text-muted-foreground"
                    }`}>
                    {card.status === "done" ? "✓ Done" : card.status === "progress" ? "→ In Progress" : "○ To Do"}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Live Code */}
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider mb-4">
                <Code2 className="w-4 h-4" /> Live Code
              </div>
              <div className="glass rounded-lg p-4 h-40 flex items-center">
                <TypingCursor />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="px-8 py-3.5 rounded-full bg-neon/10 border border-neon/30 text-neon font-semibold text-sm hover:bg-neon/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Early Access →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

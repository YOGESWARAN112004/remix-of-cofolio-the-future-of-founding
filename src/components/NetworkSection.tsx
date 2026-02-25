import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { label: "Teams Formed", value: 1402, suffix: "" },
  { label: "Lines Shipped", value: 8200000, suffix: "", format: true },
  { label: "Universities", value: 127, suffix: "+" },
];

function Counter({ target, format }: { target: number; format?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  const display = format
    ? count >= 1000000
      ? `${(count / 1000000).toFixed(1)}M`
      : count >= 1000
      ? `${(count / 1000).toFixed(0)}K`
      : count.toLocaleString()
    : count.toLocaleString();

  return <span ref={ref}>{display}</span>;
}

// Simple network nodes visualization
function NetworkVisualization() {
  const nodes = Array.from({ length: 24 }, (_, i) => ({
    x: 50 + 35 * Math.cos((i / 24) * Math.PI * 2 + Math.random() * 0.5),
    y: 50 + 35 * Math.sin((i / 24) * Math.PI * 2 + Math.random() * 0.5),
    size: 2 + Math.random() * 3,
  }));

  return (
    <svg viewBox="0 0 100 100" className="w-full max-w-md mx-auto opacity-40">
      {/* Connection lines */}
      {nodes.map((node, i) =>
        nodes.slice(i + 1).filter(() => Math.random() > 0.7).map((target, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={node.x} y1={node.y}
            x2={target.x} y2={target.y}
            stroke="hsl(82, 100%, 55%)"
            strokeWidth="0.15"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: Math.random() * 1 }}
          />
        ))
      )}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.x} cy={node.y} r={node.size * 0.3}
          fill="hsl(82, 100%, 55%)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.6, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.05 }}
        />
      ))}
    </svg>
  );
}

export default function NetworkSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-neon text-sm tracking-[0.3em] uppercase mb-4">The Network</p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground mb-16">
            A Global <span className="text-gradient-neon">Movement</span>
          </h2>
        </motion.div>

        <NetworkVisualization />

        <div className="grid grid-cols-3 gap-8 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15 }}
            >
              <div className="text-3xl sm:text-5xl font-bold text-foreground mb-2">
                <Counter target={stat.value} format={stat.format} />
                {stat.suffix}
              </div>
              <p className="text-sm text-muted-foreground tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

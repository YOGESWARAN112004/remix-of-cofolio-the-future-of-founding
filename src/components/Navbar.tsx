import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-neon/20 flex items-center justify-center">
          <span className="text-neon font-bold text-sm">C</span>
        </div>
        <span className="text-foreground font-bold text-lg tracking-tight">cofolio</span>
      </div>

      <div className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#" className="hover:text-foreground transition-colors">Features</a>
        <a href="#" className="hover:text-foreground transition-colors">Community</a>
        <a href="#" className="hover:text-foreground transition-colors">Docs</a>
      </div>

      <motion.button
        className="px-5 py-2 rounded-full text-sm font-medium border border-border text-foreground hover:border-neon/50 hover:text-neon transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.button>
    </motion.nav>
  );
}

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Bot, Workflow } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center pt-32 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-muted-foreground">Available for new projects · Q2</span>
          </div>

          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Building modern websites &{" "}
            <span className="gradient-text animate-gradient bg-gradient-to-r from-primary via-accent to-primary">
              AI-powered
            </span>{" "}
            solutions.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            I help local businesses and startups ship premium web experiences, intelligent
            automations, and AI products that actually move the needle.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-6 py-3 text-sm font-medium text-background transition-all hover:bg-[position:100%_0] hover:shadow-[0_0_40px_-5px_oklch(0.72_0.25_295/0.8)]"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/10"
            >
              Contact me
            </a>
          </div>
        </motion.div>

        {/* Floating cards */}
        <div className="relative mx-auto mt-24 hidden h-[280px] max-w-5xl md:block">
          {[
            { icon: Code2, label: "Web Dev", x: "-44%", y: 0, delay: 0 },
            { icon: Bot, label: "AI Agents", x: "-12%", y: -40, delay: 0.2, glow: true },
            { icon: Workflow, label: "Automation", x: "20%", y: -10, delay: 0.4 },
            { icon: Sparkles, label: "UI / UX", x: "52%", y: -50, delay: 0.6 },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: card.delay }}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${card.x}, ${card.y}px)` }}
            >
              <div
                className={`animate-float glass-strong flex h-32 w-44 flex-col justify-between rounded-2xl p-5 ${
                  card.glow ? "glow-purple" : ""
                }`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <card.icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Service</p>
                  <p className="font-display text-lg font-semibold">{card.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

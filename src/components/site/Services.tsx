import { motion } from "framer-motion";
import { Code2, Bot, Brain, Plug, Palette, Workflow } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Business sites, portfolios, e-commerce, custom web apps, and landing pages — all hand-built for performance.",
    items: ["Business websites", "E-commerce", "Custom web apps", "Landing pages"],
  },
  {
    icon: Workflow,
    title: "AI Automation",
    desc: "Replace repetitive ops with intelligent workflows that connect your tools, route work, and report back.",
    items: ["Workflow automation", "Smart routing", "Business process bots", "AI dashboards"],
  },
  {
    icon: Bot,
    title: "AI-Powered Apps",
    desc: "Custom AI chatbots, assistants, search and recommendation systems built around your product and data.",
    items: ["Chatbots", "AI assistants", "Smart search", "Recommendations"],
  },
  {
    icon: Plug,
    title: "AI Integration",
    desc: "Embed GPT, vector search, analytics and assistants into your existing stack without breaking it.",
    items: ["ChatGPT integration", "AI support", "AI analytics", "RAG pipelines"],
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "Premium interfaces, dashboards and design systems responsive, accessible, and a joy to use.",
    items: ["Design systems", "Dashboards", "Responsive UI", "Interactive prototypes"],
  },
  {
    icon: Brain,
    title: "Strategy & Audits",
    desc: "Not sure where AI fits? I audit your workflows and map a pragmatic roadmap with real ROI.",
    items: ["AI roadmaps", "Tech audits", "Architecture review", "Hands-on workshops"],
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Services</p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Everything you need to ship a{" "}
            <span className="gradient-text">modern, intelligent</span> product.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you're starting from scratch or layering AI onto an existing platform,
            I can take it from idea to production.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-3xl glass p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/30"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.72 0.25 295 / 0.18), transparent 40%)" }} />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 ring-1 ring-white/10 transition-all group-hover:from-primary/40 group-hover:to-accent/40 group-hover:shadow-[0_0_30px_-5px_oklch(0.72_0.25_295/0.6)]">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <ul className="mt-5 space-y-1.5 border-t border-white/5 pt-4 text-sm text-muted-foreground">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

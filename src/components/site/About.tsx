import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0);

  const ref = useRef<HTMLSpanElement>(null);

  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;

        const dur = 1400;

        const start = performance.now();

        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);

          const eased = 1 - Math.pow(1 - p, 3);

          setN(Math.round(to * eased));

          if (p < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      }
    });

    if (ref.current) obs.observe(ref.current);

    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const stats = [
    {
      value: 80,
      suffix: "+",
      label: t("about.stats.projects"),
    },

    {
      value: 40,
      suffix: "+",
      label: t("about.stats.technologies"),
    },

    {
      value: 25,
      suffix: "+",
      label: t("about.stats.aiSolutions"),
    },

    {
      value: 99,
      suffix: "%",
      label: t("about.stats.satisfaction"),
    },
  ];

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "OpenAI",
    "LangChain",
    "Tailwind",
    "Framer Motion",
    "n8n",
    "PostgreSQL",
    "AWS",
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={isArabic ? "text-right" : ""}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary">{t("about.tag")}</p>

            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              {t("about.title1")} <span className="gradient-text">{t("about.titleHighlight")}</span>
              {t("about.title2")}
            </h2>

            <p className="mt-6 text-muted-foreground">{t("about.description1")}</p>

            <p className="mt-4 text-muted-foreground">{t("about.description2")}</p>

            <div className={`mt-8 flex flex-wrap gap-2 ${isArabic ? "justify-end" : ""}`}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full glass px-3 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:border-primary/30"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative">
                  <p className="font-display text-4xl font-semibold md:text-5xl">
                    <span className="gradient-text">
                      <Counter to={s.value} suffix={s.suffix} />
                    </span>
                  </p>

                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

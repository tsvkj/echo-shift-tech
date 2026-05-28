import { motion } from "framer-motion";
import { Code2, Bot, Brain, Plug, Palette, Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Services() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const services = [
    {
      icon: Code2,
      title: t("services.cards.web.title"),
      desc: t("services.cards.web.desc"),
      items: [
        t("services.cards.web.items.0"),
        t("services.cards.web.items.1"),
        t("services.cards.web.items.2"),
        t("services.cards.web.items.3"),
      ],
    },
    {
      icon: Workflow,
      title: t("services.cards.automation.title"),
      desc: t("services.cards.automation.desc"),
      items: [
        t("services.cards.automation.items.0"),
        t("services.cards.automation.items.1"),
        t("services.cards.automation.items.2"),
        t("services.cards.automation.items.3"),
      ],
    },
    {
      icon: Bot,
      title: t("services.cards.aiApps.title"),
      desc: t("services.cards.aiApps.desc"),
      items: [
        t("services.cards.aiApps.items.0"),
        t("services.cards.aiApps.items.1"),
        t("services.cards.aiApps.items.2"),
        t("services.cards.aiApps.items.3"),
      ],
    },
    {
      icon: Plug,
      title: t("services.cards.integration.title"),
      desc: t("services.cards.integration.desc"),
      items: [
        t("services.cards.integration.items.0"),
        t("services.cards.integration.items.1"),
        t("services.cards.integration.items.2"),
        t("services.cards.integration.items.3"),
      ],
    },
    {
      icon: Palette,
      title: t("services.cards.design.title"),
      desc: t("services.cards.design.desc"),
      items: [
        t("services.cards.design.items.0"),
        t("services.cards.design.items.1"),
        t("services.cards.design.items.2"),
        t("services.cards.design.items.3"),
      ],
    },
    {
      icon: Brain,
      title: t("services.cards.strategy.title"),
      desc: t("services.cards.strategy.desc"),
      items: [
        t("services.cards.strategy.items.0"),
        t("services.cards.strategy.items.1"),
        t("services.cards.strategy.items.2"),
        t("services.cards.strategy.items.3"),
      ],
    },
  ];

  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mx-auto max-w-3xl text-center ${
            isArabic ? "rtl" : ""
          }`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            {t("services.badge")}
          </p>

          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            {t("services.title1")}{" "}
            <span className="gradient-text">
              {t("services.titleHighlight")}
            </span>{" "}
            {t("services.title2")}
          </h2>

          <p className="mt-4 text-muted-foreground">
            {t("services.description")}
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
              <div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), oklch(0.72 0.25 295 / 0.18), transparent 40%)",
                }}
              />

              <div className={`relative ${isArabic ? "text-right" : ""}`}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 ring-1 ring-white/10 transition-all group-hover:from-primary/40 group-hover:to-accent/40 group-hover:shadow-[0_0_30px_-5px_oklch(0.72_0.25_295/0.6)]">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold">
                  {s.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {s.desc}
                </p>

                <ul className="mt-5 space-y-1.5 border-t border-white/5 pt-4 text-sm text-muted-foreground">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className={`flex items-center gap-2 ${
                        isArabic ? "flex-row-reverse justify-end" : ""
                      }`}
                    >
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
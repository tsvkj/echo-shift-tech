import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  return (
    <section className="relative flex min-h-screen items-center pt-32 pb-20">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`mx-auto max-w-4xl ${isArabic ? "text-right" : "text-center"}`}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>

            <span className="text-muted-foreground">{t("hero.badge")}</span>
          </div>

          <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            {t("hero.title1")}{" "}
            <span className="gradient-text animate-gradient bg-gradient-to-r from-primary via-accent to-primary">
              {t("hero.titleHighlight")}
            </span>{" "}
            {t("hero.title2")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-6 py-3 text-sm font-medium text-background transition-all hover:bg-[position:100%_0] hover:shadow-[0_0_40px_-5px_oklch(0.72_0.25_295/0.8)]"
            >
              {t("hero.viewWork")}

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/10"
            >
              {t("hero.contact")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

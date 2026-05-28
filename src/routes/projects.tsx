import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectModal } from "@/components/site/ProjectModal";
import { projectsService, type Project, type LocalizedString } from "@/services/projectsService";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      {
        title: "Projects — Nova.dev",
      },
      {
        name: "description",
        content: "A curated selection of web, AI, and automation projects.",
      },
      {
        property: "og:title",
        content: "Projects — Nova.dev",
      },
      {
        property: "og:description",
        content: "A curated selection of web, AI, and automation projects.",
      },
    ],
  }),

  component: ProjectsPage,
});

const CATEGORIES = ["All", "Web", "AI", "Automation", "UI/UX"] as const;

function getLocalized(text: LocalizedString, lang: string) {
  return text?.[lang as "en" | "ar"] ?? text?.en ?? "";
}

function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [query, setQuery] = useState("");

  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const [active, setActive] = useState<Project | null>(null);

  const { t, i18n } = useTranslation();

  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  const isArabic = lang === "ar";

  useEffect(() => {
    projectsService.list().then(setItems);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;

      const q = query.trim().toLowerCase();

      const title = getLocalized(p.title, lang).toLowerCase();

      const shortDescription = getLocalized(p.shortDescription, lang).toLowerCase();

      const matchQ =
        !q ||
        title.includes(q) ||
        shortDescription.includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchQ;
    });
  }, [items, query, cat, lang]);

  return (
    <section className="relative pb-32 pt-36">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mx-auto max-w-3xl ${isArabic ? "text-right" : "text-center"}`}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            {t("projectsPage.badge")}
          </p>

          <h1 className="mt-4 font-display text-5xl font-semibold md:text-6xl">
            {t("projectsPage.title1")}{" "}
            <span className="gradient-text">{t("projectsPage.highlight")}</span>.
          </h1>

          <p className="mt-4 text-muted-foreground">{t("projectsPage.description")}</p>
        </motion.div>

        {/* FILTERS */}
        <div className="mt-12 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* SEARCH */}
          <div
            className={`flex items-center gap-2 rounded-2xl glass px-4 py-2.5 md:w-80 ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <Search className="h-4 w-4 text-muted-foreground" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("projectsPage.search")}
              className={`w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground ${
                isArabic ? "text-right" : ""
              }`}
            />
          </div>

          {/* CATEGORIES */}
          <div className={`flex flex-wrap gap-1.5 ${isArabic ? "justify-end" : ""}`}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  cat === c
                    ? "bg-linear-to-r from-primary to-accent text-background"
                    : "glass hover:bg-primary/10"
                }`}
              >
                {t(`projectsPage.categories.${c}`)}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p._id} project={p} onOpen={setActive} index={i} />
          ))}
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <p
            className={`mt-16 text-sm text-muted-foreground ${
              isArabic ? "text-right" : "text-center"
            }`}
          >
            {t("projectsPage.empty")}
          </p>
        )}
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

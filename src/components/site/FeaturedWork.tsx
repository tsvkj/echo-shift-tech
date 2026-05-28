import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { projectsService, type Project } from "@/services/projectsService";

import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<Project | null>(null);

  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await projectsService.featured();

        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          {/* TEXT */}
          <div className={`max-w-2xl ${isArabic ? "text-right" : "text-left"}`}>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">
              {t("featured.badge")}
            </p>

            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              {t("featured.title1")}{" "}
              <span className="gradient-text">
                {t("featured.highlight")}
              </span>
              .
            </h2>
          </div>

          {/* BUTTON */}
          <div className={isArabic ? "self-end" : "self-start"}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium transition-all hover:border-primary/40 hover:bg-primary/10"
            >
              {t("featured.viewAll")}

              <ArrowRight
                className={`h-4 w-4 transition-transform ${
                  isArabic
                    ? "rotate-180 group-hover:-translate-x-1"
                    : "group-hover:translate-x-1"
                }`}
              />
            </Link>
          </div>
        </motion.div>

        {/* PROJECTS */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.length === 0 ? (
            <p
              className={`text-sm text-muted-foreground ${
                isArabic ? "text-right" : ""
              }`}
            >
              {t("featured.empty")}
            </p>
          ) : (
            projects.map((p, i) => (
              <ProjectCard
                key={p._id}
                project={p}
                onOpen={setActive}
                index={i}
              />
            ))
          )}
        </div>
      </div>

      {active && (
        <ProjectModal
          project={active}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}

import { motion } from "framer-motion";
import { ArrowUpRight, Eye } from "lucide-react";
import type { Project, LocalizedString } from "@/services/projectsService";
import { useTranslation } from "react-i18next";

function getLocalized(text: LocalizedString, lang: string) {
  const normalizedLang = lang.startsWith("ar") ? "ar" : "en";

  return text?.[normalizedLang] ?? text?.en ?? "";
}

export function ProjectCard({
  project,
  onOpen,
  index = 0,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  index?: number;
}) {
  const { t, i18n } = useTranslation();

  const title = getLocalized(project.title, i18n.language);

  const shortDescription = getLocalized(
    project.shortDescription,
    i18n.language,
  );

  const main =
    project.images.find((i) => i.isMain) ?? project.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_-20px_oklch(0.72_0.25_295/0.4)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {main?.url ? (
          <img
            src={main.url}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-primary/20 to-accent/20" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full glass-strong px-3 py-1 text-xs">
          {project.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold leading-tight">
            {title}
          </h3>

          <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex gap-2">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2 text-center text-xs font-medium text-background"
            >
              {t("projects.visit")}
            </a>
          )}

          <button
            onClick={() => onOpen(project)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl glass px-4 py-2 text-xs font-medium hover:bg-primary/10"
          >
            <Eye className="h-3.5 w-3.5" />
            {t("projects.details")}
          </button>
        </div>
      </div>
    </motion.article>
  );
}


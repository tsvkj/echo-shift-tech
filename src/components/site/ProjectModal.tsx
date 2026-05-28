import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Project, LocalizedString } from "@/services/projectsService";

function getLocalized(text: LocalizedString, lang: string) {
  return text?.[lang as "en" | "ar"] ?? text?.en ?? "";
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation();

  const lang = i18n.language.startsWith("ar") ? "ar" : "en";

  const title = getLocalized(project.title, lang);
  const shortDescription = getLocalized(project.shortDescription, lang);
  const description = getLocalized(project.description, lang);

  const [idx, setIdx] = useState(0);

  const images = useMemo(() => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images.filter((img) => img?.url);
    }

    return [
      {
        id: "placeholder",
        url: "https://via.placeholder.com/1200x800?text=No+Image",
        caption: "",
        isMain: true,
      },
    ];
  }, [project.images]);

  useEffect(() => {
    const mainIndex = images.findIndex((img) => img.isMain);

    setIdx(mainIndex >= 0 ? mainIndex : 0);
  }, [images]);

  useEffect(() => {
    if (idx > images.length - 1) {
      setIdx(0);
    }
  }, [images.length, idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setIdx((i) => (i + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        setIdx((i) => (i - 1 + images.length) % images.length);
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, onClose]);

  const currentImage = images[idx] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-80 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}
          transition={{
            type: "spring",
            damping: 24,
            stiffness: 220,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl glass-strong md:h-[88vh] md:flex-row"
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full glass-strong hover:bg-primary/20"
          >
            <X className="h-4 w-4" />
          </button>

          {/* IMAGE SECTION */}
          <div className="relative aspect-video w-full shrink-0 bg-black/40 md:h-full md:w-[62%] md:aspect-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage.url + idx}
                src={currentImage.url}
                alt={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </AnimatePresence>

            {/* NAVIGATION */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setIdx((i) => (i - 1 + images.length) % images.length)
                  }
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 backdrop-blur hover:bg-black/80"
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>

                <button
                  onClick={() => setIdx((i) => (i + 1) % images.length)}
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 backdrop-blur hover:bg-black/80"
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </>
            )}

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/40 px-3 py-2 backdrop-blur">
                {images.map((img, i) => (
                  <button
                    key={img._id || img.id || i}
                    onClick={() => setIdx(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      i === idx
                        ? "w-8 bg-white"
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-6 md:p-8">
            {/* CATEGORY */}
            <p className="text-xs uppercase tracking-widest text-primary">
              {project.category}
            </p>

            {/* TITLE */}
            <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
              {title}
            </h3>

            {/* SHORT DESC */}
            <p className="mt-3 text-base text-foreground/90">
              {shortDescription}
            </p>

            {/* DESCRIPTION */}
            <div className="mt-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                {t("projects.about")}
              </p>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                {description}
              </p>
            </div>

            {/* TECHNOLOGIES */}
            {project.technologies.length > 0 && (
              <div className="mt-7">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("projects.technologies")}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full glass px-3 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* FEATURES */}
            {project.features?.length > 0 && (
              <div className="mt-7">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("projects.features")}
                </p>

                <ul className="mt-3 space-y-2">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="rounded-xl glass px-4 py-2 text-sm text-foreground/90"
                    >
                      • {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* BUTTON */}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-background"
              >
                {t("projects.visit")}

                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
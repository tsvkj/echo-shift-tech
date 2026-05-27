import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/services/projectsService";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);

  // 🔥 Better image fallback handling
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

  // 🔥 Auto select main image first
  useEffect(() => {
    const mainIndex = images.findIndex((img) => img.isMain);

    if (mainIndex >= 0) {
      setIdx(mainIndex);
    } else {
      setIdx(0);
    }
  }, [images]);

  // 🔥 Keep index safe
  useEffect(() => {
    if (idx > images.length - 1) {
      setIdx(0);
    }
  }, [images.length, idx]);

  // 🔥 Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

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
          className="relative max-h-[92vh] w-full max-w-7xl overflow-hidden rounded-3xl glass-strong"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full glass-strong transition-colors hover:bg-primary/20"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col md:flex-row max-h-[92vh]">
            {/* IMAGE SECTION — 70% */}
            <div className="relative bg-black/40 md:w-[60%] shrink-0">
              <div className="relative w-full h-64 md:h-full min-h-125">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage.id || currentImage.url || idx}
                    src={currentImage.url}
                    alt={currentImage.caption || project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </AnimatePresence>

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/20 shadow-lg transition-colors hover:bg-primary/40"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                    </button>

                    <button
                      onClick={() => setIdx((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/20 shadow-lg transition-colors hover:bg-primary/40"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5 text-white" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIdx(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === idx ? "w-6 bg-primary" : "w-1.5 bg-white/40"
                          }`}
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Caption — solid bar at the bottom, always visible when present */}
                {currentImage.caption && (
                  <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/70 px-4 py-2.5">
                    <p className="text-xs text-white/90 text-center truncate">
                      {currentImage.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* DETAILS SECTION — 30% */}
            <div className="md:w-[30%] shrink-0 overflow-y-auto p-7 md:p-9">
              <p className="text-xs uppercase tracking-widest text-primary">{project.category}</p>

              <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                {project.title}
              </h3>

              {project.shortDescription && (
                <p className="mt-3 text-base text-foreground/90">{project.shortDescription}</p>
              )}

              <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>

              {/* FEATURES */}
              {project.features && project.features.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Features
                  </p>

                  <ul className="mt-3 space-y-2 text-sm">
                    {project.features.map((f, i) => (
                      <li key={`${f}-${i}`} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* TECH */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Technologies
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="rounded-full glass px-3 py-1 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* LINK */}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-background transition-all hover:shadow-[0_0_30px_-5px_oklch(0.72_0.25_295/0.8)]"
                >
                  Visit project
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

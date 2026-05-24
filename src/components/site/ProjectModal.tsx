import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "@/services/projectsService";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const images = project.images.length ? project.images : [{ id: "x", url: "" }];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [images.length, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", damping: 24, stiffness: 220 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl glass-strong"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full glass-strong transition-colors hover:bg-primary/20"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-2">
            {/* Gallery */}
            <div className="relative bg-black/40">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[idx].id}
                    src={images[idx].url}
                    alt={images[idx].caption ?? project.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full glass-strong p-2 hover:bg-primary/20"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIdx((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full glass-strong p-2 hover:bg-primary/20"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setIdx(i)}
                          className={`h-1.5 rounded-full transition-all ${
                            i === idx ? "w-6 bg-primary" : "w-1.5 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {images[idx].caption && (
                <p className="absolute left-3 top-3 rounded-full glass px-3 py-1 text-xs">
                  {images[idx].caption}
                </p>
              )}
            </div>

            {/* Details */}
            <div className="p-7 md:p-9">
              <p className="text-xs uppercase tracking-widest text-primary">{project.category}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{project.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Features</p>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Tech</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span key={t} className="rounded-full glass px-2.5 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-background hover:shadow-[0_0_30px_-5px_oklch(0.72_0.25_295/0.8)]"
                >
                  Visit project <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GripVertical, Plus, Star, Trash2, Upload, X } from "lucide-react";
import type { Project, ProjectImage } from "@/services/projectsService";

type Draft = Omit<Project, "id" | "createdAt"> & { id?: string };

const EMPTY: Draft = {
  title: "",
  shortDescription: "",
  description: "",
  technologies: [],
  projectUrl: "",
  category: "Web",
  featured: false,
  images: [],
  features: [],
};

export function ProjectFormModal({
  initial,
  onClose,
  onSave,
}: {
  initial?: Project;
  onClose: () => void;
  onSave: (draft: Draft) => void;
}) {
  const [draft, setDraft] = useState<Draft>(initial ?? EMPTY);
  const [techInput, setTechInput] = useState("");
  const [featInput, setFeatInput] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const onFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img: ProjectImage = {
          id: crypto.randomUUID(),
          url: reader.result as string,
          caption: "",
          isMain: draft.images.length === 0,
        };
        setDraft((d) => ({ ...d, images: [...d.images, img] }));
      };
      reader.readAsDataURL(file);
    });
  };

  const setMain = (id: string) =>
    setDraft((d) => ({ ...d, images: d.images.map((i) => ({ ...i, isMain: i.id === id })) }));

  const removeImage = (id: string) =>
    setDraft((d) => {
      const next = d.images.filter((i) => i.id !== id);
      if (!next.some((i) => i.isMain) && next.length) next[0].isMain = true;
      return { ...d, images: next };
    });

  const move = (id: string, dir: -1 | 1) =>
    setDraft((d) => {
      const arr = [...d.images];
      const i = arr.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return d;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...d, images: arr };
    });

  const addTech = () => {
    const v = techInput.trim();
    if (!v) return;
    setDraft((d) => ({ ...d, technologies: [...d.technologies, v] }));
    setTechInput("");
  };
  const addFeat = () => {
    const v = featInput.trim();
    if (!v) return;
    setDraft((d) => ({ ...d, features: [...d.features, v] }));
    setFeatInput("");
  };

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
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass-strong p-7"
        >
          <button onClick={onClose} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass hover:bg-primary/20">
            <X className="h-4 w-4" />
          </button>
          <h2 className="font-display text-2xl font-semibold">
            {initial ? "Edit project" : "New project"}
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <input className="w-full bg-transparent text-sm outline-none" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
            </Field>
            <Field label="Category">
              <select
                className="w-full bg-transparent text-sm outline-none"
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value as Project["category"] })}
              >
                {["Web", "AI", "Automation", "UI/UX"].map((c) => (
                  <option key={c} value={c} className="bg-background">{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Project URL" className="md:col-span-2">
              <input className="w-full bg-transparent text-sm outline-none" value={draft.projectUrl} onChange={(e) => setDraft({ ...draft, projectUrl: e.target.value })} placeholder="https://…" />
            </Field>
            <Field label="Short description" className="md:col-span-2">
              <input className="w-full bg-transparent text-sm outline-none" value={draft.shortDescription} onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })} />
            </Field>
            <Field label="Detailed description" className="md:col-span-2">
              <textarea rows={5} className="w-full resize-none bg-transparent text-sm outline-none" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
            </Field>
          </div>

          {/* Tech tags */}
          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Technologies</p>
            <div className="mt-2 flex gap-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                className="flex-1 rounded-xl glass px-3 py-2 text-sm outline-none"
                placeholder="Add and press Enter"
              />
              <button type="button" onClick={addTech} className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 text-sm font-medium text-background">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {draft.technologies.map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1 rounded-full glass px-2.5 py-1 text-xs">
                  {t}
                  <button onClick={() => setDraft({ ...draft, technologies: draft.technologies.filter((_, x) => x !== i) })}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Features</p>
            <div className="mt-2 flex gap-2">
              <input
                value={featInput}
                onChange={(e) => setFeatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeat())}
                className="flex-1 rounded-xl glass px-3 py-2 text-sm outline-none"
                placeholder="Add and press Enter"
              />
              <button type="button" onClick={addFeat} className="rounded-xl bg-gradient-to-r from-primary to-accent px-4 text-sm font-medium text-background">Add</button>
            </div>
            <ul className="mt-2 space-y-1 text-sm">
              {draft.features.map((f, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg glass px-3 py-1.5">
                  <span>{f}</span>
                  <button onClick={() => setDraft({ ...draft, features: draft.features.filter((_, x) => x !== i) })}>
                    <X className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Images */}
          <div className="mt-5">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Images</p>
            <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/5 px-5 py-8 text-sm text-muted-foreground hover:border-primary/40 hover:bg-primary/5">
              <Upload className="h-4 w-4" /> Upload images (preview only — local)
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
            </label>

            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {draft.images.map((img) => (
                <div key={img.id} className="group relative overflow-hidden rounded-2xl glass">
                  <img src={img.url} alt="" className="h-32 w-full object-cover" />
                  <div className="p-2 space-y-2">
                    <input
                      placeholder="Caption / label"
                      value={img.caption ?? ""}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          images: d.images.map((i) => (i.id === img.id ? { ...i, caption: e.target.value } : i)),
                        }))
                      }
                      className="w-full rounded-lg bg-white/5 px-2 py-1 text-xs outline-none"
                    />
                    <div className="flex items-center justify-between gap-1">
                      <button onClick={() => setMain(img.id)} title="Set as main" className={`flex h-7 w-7 items-center justify-center rounded-md ${img.isMain ? "bg-primary text-background" : "glass hover:bg-primary/10"}`}>
                        <Star className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex gap-1">
                        <button onClick={() => move(img.id, -1)} className="flex h-7 w-7 items-center justify-center rounded-md glass hover:bg-primary/10">
                          <GripVertical className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => removeImage(img.id)} className="flex h-7 w-7 items-center justify-center rounded-md glass text-destructive hover:bg-destructive/20">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                className="h-4 w-4 accent-[oklch(0.72_0.25_295)]"
              />
              Feature on homepage
            </label>
            <div className="flex gap-2">
              <button onClick={onClose} className="rounded-full glass px-5 py-2.5 text-sm">Cancel</button>
              <button
                onClick={() => onSave(draft)}
                disabled={!draft.title}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-background disabled:opacity-60"
              >
                <Plus className="h-4 w-4" /> Save
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block rounded-2xl glass px-4 py-3 ${className}`}>
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

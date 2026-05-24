import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProjectModal } from "@/components/site/ProjectModal";
import { projectsService, type Project } from "@/services/projectsService";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Nova.dev" },
      { name: "description", content: "A curated selection of web, AI, and automation projects." },
      { property: "og:title", content: "Projects — Nova.dev" },
      { property: "og:description", content: "A curated selection of web, AI, and automation projects." },
    ],
  }),
  component: ProjectsPage,
});

const CATEGORIES = ["All", "Web", "AI", "Automation", "UI/UX"] as const;

function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    projectsService.list().then(setItems);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchQ;
    });
  }, [items, query, cat]);

  return (
    <section className="relative pt-36 pb-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary">All Projects</p>
          <h1 className="mt-4 font-display text-5xl font-semibold md:text-6xl">
            The full <span className="gradient-text">portfolio</span>.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Search, filter, and dive into every shipped project.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-col items-stretch justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-2 rounded-2xl glass px-4 py-2.5 md:w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  cat === c
                    ? "bg-gradient-to-r from-primary to-accent text-background"
                    : "glass hover:bg-primary/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={setActive} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No projects match your filter.
          </p>
        )}
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

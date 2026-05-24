import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { projectsService, type Project } from "@/services/projectsService";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    projectsService.featured().then(setProjects);
  }, []);

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-end justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Featured work</p>
            <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
              Recent projects I'm <span className="gradient-text">proud of</span>.
            </h2>
          </div>
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium hover:border-primary/40 hover:bg-primary/10"
          >
            View all work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} onOpen={setActive} index={i} />
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}

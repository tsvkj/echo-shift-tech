// Abstracted "API" — swap with real backend (Express + MongoDB + Cloudinary) later.
// All methods are async to match a future real-API signature.

export interface ProjectImage {
  id: string;
  url: string; // data URL today, Cloudinary URL later
  caption?: string;
  isMain?: boolean;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  projectUrl: string;
  category: "Web" | "AI" | "Automation" | "UI/UX";
  featured: boolean;
  images: ProjectImage[];
  features: string[];
  createdAt: number;
}

const STORAGE_KEY = "portfolio.projects.v1";

const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Aurora — AI Customer Support",
    shortDescription: "GPT-powered support bot deployed across 12 SMB websites.",
    description:
      "A multi-tenant AI customer support platform built for local service businesses. Combines GPT-4 with retrieval over each client's knowledge base, automatic ticket routing, and a live agent handoff. Reduced average response time from 4 hours to 30 seconds for the pilot clients.",
    technologies: ["Next.js", "OpenAI", "Pinecone", "Node.js", "MongoDB"],
    projectUrl: "https://example.com",
    category: "AI",
    featured: true,
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80", isMain: true, caption: "Dashboard" },
      { id: "2", url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80", caption: "Chat UI" },
    ],
    features: ["RAG over private knowledge base", "Live agent handoff", "Multi-language", "Analytics dashboard"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: "p2",
    title: "Nimbus Commerce",
    shortDescription: "High-conversion headless e-commerce for a local boutique.",
    description:
      "Full-stack headless commerce build with a custom checkout, instant search, and AI product recommendations. Increased conversion by 38% within the first quarter.",
    technologies: ["React", "Stripe", "Algolia", "Tailwind", "Express"],
    projectUrl: "https://example.com",
    category: "Web",
    featured: true,
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80", isMain: true },
      { id: "2", url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80" },
    ],
    features: ["Instant search", "AI recommendations", "Custom checkout", "Inventory sync"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: "p3",
    title: "Pulse — Ops Automation",
    shortDescription: "n8n + custom AI workflows that saved 60+ hours/week.",
    description:
      "An end-to-end operations automation suite for a logistics SMB. Connects email, CRM, invoicing, and Slack with AI-classified routing and anomaly alerts.",
    technologies: ["n8n", "OpenAI", "PostgreSQL", "Slack API"],
    projectUrl: "https://example.com",
    category: "Automation",
    featured: true,
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80", isMain: true },
    ],
    features: ["AI email classification", "Anomaly alerts", "CRM sync", "Real-time Slack notifications"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "p4",
    title: "Lumen Dashboard",
    shortDescription: "Premium analytics UI for a B2B SaaS startup.",
    description:
      "A bespoke analytics dashboard with real-time charts, custom theming, and a fluid motion system. Designed and built end-to-end.",
    technologies: ["React", "TypeScript", "Framer Motion", "D3"],
    projectUrl: "https://example.com",
    category: "UI/UX",
    featured: true,
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80", isMain: true },
      { id: "2", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80" },
    ],
    features: ["Real-time charts", "Theming engine", "Role-based access", "Export to PDF"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "p5",
    title: "Helix AI Assistant",
    shortDescription: "Voice + chat assistant embedded in a healthcare portal.",
    description:
      "Designed and shipped a voice-enabled AI assistant for patient scheduling and FAQs, integrated with the existing portal via custom APIs.",
    technologies: ["React", "Whisper", "OpenAI", "Node.js"],
    projectUrl: "https://example.com",
    category: "AI",
    featured: false,
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80", isMain: true },
    ],
    features: ["Voice + chat", "Scheduling integration", "HIPAA-aware design"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
  },
  {
    id: "p6",
    title: "Cobalt Landing",
    shortDescription: "Award-style landing page for a YC-backed startup.",
    description: "A motion-heavy landing page with custom WebGL hero and scroll-driven storytelling.",
    technologies: ["Next.js", "GSAP", "Three.js"],
    projectUrl: "https://example.com",
    category: "Web",
    featured: false,
    images: [
      { id: "1", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80", isMain: true },
    ],
    features: ["WebGL hero", "Scroll storytelling", "CMS-driven"],
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
  },
];

function isBrowser() {
  return typeof window !== "undefined";
}

function read(): Project[] {
  if (!isBrowser()) return seedProjects;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProjects));
      return seedProjects;
    }
    return JSON.parse(raw) as Project[];
  } catch {
    return seedProjects;
  }
}

function write(projects: Project[]) {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export const projectsService = {
  async list(): Promise<Project[]> {
    return read().sort((a, b) => b.createdAt - a.createdAt);
  },
  async featured(): Promise<Project[]> {
    return (await this.list()).filter((p) => p.featured).slice(0, 4);
  },
  async get(id: string): Promise<Project | undefined> {
    return read().find((p) => p.id === id);
  },
  async create(input: Omit<Project, "id" | "createdAt">): Promise<Project> {
    const project: Project = { ...input, id: crypto.randomUUID(), createdAt: Date.now() };
    write([project, ...read()]);
    return project;
  },
  async update(id: string, input: Partial<Project>): Promise<Project | undefined> {
    const items = read();
    const idx = items.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    items[idx] = { ...items[idx], ...input };
    write(items);
    return items[idx];
  },
  async remove(id: string): Promise<void> {
    write(read().filter((p) => p.id !== id));
  },
  async reset(): Promise<void> {
    write(seedProjects);
  },
};

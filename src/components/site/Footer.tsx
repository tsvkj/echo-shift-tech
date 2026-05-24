import { useRouterState } from "@tanstack/react-router";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const { location } = useRouterState();
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="font-display text-2xl font-semibold">
            Let's build something <span className="gradient-text">unforgettable</span>.
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Freelance web development and AI automation for ambitious teams and local businesses.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="mailto:hello@nova.dev" className="hover:text-primary">hello@nova.dev</a></li>
            <li><a href="tel:+10000000000" className="hover:text-primary">+1 (000) 000-0000</a></li>
            <li><a href="https://wa.me/10000000000" className="hover:text-primary">WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</p>
          <div className="mt-3 flex gap-2">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Mail, href: "mailto:hello@nova.dev" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-xl glass transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Nova.dev — Crafted with care.</p>
          <p>Built with React · TanStack · Framer Motion · Tailwind</p>
        </div>
      </div>
    </footer>
  );
}

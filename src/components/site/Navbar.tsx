import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { location } = useRouterState();

  // MUST be inside component
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const links = [
    { to: "/", label: t("navbar.home") },
    { to: "/projects", label: t("navbar.work") },
    { to: "/#services", label: t("navbar.services") },
    { to: "/#about", label: t("navbar.about") },
    { to: "/#contact", label: t("navbar.contact") },
  ];

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // RTL support
  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  // Hide navbar on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        hasScrolled ? "py-3" : "py-0"
      }`}
    >
      <div
        className={`mx-auto transition-all duration-300 ${
          hasScrolled ? "max-w-7xl px-4 md:px-8" : "max-w-none px-0"
        }`}
      >
        <div
          className={`flex items-center justify-between px-4 py-3 md:px-6 transition-all duration-300 ${
            hasScrolled
              ? "rounded-2xl border border-white/10 bg-background/95 shadow-lg backdrop-blur-xl supports-[backdrop-filter]:bg-background/80"
              : "rounded-none bg-transparent"
          }`}
        >
          {/* LOGO */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/40 blur-md transition-all group-hover:bg-primary/60" />

              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Sparkles
                  className="h-4 w-4 text-background"
                  strokeWidth={2.5}
                />
              </div>
            </div>

            <span className="font-display text-lg font-semibold tracking-tight">
              Nova<span className="gradient-text">.dev</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}

            {/* LANGUAGE SWITCHER */}
            <div className="ml-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
              <button
                onClick={() => i18n.changeLanguage("en")}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  !isArabic
                    ? "bg-primary text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => i18n.changeLanguage("ar")}
                className={`rounded-full px-3 py-1 text-xs transition-all ${
                  isArabic
                    ? "bg-primary text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                AR
              </button>
            </div>
          </nav>

          {/* HIRE BUTTON */}
          <div className="hidden md:block">
            <Link
              to="/#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-[position:100%_0] hover:shadow-[0_0_30px_-5px_oklch(0.72_0.25_295/0.7)]"
            >
              {t("navbar.hire")}
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-foreground md:hidden"
            aria-label="Menu"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-2 overflow-hidden rounded-2xl glass-strong p-3 md:hidden"
            >
              <nav className="flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-xl px-4 py-3 text-sm text-foreground hover:bg-white/5"
                  >
                    {l.label}
                  </Link>
                ))}

                <Link
                  to="/#contact"
                  className="mt-1 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-center text-sm font-medium text-background"
                >
                  {t("navbar.hire")}
                </Link>

                {/* MOBILE LANGUAGE SWITCHER */}
                <div className="mt-3 flex items-center justify-center gap-2 border-t border-white/10 pt-3">
                  <button
                    onClick={() => i18n.changeLanguage("en")}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      !isArabic
                        ? "bg-primary text-background"
                        : "glass text-foreground"
                    }`}
                  >
                    English
                  </button>

                  <button
                    onClick={() => i18n.changeLanguage("ar")}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      isArabic
                        ? "bg-primary text-background"
                        : "glass text-foreground"
                    }`}
                  >
                    العربية
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
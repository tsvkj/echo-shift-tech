import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Sparkles } from "lucide-react";
import { useState } from "react";

import { authService } from "@/services/authService";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin · Nova.dev" },
      { name: "robots", content: "noindex" },
    ],
  }),

  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setErr(null);

    try {
      await authService.login(
        email,
        password
      );

      navigate({
        to: "/admin",
      });
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-24">
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md rounded-3xl glass-strong p-8 glow-purple"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Sparkles
              className="h-4 w-4 text-background"
              strokeWidth={2.5}
            />
          </div>

          <span className="font-display text-lg font-semibold">
            Nova.dev
          </span>
        </Link>

        <h1 className="mt-8 font-display text-2xl font-semibold">
          Admin access
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Secure admin login
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-7 space-y-3"
        >
          <label className="block rounded-2xl glass px-4 py-3">
            <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
              Email
            </span>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="mt-1 w-full bg-transparent text-sm outline-none"
              placeholder="admin@demo.dev"
            />
          </label>

          <label className="block rounded-2xl glass px-4 py-3">
            <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
              Password
            </span>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="mt-1 w-full bg-transparent text-sm outline-none"
              placeholder="Enter password"
            />
          </label>

          {err && (
            <p className="text-xs text-destructive">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-5 py-3 text-sm font-medium text-background transition-all hover:bg-[position:100%_0] disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />

            {loading
              ? "Signing in…"
              : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { LogOut, Pencil, Plus, Sparkles, Trash2 } from "lucide-react";

import { authService } from "@/services/authService";

import { projectsService, type Project } from "@/services/projectsService";

import { ProjectFormModal } from "@/components/admin/ProjectFormModal";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      {
        title: "Dashboard · Nova.dev",
      },

      {
        name: "robots",
        content: "noindex",
      },
    ],
  }),

  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();

  const [loadingAuth, setLoadingAuth] = useState(true);

  const [items, setItems] = useState<Project[]>([]);

  const [editing, setEditing] = useState<Project | null>(null);

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await authService.verifyToken();

      if (!valid) {
        navigate({ to: "/admin/login" });
        return;
      }

      await refresh();

      setLoadingAuth(false);
    };

    checkAuth();
  }, []);

  const refresh = async () => {
    try {
      const data = await projectsService.list();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onLogout = () => {
    authService.logout();
    navigate({ to: "/admin/login" });
  };

  const onSave = async (
    draft: Omit<Project, "createdAt"> & {
      removedImages?: string[];
    },
  ) => {
    try {
      if (editing?._id) {
        await projectsService.update(editing._id, draft, draft.removedImages || []);
      } else {
        await projectsService.create(draft);
      }

      setEditing(null);
      setCreating(false);
      await refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id: string) => {
    const confirmed = confirm("Delete this project?");
    if (!confirmed) return;

    try {
      await projectsService.remove(id);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Top Bar */}

        <header className="flex items-center justify-between rounded-2xl glass-strong p-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-4 w-4 text-background" strokeWidth={2.5} />
            </div>

            <div>
              <p className="font-display text-sm font-semibold">Nova.dev</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin</p>
            </div>
          </Link>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-xs hover:bg-destructive/20 hover:text-destructive"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </header>

        {/* Stats */}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Total projects", value: items.length },
            { label: "Featured", value: items.filter((p) => p.featured).length },
            { label: "Categories", value: new Set(items.map((p) => p.category)).size },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl glass p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-semibold gradient-text">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Projects Header */}

        <div className="mt-10 flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold">Projects</h1>

          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-5 py-2.5 text-sm font-medium text-background hover:bg-[position:100%_0]"
          >
            <Plus className="h-4 w-4" />
            Add project
          </button>
        </div>

        {/* Projects Table */}

        <div className="mt-6 overflow-hidden rounded-2xl glass">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="p-4 text-left">Project</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-white/5 hover:bg-white/[0.02]"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.images[0]?.url ? (
                        <img
                          src={p.images[0].url}
                          alt={p.title.en}
                          className="h-10 w-14 rounded-md object-cover"
                        />
                      ) : (
                        <div className="h-10 w-14 rounded-md bg-gradient-to-br from-primary/30 to-accent/30" />
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.title.en}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {p.shortDescription.en}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-muted-foreground">{p.category}</td>

                  <td className="p-4">
                    {p.featured ? (
                      <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs text-primary">
                        Yes
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => setEditing(p)}
                        className="flex h-8 w-8 items-center justify-center rounded-md glass hover:bg-primary/10"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => p._id && onDelete(p._id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md glass text-destructive hover:bg-destructive/20"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-sm text-muted-foreground">
                    No projects yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || creating) && (
        <ProjectFormModal
          initial={editing ?? undefined}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={onSave}
        />
      )}
    </div>
  );
}

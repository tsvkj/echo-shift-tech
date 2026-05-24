import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Send, Github, Linkedin, Twitter, X, PhoneCall } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const PHONE = "+10000000000";
  const EMAIL = "hello@nova.dev";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mock — wire to your API later
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Have a project in mind? <span className="gradient-text">Let's talk</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            I reply to every message within 24 hours.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Channels */}
          <div className="space-y-4">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-white/10 group-hover:from-primary/40 group-hover:to-accent/40">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
                <p className="truncate font-medium">{EMAIL}</p>
              </div>
            </a>

            <button
              onClick={() => setPhoneOpen(true)}
              className="group flex w-full items-center gap-4 rounded-2xl glass p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-white/10 group-hover:from-primary/40 group-hover:to-accent/40">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Phone</p>
                <p className="font-medium">{PHONE}</p>
              </div>
            </button>

            <a
              href={`https://wa.me/${PHONE.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-white/10 group-hover:from-primary/40 group-hover:to-accent/40">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                <p className="font-medium">Chat instantly</p>
              </div>
            </a>

            <div className="flex gap-2 pt-2">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-11 w-11 items-center justify-center rounded-xl glass transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl glass-strong p-6 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="you@company.com"
                />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message">
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  placeholder="Tell me about your project, timeline, and budget…"
                />
              </Field>
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] px-6 py-3.5 text-sm font-medium text-background transition-all hover:bg-[position:100%_0] hover:shadow-[0_0_40px_-5px_oklch(0.72_0.25_295/0.8)]"
            >
              {sent ? "Message sent ✓" : <>Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Demo form — wire to your API in <code className="text-primary">services/</code>.
            </p>
          </motion.form>
        </div>
      </div>

      {/* Phone modal */}
      <AnimatePresence>
        {phoneOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
            onClick={() => setPhoneOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl glass-strong p-7 text-center"
            >
              <button
                onClick={() => setPhoneOpen(false)}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-primary/20"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent">
                <Phone className="h-6 w-6 text-background" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{PHONE}</h3>
              <p className="mt-1 text-sm text-muted-foreground">How would you like to reach me?</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-medium text-background"
                >
                  <PhoneCall className="h-4 w-4" /> Call
                </a>
                <a
                  href={`https://wa.me/${PHONE.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium hover:bg-primary/10"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block rounded-2xl glass px-4 py-3 transition-all focus-within:border-primary/40 focus-within:bg-primary/5">
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

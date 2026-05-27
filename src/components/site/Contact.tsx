import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  Github,
  Linkedin,
  Twitter,
  X,
  PhoneCall,
  Loader2,
} from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",

    // Main
    category: "",
    serviceType: "",
    timeline: "",
    budget: "",

    // Shared
    projectDetails: "",
    inspiration: "",

    // Website
    websiteType: "",
    hasDesign: "",
    needsHosting: "",
    needsMaintenance: "",
    features: "",
    cms: "",

    // AI
    aiType: "",
    hasApi: "",
    apiProvider: "",
    automationGoal: "",
    aiUsers: "",
    integrations: "",
    dataSource: "",

    // E-commerce
    productsCount: "",
    paymentGateway: "",
    inventorySystem: "",
  });

  const PHONE = "+971509457257";
  const EMAIL = "hashimmuhaned951@gmail.com";

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("https://formspree.io/f/xnjrovvl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSent(true);

        setTimeout(() => {
          setSent(false);
        }, 4000);

        setForm({
          name: "",
          email: "",
          company: "",

          category: "",
          serviceType: "",
          timeline: "",
          budget: "",

          projectDetails: "",
          inspiration: "",

          websiteType: "",
          hasDesign: "",
          needsHosting: "",
          needsMaintenance: "",
          features: "",
          cms: "",

          aiType: "",
          hasApi: "",
          apiProvider: "",
          automationGoal: "",
          aiUsers: "",
          integrations: "",
          dataSource: "",

          productsCount: "",
          paymentGateway: "",
          inventorySystem: "",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const isWebsite =
    form.category === "Website" ||
    form.category === "Portfolio" ||
    form.category === "Business Website";

  const isAI = form.category === "AI Automation" || form.category === "AI Chatbot";

  const isEcommerce = form.category === "E-commerce";

  // Shared className for all <select> elements so options are always readable
  const selectClass =
    "w-full bg-transparent text-sm outline-none [&>option]:bg-neutral-900 [&>option]:text-white";

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
            The more details you share, the more accurate the proposal will be.
          </p>
        </motion.div>

        {/* Grid uses items-start so children can be sticky */}
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* LEFT — sticky container */}
          <div className="sticky top-24 space-y-4">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 ring-1 ring-white/10">
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 ring-1 ring-white/10">
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 ring-1 ring-white/10">
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

          {/* FORM */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl glass-strong p-6 md:p-8"
          >
            {/* BASIC */}
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="John Doe"
                />
              </Field>

              <Field label="Email">
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="john@company.com"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Company / Brand">
                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Optional"
                />
              </Field>
            </div>

            {/* CATEGORY */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Project Category">
                <select
                  required
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select category</option>
                  <option value="Business Website">Business Website</option>
                  <option value="Portfolio">Portfolio Website</option>
                  <option value="E-commerce">E-commerce Store</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="AI Chatbot">AI Chatbot</option>
                </select>
              </Field>

              <Field label="Timeline">
                <select
                  required
                  value={form.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-2 Weeks">1-2 Weeks</option>
                  <option value="1 Month">1 Month</option>
                  <option value="2-3 Months">2-3 Months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </Field>
            </div>

            {/* BUDGET */}
            <div className="mt-4">
              <Field label="Estimated Budget">
                <select
                  required
                  value={form.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select budget</option>
                  <option value="< $500">Less than $500</option>
                  <option value="$500 - $1500">$500 - $1,500</option>
                  <option value="$1500 - $5000">$1,500 - $5,000</option>
                  <option value="$5000+">$5,000+</option>
                  <option value="Not Sure">Not sure yet</option>
                </select>
              </Field>
            </div>

            {/* WEBSITE QUESTIONS */}
            <AnimatePresence mode="wait">
              {isWebsite && (
                <motion.div
                  key="website-fields"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 space-y-4"
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                    <p className="text-sm font-medium text-primary">Website Project Questions</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Website Type">
                      <select
                        value={form.websiteType}
                        onChange={(e) => updateField("websiteType", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select type</option>
                        <option value="Landing Page">Landing Page</option>
                        <option value="Corporate Website">Corporate Website</option>
                        <option value="Dashboard">Dashboard</option>
                        <option value="Portfolio">Portfolio</option>
                        <option value="Booking System">Booking System</option>
                        <option value="Custom Web App">Custom Web App</option>
                      </select>
                    </Field>

                    <Field label="Do you already have a design?">
                      <select
                        value={form.hasDesign}
                        onChange={(e) => updateField("hasDesign", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Need Help">Need help with design</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Need CMS/Admin Dashboard?">
                      <select
                        value={form.cms}
                        onChange={(e) => updateField("cms", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Not Sure">Not sure yet</option>
                      </select>
                    </Field>

                    <Field label="Need Hosting / Domain Setup?">
                      <select
                        value={form.needsHosting}
                        onChange={(e) => updateField("needsHosting", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Not Sure">Not sure</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Website Features">
                    <textarea
                      rows={4}
                      value={form.features}
                      onChange={(e) => updateField("features", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder="Authentication, dashboard, booking, payment system, admin panel..."
                    />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AI QUESTIONS */}
            <AnimatePresence mode="wait">
              {isAI && (
                <motion.div
                  key="ai-fields"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 space-y-4"
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                    <p className="text-sm font-medium text-primary">AI / Automation Questions</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="AI Service Type">
                      <select
                        value={form.aiType}
                        onChange={(e) => updateField("aiType", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select AI type</option>
                        <option value="AI Chatbot">AI Chatbot</option>
                        <option value="Workflow Automation">Workflow Automation</option>
                        <option value="AI Agent">AI Agent</option>
                        <option value="CRM Automation">CRM Automation</option>
                        <option value="Lead Generation">Lead Generation</option>
                        <option value="Custom AI Tool">Custom AI Tool</option>
                      </select>
                    </Field>

                    <Field label="Do you already have API keys?">
                      <select
                        value={form.hasApi}
                        onChange={(e) => updateField("hasApi", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Need Help">Need help setting up</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Preferred AI Provider">
                      <select
                        value={form.apiProvider}
                        onChange={(e) => updateField("apiProvider", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select provider</option>
                        <option value="OpenAI">OpenAI</option>
                        <option value="Claude">Claude</option>
                        <option value="Gemini">Gemini</option>
                        <option value="DeepSeek">DeepSeek</option>
                        <option value="Not Sure">Not sure</option>
                      </select>
                    </Field>

                    <Field label="Expected Number of Users">
                      <select
                        value={form.aiUsers}
                        onChange={(e) => updateField("aiUsers", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select scale</option>
                        <option value="Personal Use">Personal Use</option>
                        <option value="Small Team">Small Team</option>
                        <option value="Company Wide">Company Wide</option>
                        <option value="Public SaaS">Public SaaS</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Tools / Integrations Needed">
                    <textarea
                      rows={3}
                      value={form.integrations}
                      onChange={(e) => updateField("integrations", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder="WhatsApp, Gmail, Slack, CRM, Shopify, Notion, Google Sheets..."
                    />
                  </Field>

                  <Field label="What process should the AI automate?">
                    <textarea
                      rows={4}
                      value={form.automationGoal}
                      onChange={(e) => updateField("automationGoal", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder="Customer support, lead qualification, report generation, email automation..."
                    />
                  </Field>

                  <Field label="Where will the AI get its data from?">
                    <textarea
                      rows={3}
                      value={form.dataSource}
                      onChange={(e) => updateField("dataSource", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder="PDFs, website data, CRM, spreadsheets, database..."
                    />
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ECOMMERCE QUESTIONS */}
            <AnimatePresence mode="wait">
              {isEcommerce && (
                <motion.div
                  key="ecommerce-fields"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 space-y-4"
                >
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
                    <p className="text-sm font-medium text-primary">E-commerce Questions</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="How many products?">
                      <select
                        value={form.productsCount}
                        onChange={(e) => updateField("productsCount", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select range</option>
                        <option value="1-10">1-10</option>
                        <option value="10-50">10-50</option>
                        <option value="50-200">50-200</option>
                        <option value="200+">200+</option>
                      </select>
                    </Field>

                    <Field label="Payment Gateway">
                      <select
                        value={form.paymentGateway}
                        onChange={(e) => updateField("paymentGateway", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">Select gateway</option>
                        <option value="Stripe">Stripe</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Tabby">Tabby</option>
                        <option value="Tamara">Tamara</option>
                        <option value="Not Sure">Not sure</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="Need inventory management?">
                    <select
                      value={form.inventorySystem}
                      onChange={(e) => updateField("inventorySystem", e.target.value)}
                      className={selectClass}
                    >
                      <option value="">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Maybe">Maybe later</option>
                    </select>
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SHARED */}
            <div className="mt-6 space-y-4">
              <Field label="Reference Websites / Inspiration">
                <textarea
                  rows={3}
                  value={form.inspiration}
                  onChange={(e) => updateField("inspiration", e.target.value)}
                  className="w-full resize-none bg-transparent text-sm outline-none"
                  placeholder="Paste websites you like or describe the style..."
                />
              </Field>

              <Field label="Project Details">
                <textarea
                  required
                  rows={6}
                  value={form.projectDetails}
                  onChange={(e) => updateField("projectDetails", e.target.value)}
                  className="w-full resize-none bg-transparent text-sm outline-none"
                  placeholder="Describe your project, goals, audience, business model, or requirements..."
                />
              </Field>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_100%] px-6 py-3.5 text-sm font-medium text-background transition-all hover:bg-position-[100%_0] disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : sent ? (
                "Message sent ✓"
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>

      {/* PHONE MODAL */}
      <AnimatePresence>
        {phoneOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md"
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

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent">
                <Phone className="h-6 w-6 text-background" />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold">{PHONE}</h3>

              <p className="mt-1 text-sm text-muted-foreground">How would you like to reach me?</p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-accent px-4 py-2.5 text-sm font-medium text-background"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call
                </a>

                <a
                  href={`https://wa.me/${PHONE.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium hover:bg-primary/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
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
      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>

      <div className="mt-1">{children}</div>
    </label>
  );
}

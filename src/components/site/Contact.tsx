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
import { useTranslation } from "react-i18next";

export function Contact() {
  const { t } = useTranslation();

  const [phoneOpen, setPhoneOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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

  const PHONE = "+971509457257";
  const EMAIL = "hashimmuhaned951@gmail.com";

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("https://formspree.io/f/xnjrovvl", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSent(true);
        setTimeout(() => setSent(false), 4000);
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
          <p className="text-xs uppercase tracking-[0.2em] text-primary">{t("contact.badge")}</p>

          <h2 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            {t("contact.title1")}{" "}
            <span className="gradient-text">{t("contact.titleHighlight")}</span>
            {t("contact.title2")}
          </h2>

          <p className="mt-4 text-muted-foreground">{t("contact.description")}</p>
        </motion.div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* LEFT */}
          <div className="sticky top-24 space-y-4">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 rounded-2xl glass p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-accent/20 ring-1 ring-white/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("contact.emailLabel")}
                </p>
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
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("contact.phoneLabel")}
                </p>
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
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t("contact.whatsappLabel")}
                </p>
                <p className="font-medium">{t("contact.whatsappSub")}</p>
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
              <Field label={t("contact.form.name")}>
                <input
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </Field>

              <Field label={t("contact.form.email")}>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label={t("contact.form.company")}>
                <input
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder={t("contact.form.companyPlaceholder")}
                />
              </Field>
            </div>

            {/* CATEGORY */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label={t("contact.form.category")}>
                <select
                  required
                  value={form.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  className={selectClass}
                >
                  <option value="">{t("contact.form.selectCategory")}</option>
                  <option value="Business Website">{t("contact.form.categories.business")}</option>
                  <option value="Portfolio">{t("contact.form.categories.portfolio")}</option>
                  <option value="E-commerce">{t("contact.form.categories.ecommerce")}</option>
                  <option value="AI Automation">{t("contact.form.categories.aiAutomation")}</option>
                  <option value="AI Chatbot">{t("contact.form.categories.aiChatbot")}</option>
                </select>
              </Field>

              <Field label={t("contact.form.timeline")}>
                <select
                  required
                  value={form.timeline}
                  onChange={(e) => updateField("timeline", e.target.value)}
                  className={selectClass}
                >
                  <option value="">{t("contact.form.selectTimeline")}</option>
                  <option value="ASAP">{t("contact.form.timelines.asap")}</option>
                  <option value="1-2 Weeks">{t("contact.form.timelines.twoWeeks")}</option>
                  <option value="1 Month">{t("contact.form.timelines.oneMonth")}</option>
                  <option value="2-3 Months">{t("contact.form.timelines.threeMonths")}</option>
                  <option value="Flexible">{t("contact.form.timelines.flexible")}</option>
                </select>
              </Field>
            </div>

            {/* BUDGET */}
            <div className="mt-4">
              <Field label={t("contact.form.budget")}>
                <select
                  required
                  value={form.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  className={selectClass}
                >
                  <option value="">{t("contact.form.selectBudget")}</option>
                  <option value="< $500">{t("contact.form.budgets.under500")}</option>
                  <option value="$500 - $1500">{t("contact.form.budgets.500to1500")}</option>
                  <option value="$1500 - $5000">{t("contact.form.budgets.1500to5000")}</option>
                  <option value="$5000+">{t("contact.form.budgets.5000plus")}</option>
                  <option value="Not Sure">{t("contact.form.budgets.notSure")}</option>
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
                    <p className="text-sm font-medium text-primary">
                      {t("contact.website.sectionTitle")}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t("contact.website.websiteType")}>
                      <select
                        value={form.websiteType}
                        onChange={(e) => updateField("websiteType", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectType")}</option>
                        <option value="Landing Page">{t("contact.website.types.landing")}</option>
                        <option value="Corporate Website">
                          {t("contact.website.types.corporate")}
                        </option>
                        <option value="Dashboard">{t("contact.website.types.dashboard")}</option>
                        <option value="Portfolio">{t("contact.website.types.portfolio")}</option>
                        <option value="Booking System">{t("contact.website.types.booking")}</option>
                        <option value="Custom Web App">{t("contact.website.types.custom")}</option>
                      </select>
                    </Field>

                    <Field label={t("contact.website.hasDesign")}>
                      <select
                        value={form.hasDesign}
                        onChange={(e) => updateField("hasDesign", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectOption")}</option>
                        <option value="Yes">{t("contact.shared.yes")}</option>
                        <option value="No">{t("contact.shared.no")}</option>
                        <option value="Need Help">{t("contact.website.needHelp")}</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t("contact.website.cms")}>
                      <select
                        value={form.cms}
                        onChange={(e) => updateField("cms", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectOption")}</option>
                        <option value="Yes">{t("contact.shared.yes")}</option>
                        <option value="No">{t("contact.shared.no")}</option>
                        <option value="Not Sure">{t("contact.shared.notSure")}</option>
                      </select>
                    </Field>

                    <Field label={t("contact.website.hosting")}>
                      <select
                        value={form.needsHosting}
                        onChange={(e) => updateField("needsHosting", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectOption")}</option>
                        <option value="Yes">{t("contact.shared.yes")}</option>
                        <option value="No">{t("contact.shared.no")}</option>
                        <option value="Not Sure">{t("contact.shared.notSure")}</option>
                      </select>
                    </Field>
                  </div>

                  <Field label={t("contact.website.features")}>
                    <textarea
                      rows={4}
                      value={form.features}
                      onChange={(e) => updateField("features", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder={t("contact.website.featuresPlaceholder")}
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
                    <p className="text-sm font-medium text-primary">
                      {t("contact.ai.sectionTitle")}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t("contact.ai.aiType")}>
                      <select
                        value={form.aiType}
                        onChange={(e) => updateField("aiType", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectType")}</option>
                        <option value="AI Chatbot">{t("contact.ai.types.chatbot")}</option>
                        <option value="Workflow Automation">
                          {t("contact.ai.types.workflow")}
                        </option>
                        <option value="AI Agent">{t("contact.ai.types.agent")}</option>
                        <option value="CRM Automation">{t("contact.ai.types.crm")}</option>
                        <option value="Lead Generation">{t("contact.ai.types.leads")}</option>
                        <option value="Custom AI Tool">{t("contact.ai.types.custom")}</option>
                      </select>
                    </Field>

                    <Field label={t("contact.ai.hasApi")}>
                      <select
                        value={form.hasApi}
                        onChange={(e) => updateField("hasApi", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectOption")}</option>
                        <option value="Yes">{t("contact.shared.yes")}</option>
                        <option value="No">{t("contact.shared.no")}</option>
                        <option value="Need Help">{t("contact.ai.needHelp")}</option>
                      </select>
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t("contact.ai.provider")}>
                      <select
                        value={form.apiProvider}
                        onChange={(e) => updateField("apiProvider", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectProvider")}</option>
                        <option value="OpenAI">OpenAI</option>
                        <option value="Claude">Claude</option>
                        <option value="Gemini">Gemini</option>
                        <option value="DeepSeek">DeepSeek</option>
                        <option value="Not Sure">{t("contact.shared.notSure")}</option>
                      </select>
                    </Field>

                    <Field label={t("contact.ai.users")}>
                      <select
                        value={form.aiUsers}
                        onChange={(e) => updateField("aiUsers", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectScale")}</option>
                        <option value="Personal Use">{t("contact.ai.scales.personal")}</option>
                        <option value="Small Team">{t("contact.ai.scales.team")}</option>
                        <option value="Company Wide">{t("contact.ai.scales.company")}</option>
                        <option value="Public SaaS">{t("contact.ai.scales.saas")}</option>
                      </select>
                    </Field>
                  </div>

                  <Field label={t("contact.ai.integrations")}>
                    <textarea
                      rows={3}
                      value={form.integrations}
                      onChange={(e) => updateField("integrations", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder={t("contact.ai.integrationsPlaceholder")}
                    />
                  </Field>

                  <Field label={t("contact.ai.automationGoal")}>
                    <textarea
                      rows={4}
                      value={form.automationGoal}
                      onChange={(e) => updateField("automationGoal", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder={t("contact.ai.automationGoalPlaceholder")}
                    />
                  </Field>

                  <Field label={t("contact.ai.dataSource")}>
                    <textarea
                      rows={3}
                      value={form.dataSource}
                      onChange={(e) => updateField("dataSource", e.target.value)}
                      className="w-full resize-none bg-transparent text-sm outline-none"
                      placeholder={t("contact.ai.dataSourcePlaceholder")}
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
                    <p className="text-sm font-medium text-primary">
                      {t("contact.ecommerce.sectionTitle")}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={t("contact.ecommerce.productsCount")}>
                      <select
                        value={form.productsCount}
                        onChange={(e) => updateField("productsCount", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectRange")}</option>
                        <option value="1-10">1–10</option>
                        <option value="10-50">10–50</option>
                        <option value="50-200">50–200</option>
                        <option value="200+">200+</option>
                      </select>
                    </Field>

                    <Field label={t("contact.ecommerce.payment")}>
                      <select
                        value={form.paymentGateway}
                        onChange={(e) => updateField("paymentGateway", e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{t("contact.form.selectGateway")}</option>
                        <option value="Stripe">Stripe</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Tabby">Tabby</option>
                        <option value="Tamara">Tamara</option>
                        <option value="Not Sure">{t("contact.shared.notSure")}</option>
                      </select>
                    </Field>
                  </div>

                  <Field label={t("contact.ecommerce.inventory")}>
                    <select
                      value={form.inventorySystem}
                      onChange={(e) => updateField("inventorySystem", e.target.value)}
                      className={selectClass}
                    >
                      <option value="">{t("contact.form.selectOption")}</option>
                      <option value="Yes">{t("contact.shared.yes")}</option>
                      <option value="No">{t("contact.shared.no")}</option>
                      <option value="Maybe">{t("contact.ecommerce.maybeLater")}</option>
                    </select>
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SHARED */}
            <div className="mt-6 space-y-4">
              <Field label={t("contact.form.inspiration")}>
                <textarea
                  rows={3}
                  value={form.inspiration}
                  onChange={(e) => updateField("inspiration", e.target.value)}
                  className="w-full resize-none bg-transparent text-sm outline-none"
                  placeholder={t("contact.form.inspirationPlaceholder")}
                />
              </Field>

              <Field label={t("contact.form.projectDetails")}>
                <textarea
                  required
                  rows={6}
                  value={form.projectDetails}
                  onChange={(e) => updateField("projectDetails", e.target.value)}
                  className="w-full resize-none bg-transparent text-sm outline-none"
                  placeholder={t("contact.form.projectDetailsPlaceholder")}
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
                  {t("contact.form.sending")}
                </>
              ) : sent ? (
                t("contact.form.sent")
              ) : (
                <>
                  {t("contact.form.submit")}
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

              <p className="mt-1 text-sm text-muted-foreground">{t("contact.modal.subtitle")}</p>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-accent px-4 py-2.5 text-sm font-medium text-background"
                >
                  <PhoneCall className="h-4 w-4" />
                  {t("contact.modal.call")}
                </a>

                <a
                  href={`https://wa.me/${PHONE.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl glass px-4 py-2.5 text-sm font-medium hover:bg-primary/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("contact.modal.whatsapp")}
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

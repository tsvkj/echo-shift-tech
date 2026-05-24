// Mock auth — replace with real JWT calls later.
const AUTH_KEY = "portfolio.auth.v1";
const DEMO_USER = { email: "admin@demo.dev", password: "admin123" };

export const authService = {
  async login(email: string, password: string): Promise<{ token: string }> {
    if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
      const token = btoa(`${email}:${Date.now()}`);
      localStorage.setItem(AUTH_KEY, token);
      return { token };
    }
    throw new Error("Invalid credentials");
  },
  logout() {
    localStorage.removeItem(AUTH_KEY);
  },
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem(AUTH_KEY));
  },
  demoCredentials: DEMO_USER,
};

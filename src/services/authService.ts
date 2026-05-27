const API_URL = "https://echo-shift-tech-backend.vercel.app/api";

const AUTH_KEY = "portfolio.auth.v1";

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Login failed"
      );
    }

    localStorage.setItem(
      AUTH_KEY,
      data.token
    );

    return data;
  },

  async verifyToken() {
    const token =
      localStorage.getItem(AUTH_KEY);

    if (!token) {
      return false;
    }

    try {
      const response = await fetch(
        `${API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated() {
    if (typeof window === "undefined")
      return false;

    return Boolean(
      localStorage.getItem(AUTH_KEY)
    );
  },

  getToken() {
    return localStorage.getItem(AUTH_KEY);
  },
};
import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// ── Response interceptor: redirect to /login on expired sessions ──────────────
//
// We only act on 401 if:
//  1. The failing request is NOT an auth endpoint (login, register, getme).
//     Those are expected to return 401 for unauthenticated users.
//  2. We are NOT already on the /login page (prevents infinite redirect loops).
//
API.interceptors.response.use(
  // Pass successful responses straight through
  (response) => response,

  async (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // List of URL substrings where a 401 is normal / expected
    const authEndpoints = ["/auth/login", "/auth/register", "/auth/getme", "/auth/logout"];
    const isAuthCall = authEndpoints.some((ep) => requestUrl.includes(ep));

    if (status === 401 && !isAuthCall) {
      try {
        // Lazy import breaks the circular dependency:
        //   axios.js → store.js → authSlice.js → axios.js
        const { store } = await import("../redux/store");
        const { logoutUser } = await import("../redux/authSlice");
        store.dispatch(logoutUser());
      } catch {
        // If dynamic import fails, proceed with redirect anyway
      }

      // Redirect only if not already on the login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useCustomCookie } from "./useCustomCookie";

const status = reactive<{ isLogged: boolean }>({ isLogged: false });

export function useAuth() {
  const router = useRouter();
  const { getCookie, setCookie, removeCookie } = useCustomCookie();

  function login(token: string): void {
    if (!token) {
      console.error("Nessun token fornito.");
      return;
    }
    setCookie("token", token, 30);
    status.isLogged = true;
    router.push("/");
  }

  function logout(): void {
    removeCookie("token");
    status.isLogged = false;
    router.push("/login");
  }

  function checkAuth(): boolean {
    const token = getCookie("token");
    status.isLogged = !!token;
    return status.isLogged;
  }

  return {
    status,
    login,
    logout,
    checkAuth,
  };
}

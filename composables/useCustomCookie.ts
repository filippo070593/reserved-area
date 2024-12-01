export const useCustomCookie = () => {
  const getCookie = (name: string): string | null => {
    if (!process.client) return null;
    const cookie = document?.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  const setCookie = (name: string, value: string, days = 7): void => {
    if (!process.client) return;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
  };

  const removeCookie = (name: string): void => {
    if (!process.client) return;
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
  };

  return { getCookie, setCookie, removeCookie };
};

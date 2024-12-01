export default defineNuxtRouteMiddleware((to, from) => {
  const cookies = useCookie("token");

  if (!cookies.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});

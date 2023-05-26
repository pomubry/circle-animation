export default defineNuxtRouteMiddleware(() => {
  const runtimeConfig = useRuntimeConfig();
  const cookie = useCookie(runtimeConfig.public.AUTH_TOKEN);
  const userStore = useUserStore();

  // Prevent going to /login & /register when already logged in
  if (cookie.value) {
    return navigateTo("/");
  } else {
    userStore.user = null;
  }
});

export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig();
  const cookie = useCookie(config.public.AUTH_TOKEN);
  const userStore = useUserStore();

  // Prevent going to /login & /register when already logged in
  if (cookie.value) {
    return navigateTo("/");
  } else {
    userStore.user = null;
  }
});

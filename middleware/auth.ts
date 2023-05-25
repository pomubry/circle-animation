export default defineNuxtRouteMiddleware(() => {
  const userStore = useUserStore();
  const appConfig = useAppConfig();
  const cookie = useCookie(appConfig.authToken);

  // Prevent going to /login & /register when already logged in
  if (cookie.value) {
    return navigateTo("/");
  } else {
    userStore.user = null;
  }
});

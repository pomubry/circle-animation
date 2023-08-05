export default defineNuxtRouteMiddleware(async () => {
  const config = useRuntimeConfig();
  const cookie = useCookie(config.public.COOKIE_NAME);
  const userStore = useUserStore();
  const settingsStore = useSettingsStore();

  // Prevent going to /login & /register when already logged in
  if (process.server && cookie.value) {
    return navigateTo("/");
  } else {
    userStore.user = null;
    settingsStore.resetSettings();
  }
});

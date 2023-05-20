export default defineNuxtRouteMiddleware(() => {
  const appConfig = useAppConfig();
  const cookie = useCookie(appConfig.authToken);
  const userStore = useUserStore();

  if (cookie.value) {
    return navigateTo("/");
  } else {
    userStore.user = null;
  }
});

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();
  const appConfig = useAppConfig();
  const cookie = useCookie(appConfig.authToken);

  if (process.client) {
    // Only fetch on client because cookies won't be included if fetched on server
    const user = await isAuthenticated();
    if (!user.isAuthenticated) {
      userStore.user = null;
      return navigateTo("/");
    }
  }

  if (process.server) {
    // Only use the composable on the server because cookies can't be accessed on client
    if (!!!cookie.value) {
      return navigateTo("/");
    }
  }
});

export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();

  try {
    const user = await isAuthenticated();
    if (!user.isAuthenticated) {
      userStore.user = null;
      return navigateTo("/");
    }
  } catch (error) {
    console.error(error);
    return navigateTo("/");
  }
});

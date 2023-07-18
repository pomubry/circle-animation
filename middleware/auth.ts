export default defineNuxtRouteMiddleware(async () => {
  const userStore = useUserStore();

  // Prevent going to /login & /register when already logged in
  try {
    const user = await isAuthenticated();
    if (user.isAuthenticated) {
      return navigateTo("/");
    } else {
      userStore.user = null;
    }
  } catch (error) {
    console.error(error);
    return navigateTo("/");
  }
});

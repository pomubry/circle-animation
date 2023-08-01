export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const settingsStore = useSettingsStore();

  try {
    const user = await isAuthenticated();
    if (!user.isAuthenticated) {
      userStore.user = null;
      settingsStore.resetSettings();
      return navigateTo("/");
    }

    if (to.path === "/game" && !settingsStore.chosenBeatmap) {
      console.error("Chosen beatmap not detected");
      return navigateTo("/beatmaps");
    }
  } catch (error) {
    console.error(error);
    return navigateTo("/");
  }
});

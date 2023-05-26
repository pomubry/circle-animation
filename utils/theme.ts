export const getThemeKey = () => {
  const runtimeConfig = useRuntimeConfig();
  return runtimeConfig.public.TW_KEY;
};

export const getAppTheme = () => {
  const themeKey = getThemeKey();
  if (
    localStorage.getItem(themeKey) === "dark" ||
    (!(themeKey in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  } else {
    return "light";
  }
};

export const setDarkMode = () => {
  const themeKey = getThemeKey();
  localStorage.setItem(themeKey, "dark");
  document.documentElement.classList.add("dark");
};

export const setLightMode = () => {
  const themeKey = getThemeKey();
  localStorage.setItem(themeKey, "light");
  document.documentElement.classList.remove("dark");
};

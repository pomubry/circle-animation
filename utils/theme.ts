export const appThemeKey = "tw-theme";

export const getAppTheme = () => {
  if (
    localStorage.getItem(appThemeKey) === "dark" ||
    (!(appThemeKey in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  } else {
    return "light";
  }
};

export const setDarkMode = () => {
  localStorage.setItem(appThemeKey, "dark");
  document.documentElement.classList.add("dark");
};

export const setLightMode = () => {
  localStorage.setItem(appThemeKey, "light");
  document.documentElement.classList.remove("dark");
};

import { $, onReady, showToast } from "./utils.js";

onReady(() => {
  const darkMode = $("#darkModeToggle");
  const notifications = $("#notificationToggle");
  const language = $("#languageSelect");

  darkMode.checked = document.documentElement.dataset.theme === "dark";
  darkMode.addEventListener("change", () => {
    const theme = darkMode.checked ? "dark" : "light";
    localStorage.setItem("attendify.theme", theme);
    document.documentElement.dataset.theme = theme;
    showToast(`${theme === "dark" ? "Dark" : "Light"} mode enabled.`);
  });

  notifications.addEventListener("change", () => {
    showToast(`Notifications ${notifications.checked ? "enabled" : "muted"}.`);
  });

  language.addEventListener("change", () => {
    showToast(`${language.value} selected. Localization placeholder is ready.`);
  });
});

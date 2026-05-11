(function () {
  const root = document.documentElement;
  const storageKey = "lua-api-theme";

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    if (theme === "auto") {
      root.setAttribute("data-theme", getSystemTheme());
      return;
    }
    root.setAttribute("data-theme", theme);
  }

  function cycleTheme() {
    const current = localStorage.getItem(storageKey) || "auto";
    const next = current === "auto" ? "dark" : current === "dark" ? "light" : "auto";
    localStorage.setItem(storageKey, next);
    applyTheme(next);
  }

  const savedTheme = localStorage.getItem(storageKey) || "auto";
  applyTheme(savedTheme);

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", cycleTheme);
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const current = localStorage.getItem(storageKey) || "auto";
    if (current === "auto") {
      applyTheme("auto");
    }
  });
})();

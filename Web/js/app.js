import { logoutUser } from "./firebase.js";
import { $, $$, formatDisplayDate, onReady, showToast } from "./utils.js";

function applyTheme() {
  const theme = localStorage.getItem("attendify.theme") || "light";
  document.documentElement.dataset.theme = theme;
}

function markActiveNavigation() {
  const page = document.body.dataset.page;
  $$("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.dataset.nav === page);
  });
}

function wireSidebar() {
  const toggle = $('[data-action="toggle-sidebar"]');
  toggle?.addEventListener("click", () => document.body.classList.toggle("sidebar-open"));
  document.addEventListener("click", (event) => {
    if (!document.body.classList.contains("sidebar-open")) return;
    if (event.target.closest(".sidebar") || event.target.closest('[data-action="toggle-sidebar"]')) return;
    document.body.classList.remove("sidebar-open");
  });
}

function wireDate() {
  $$("[data-current-date]").forEach((element) => {
    element.textContent = formatDisplayDate();
  });
}

function wireActions() {
  document.addEventListener("click", async (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (!action) return;

    if (action === "logout") {
      await logoutUser();
      window.location.href = "login.html";
    }

    if (action === "notifications") {
      showToast("No new notifications. Firebase Messaging placeholder is ready.");
    }

    if (action === "change-password") {
      showToast("Password reset flow will connect to Firebase Authentication.");
    }

    if (action === "update-profile") {
      showToast("Profile update placeholder saved.");
    }
  });
}

function wireRipple() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest(".button, .icon-button");
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    target.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  });
}

onReady(() => {
  applyTheme();
  markActiveNavigation();
  wireSidebar();
  wireDate();
  wireActions();
  wireRipple();
});

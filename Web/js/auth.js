import { loginUser } from "./firebase.js";
import { $, onReady, showToast } from "./utils.js";

function setError(name, message = "") {
  const target = $(`[data-error-for="${name}"]`);
  if (target) target.textContent = message;
}

function validate(email, password) {
  let isValid = true;
  setError("email");
  setError("password");

  if (!email || !email.includes("@")) {
    setError("email", "Enter a valid email address.");
    isValid = false;
  }

  if (!password || password.length < 6) {
    setError("password", "Password must be at least 6 characters.");
    isValid = false;
  }

  return isValid;
}

onReady(() => {
  const form = $("#loginForm");
  const reveal = $(".reveal-password");
  const passwordInput = $("#password");

  reveal?.addEventListener("click", () => {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    reveal.setAttribute("aria-label", visible ? "Show password" : "Hide password");
    reveal.innerHTML = `<i class="fa-regular ${visible ? "fa-eye" : "fa-eye-slash"}"></i>`;
  });

  $('[data-action="forgot-password"]')?.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("Firebase password reset placeholder is ready.");
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    if (!validate(email, password)) return;

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>Signing in';
    try {
      await loginUser(email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      showToast(error.message);
      button.disabled = false;
      button.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i>Login';
    }
  });
});

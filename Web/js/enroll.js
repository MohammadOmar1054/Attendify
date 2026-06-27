import { startEnrollment } from "./firebase.js";
import { $, onReady, showToast } from "./utils.js";

const steps = [
  "Waiting for ESP32...",
  "Scanning...",
  "Remove Finger...",
  "Place Again...",
  "Enrollment Successful"
];

let currentStep = 0;

function renderSteps() {
  $("#enrollSteps").innerHTML = steps.map((step, index) => `
    <li class="${index < currentStep ? "done" : ""} ${index === currentStep ? "active" : ""}">
      <i class="fa-solid ${index < currentStep ? "fa-check" : "fa-circle"}"></i>
      <span>${step}</span>
    </li>
  `).join("");
  $("#enrollProgress").style.width = `${(currentStep / (steps.length - 1)) * 100}%`;
}

async function runEnrollment(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  await startEnrollment(data);
  currentStep = 0;
  renderSteps();
  steps.forEach((_, index) => {
    window.setTimeout(() => {
      currentStep = index;
      renderSteps();
      if (index === steps.length - 1) {
        showToast(`${data.studentName} enrolled successfully.`);
      }
    }, index * 850);
  });
}

onReady(() => {
  renderSteps();
  $("#enrollmentForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    runEnrollment(event.currentTarget);
  });
});

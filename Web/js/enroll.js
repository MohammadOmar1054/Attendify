import {
  enrollStudent,
  sendEnrollCommand,
  listenForEnrollment
} from "./firebase.js";

import {
  $,
  onReady,
  showToast
} from "./utils.js";

const steps = [
  "Waiting for ESP32...",
  "Scanning...",
  "Remove Finger...",
  "Place Again...",
  "Enrollment Successful"
];

let currentStep = 0;
let lastEnrollmentTimestamp = 0;
let pendingStudent = null;

function renderSteps() {

  $("#enrollSteps").innerHTML =
    steps.map((step, index) => `
      <li class="${index < currentStep ? "done" : ""} ${index === currentStep ? "active" : ""}">
        <i class="fa-solid ${index < currentStep ? "fa-check" : "fa-circle"}"></i>
        <span>${step}</span>
      </li>
    `).join("");

  $("#enrollProgress").style.width =
    `${(currentStep / (steps.length - 1)) * 100}%`;
}

async function runEnrollment(form) {

  pendingStudent =
    Object.fromEntries(
      new FormData(form).entries()
    );

  currentStep = 0;
  renderSteps();

  showToast("Place finger on scanner...");

  await sendEnrollCommand();
}

onReady(() => {

  renderSteps();

listenForEnrollment(async (result) => {

  if (!pendingStudent)
    return;

  if (!result.timestamp)
    return;

  if (result.timestamp === lastEnrollmentTimestamp)
    return;

  lastEnrollmentTimestamp =
    result.timestamp;

  await enrollStudent({
    ...pendingStudent,
    fingerId: result.fingerprintID
  });

  currentStep = steps.length - 1;

  renderSteps();

  showToast(
    `${pendingStudent.studentName} enrolled successfully. Finger ID ${result.fingerprintID}`
  );

  pendingStudent = null;
});

  $("#enrollmentForm")
    ?.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        runEnrollment(event.currentTarget);
      }
    );
});
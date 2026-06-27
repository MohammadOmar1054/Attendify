import { listenToAttendance, startAttendance } from "./firebase.js";
import { $, badge, formatClock, onReady, showToast } from "./utils.js";

const steps = [
  "Waiting for fingerprint...",
  "Fingerprint detected...",
  "Uploading attendance...",
  "Attendance successful...",
  "Attendance failed..."
];

let count = 0;
let statusIndex = 0;

function renderSteps() {
  $("#statusSteps").innerHTML = steps.map((step, index) => `
    <li class="${index < statusIndex ? "done" : ""} ${index === statusIndex ? "active" : ""}">
      <i class="fa-solid ${index < statusIndex ? "fa-check" : "fa-circle"}"></i>
      <span>${step}</span>
    </li>
  `).join("");
}

function setStatus(index) {
  statusIndex = index;
  $("#scanHeadline").textContent = steps[index];
  $("#scanDescription").textContent = index === 0
    ? "Place a registered finger on the R307 sensor to mark attendance."
    : "The ESP32 to Firebase flow is being simulated with mock JSON events.";
  renderSteps();
}

function addAttendanceRow(row) {
  count += 1;
  const tr = document.createElement("tr");
  tr.className = "fade-in";
  tr.innerHTML = `
    <td>${row.time || formatClock()}</td>
    <td>${row.student}</td>
    <td>${row.regNo}</td>
    <td>${badge(row.status)}</td>
  `;
  $("#attendanceTable").prepend(tr);
  $("#attendanceCount").textContent = `${count} marked`;
}

async function simulateScan(row) {
  await startAttendance();
  setStatus(1);
  window.setTimeout(() => setStatus(2), 650);
  window.setTimeout(() => {
    setStatus(row?.status === "Present" || row?.status === "Late" ? 3 : 4);
    addAttendanceRow(row || { student: "Aarav Sharma", regNo: "CS21B1001", time: formatClock(), status: "Present" });
  }, 1300);
  window.setTimeout(() => setStatus(0), 2600);
}

onReady(() => {
  renderSteps();
  setInterval(() => {
    $("#liveClock").textContent = formatClock();
  }, 1000);
  $("#liveClock").textContent = formatClock();

  $("#simulateScan")?.addEventListener("click", () => simulateScan());
  listenToAttendance((row) => {
    showToast(`Fingerprint matched: ${row.student}`);
    simulateScan(row);
  });
});

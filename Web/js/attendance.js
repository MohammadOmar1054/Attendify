import {
  sendAttendanceCommand,
  listenForAttendance,
  getStudentByFingerId,
  saveAttendanceRecord
} from "./firebase.js";

import {
  $,
  badge,
  formatClock,
  onReady,
  showToast
} from "./utils.js";

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

  $("#scanDescription").textContent =
    index === 0
      ? "Place a registered finger on the R307 sensor to mark attendance."
      : "Processing attendance...";

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

  $("#attendanceCount").textContent =
    `${count} marked`;
}

async function simulateScan(row) {

  setStatus(1);

  window.setTimeout(
    () => setStatus(2),
    650
  );

  window.setTimeout(() => {

    setStatus(3);

    addAttendanceRow(row);

  }, 1300);

  window.setTimeout(
    () => setStatus(0),
    2600
  );
}

onReady(() => {

  renderSteps();

  setInterval(() => {

    $("#liveClock").textContent =
      formatClock();

  }, 1000);

  $("#liveClock").textContent =
    formatClock();

  $("#simulateScan")
    ?.addEventListener(
      "click",
      async () => {

        await sendAttendanceCommand();

        showToast(
          "Waiting for fingerprint..."
        );
      }
    );

  let initialized = false;

  let lastAttendanceTimestamp = null;

  listenForAttendance(async (data) => {

    if (!data)
      return;

    if (!data.timestamp)
      return;

    /*
      Ignore the old attendance record
      already present in Firebase when
      page loads.
    */
    if (!initialized) {

      initialized = true;

      lastAttendanceTimestamp =
        data.timestamp;

      console.log(
        "Old attendance snapshot ignored"
      );

      return;
    }

    if (
      lastAttendanceTimestamp !== null &&
      data.timestamp <= lastAttendanceTimestamp
    ) {
      return;
    }

    lastAttendanceTimestamp =
      data.timestamp;

    const student =
      await getStudentByFingerId(
        data.fingerprintID
      );

    const row = {

      student:
        student?.name ||
        `Fingerprint ${data.fingerprintID}`,

      regNo:
        student?.regNo ||
        `FP-${data.fingerprintID}`,

      status: "Present",

      time: formatClock()
    };

    showToast(
      `Fingerprint matched: ${row.student}`
    );

    simulateScan(row);

    try {

      await saveAttendanceRecord(row);

    } catch (error) {

      console.error(
        "Attendance save failed:",
        error
      );
    }
  });
});
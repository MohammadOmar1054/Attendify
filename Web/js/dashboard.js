import { loadClasses, loadStudents, loadAttendance } from "./firebase.js";
import { $, createStatCard, onReady } from "./utils.js";

function renderStats(classes, students, attendance) {
  const presentToday = attendance.filter((row) => row.date === "2026-06-27" && row.status === "Present").length;
  const rate = Math.round(classes.reduce((sum, item) => sum + item.attendanceRate, 0) / classes.length);
  $("#statsGrid").innerHTML = [
    createStatCard({ label: "Total Classes", value: classes.length, icon: "fa-solid fa-chalkboard-user" }),
    createStatCard({ label: "Total Students", value: students.length, icon: "fa-solid fa-users" }),
    createStatCard({ label: "Today's Attendance", value: presentToday, icon: "fa-solid fa-calendar-check" }),
    createStatCard({ label: "Attendance Rate", value: `${rate}%`, icon: "fa-solid fa-chart-line" })
  ].join("");
}

function renderClasses(classes) {
  $("#classGrid").innerHTML = classes.map((course) => `
    <article class="card class-card">
      <div class="class-card-top">
        <span class="course-code">${course.code}</span>
        <i class="fa-solid fa-fingerprint" aria-hidden="true"></i>
      </div>
      <div>
        <h3>${course.name}</h3>
        <div class="class-meta">
          <span><i class="fa-regular fa-user"></i> ${course.lecturer}</span>
          <span><i class="fa-solid fa-users"></i> ${course.students} students</span>
        </div>
      </div>
      <div class="progress-line">
        <span><b>Attendance</b><b>${course.attendanceRate}%</b></span>
        <div class="progress-track"><i style="width: ${course.attendanceRate}%"></i></div>
      </div>
      <a class="button button-secondary" href="class.html?class=${course.id}">
        <i class="fa-solid fa-arrow-right"></i>
        Open
      </a>
    </article>
  `).join("");
}

onReady(async () => {
  const [classes, students, attendance] = await Promise.all([loadClasses(), loadStudents(), loadAttendance()]);
  renderStats(classes, students, attendance);
  renderClasses(classes);
});

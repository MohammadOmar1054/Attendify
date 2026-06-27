import { loadClasses, loadStudents, loadAttendance } from "./firebase.js";
import { $, badge, createStatCard, onReady, paginate, renderPagination } from "./utils.js";

let students = [];
let page = 1;
const perPage = 6;

function filteredStudents() {
  const query = ($("#studentSearch")?.value || "").toLowerCase();
  return students.filter((student) => `${student.regNo} ${student.name}`.toLowerCase().includes(query));
}

function renderStudents() {
  const rows = filteredStudents();
  const pagination = paginate(rows, page, perPage);
  $("#studentCount").textContent = `${rows.length} students`;
  $("#studentTable").innerHTML = pagination.data.map((student) => `
    <tr>
      <td>${student.regNo}</td>
      <td>${student.name}</td>
      <td>${badge(student.fingerprint ? "Enrolled" : "Pending")}</td>
      <td><strong>${student.attendance}%</strong></td>
    </tr>
  `).join("");
  renderPagination($("#studentPagination"), pagination.pages, pagination.current, (selected) => {
    page = selected;
    renderStudents();
  });
}

function renderClassStats(studentsList, attendance) {
  const present = attendance.filter((row) => row.date === "2026-06-27" && row.status === "Present").length;
  const absent = attendance.filter((row) => row.date === "2026-06-27" && row.status === "Absent").length;
  const rate = Math.round(studentsList.reduce((sum, student) => sum + student.attendance, 0) / studentsList.length);
  $("#classStats").innerHTML = [
    createStatCard({ label: "Students", value: studentsList.length, icon: "fa-solid fa-users" }),
    createStatCard({ label: "Present", value: present, icon: "fa-solid fa-check" }),
    createStatCard({ label: "Absent", value: absent, icon: "fa-solid fa-xmark" }),
    createStatCard({ label: "Attendance %", value: `${rate}%`, icon: "fa-solid fa-chart-pie" })
  ].join("");
}

onReady(async () => {
  const params = new URLSearchParams(window.location.search);
  const [classes, studentData, attendance] = await Promise.all([loadClasses(), loadStudents(), loadAttendance()]);
  const course = classes.find((item) => item.id === params.get("class")) || classes[0];
  students = studentData;

  $("#courseTitle").textContent = course.name;
  $("#courseMeta").textContent = `Semester ${course.semester} | ${course.department} Department`;
  renderClassStats(students, attendance);
  renderStudents();

  $("#studentSearch")?.addEventListener("input", () => {
    page = 1;
    renderStudents();
  });
});

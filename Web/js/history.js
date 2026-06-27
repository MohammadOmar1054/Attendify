import { loadClasses, loadHistory } from "./firebase.js";
import { $, badge, downloadCsv, onReady, paginate, renderPagination } from "./utils.js";

let historyRows = [];
let page = 1;
const perPage = 7;

function filters() {
  return {
    query: ($("#historySearch")?.value || "").toLowerCase(),
    classId: $("#classFilter")?.value || "",
    date: $("#dateFilter")?.value || "",
    student: ($("#studentFilter")?.value || "").toLowerCase(),
    status: $("#statusFilter")?.value || ""
  };
}

function filteredRows() {
  const active = filters();
  return historyRows.filter((row) => {
    const searchable = `${row.student} ${row.regNo}`.toLowerCase();
    return (!active.query || searchable.includes(active.query))
      && (!active.classId || row.classId === active.classId)
      && (!active.date || row.date === active.date)
      && (!active.student || row.student.toLowerCase().includes(active.student))
      && (!active.status || row.status === active.status);
  });
}

function renderHistory() {
  const rows = filteredRows();
  const pagination = paginate(rows, page, perPage);
  $("#historyCount").textContent = `${rows.length} records`;
  $("#historyTable").innerHTML = pagination.data.map((row) => `
    <tr>
      <td>${row.student}</td>
      <td>${row.regNo}</td>
      <td>${row.date}</td>
      <td>${row.time}</td>
      <td>${badge(row.status)}</td>
    </tr>
  `).join("");
  renderPagination($("#historyPagination"), pagination.pages, pagination.current, (selected) => {
    page = selected;
    renderHistory();
  });
}

function exportRows() {
  const rows = filteredRows();
  downloadCsv("attendify-attendance-history.csv", [
    ["Student", "Registration Number", "Date", "Time", "Status"],
    ...rows.map((row) => [row.student, row.regNo, row.date, row.time, row.status])
  ]);
}

onReady(async () => {
  const [classes, records] = await Promise.all([loadClasses(), loadHistory()]);
  historyRows = records;
  $("#classFilter").innerHTML += classes.map((course) => `<option value="${course.id}">${course.code} - ${course.name}</option>`).join("");
  renderHistory();

  ["historySearch", "classFilter", "dateFilter", "studentFilter", "statusFilter"].forEach((id) => {
    $(`#${id}`)?.addEventListener("input", () => {
      page = 1;
      renderHistory();
    });
  });

  $("#exportCsv")?.addEventListener("click", exportRows);
  $("#printHistory")?.addEventListener("click", () => window.print());
});

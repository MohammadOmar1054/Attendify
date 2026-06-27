export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

export function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}

export function setText(selector, text, root = document) {
  const element = $(selector, root);
  if (element) element.textContent = text;
}

export function formatDisplayDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(date);
}

export function formatClock(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

export function badge(status) {
  const normalized = String(status).toLowerCase();
  const tone = normalized.includes("present") || normalized.includes("enrolled") ? "success"
    : normalized.includes("late") || normalized.includes("pending") ? "warning"
      : "danger";
  return `<span class="badge ${tone}"><i class="fa-solid fa-circle"></i>${status}</span>`;
}

export function showToast(message) {
  const region = $(".toast-region");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  region.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

export function createStatCard({ label, value, icon }) {
  return `
    <article class="card stat-card">
      <div class="stat-icon"><i class="${icon}"></i></div>
      <h3>${label}</h3>
      <strong>${value}</strong>
    </article>
  `;
}

export function paginate(items, page = 1, perPage = 6) {
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(page, 1), pages);
  const start = (current - 1) * perPage;
  return { current, pages, data: items.slice(start, start + perPage) };
}

export function renderPagination(container, pages, current, onSelect) {
  if (!container) return;
  container.innerHTML = "";
  for (let page = 1; page <= pages; page += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = page;
    button.className = page === current ? "active" : "";
    button.addEventListener("click", () => onSelect(page));
    container.appendChild(button);
  }
}

export function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

// ============================================================
// Blue Heron ERP — Shared Utilities
// Category values: 'Raw' (ingredients) | 'Finished' (prep/menu items)
// ============================================================

// ── Toast Notifications ──
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const icons = { success: "✓", error: "✕", info: "ℹ" };
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || "•"}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = "opacity 0.3s, transform 0.3s";
    toast.style.opacity = "0";
    toast.style.transform = "translateX(30px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Modal helpers ──
function openModal(id) {
  document.getElementById(id)?.classList.add("open");
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove("open");
}

// ── Format helpers ──
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function fmtNum(n) {
  if (n === null || n === undefined) return "—";
  return Number(n).toLocaleString("id-ID");
}
function fmtCurrency(n) {
  if (n === null || n === undefined) return "—";
  return "Rp " + Number(n).toLocaleString("id-ID");
}

// ── Generate IDs ──
function generateId(prefix, existing) {
  const nums = existing
    .map((id) => parseInt(id.replace(prefix, ""), 10))
    .filter((n) => !isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return prefix + String(next).padStart(3, "0");
}

// ── Active nav link ──
function setActiveNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-item").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

// ── Sidebar HTML ──
// Nav reflects the actual daily workflow:
//   Masters (set up once) → Transactions (daily) → Reports (check)
const NAV_HTML = `
<nav class="sidebar">
  <div class="sidebar-logo" style="align-items:center;">
    <img src="assets/logo.png" alt="Blue Heron Logo" style="height:80px;" />
  </div>
  <div class="sidebar-nav">
    <div class="nav-section">Overview</div>
    <a href="index.html" class="nav-item"><span class="icon">⬡</span> Dashboard</a>

    <div class="nav-section">Setup</div>
    <a href="items.html" class="nav-item"><span class="icon">▤</span> Items</a>
    <a href="suppliers.html" class="nav-item"><span class="icon">🏭</span> Suppliers</a>
    <a href="recipes.html" class="nav-item"><span class="icon">📋</span> Recipes</a>

    <div class="nav-section">Daily Operations</div>
    <a href="purchase.html" class="nav-item"><span class="icon">↓</span> Purchases</a>
    <a href="production.html" class="nav-item"><span class="icon">⚙</span> Production</a>

    <div class="nav-section">Reports</div>
    <a href="stock-current.html" class="nav-item"><span class="icon">◉</span> Stock Report</a>
    <a href="stock-ledger.html" class="nav-item"><span class="icon">≡</span> Ledger Report</a>

    <div class="nav-section">Others</div>
    <a href="opening-stock.html" class="nav-item"><span class="icon">◫</span> Opening Stock</a>
    <a href="cogs-calculator.html" class="nav-item"><span class="icon">🧮</span> COGS Calculator</a>
  </div>
</nav>`;

// ── Inject sidebar + toast container ──
document.addEventListener("DOMContentLoaded", () => {
  const layout = document.querySelector(".layout");
  if (layout && !layout.querySelector(".sidebar")) {
    layout.insertAdjacentHTML("afterbegin", NAV_HTML);
  }
  if (!document.getElementById("toast-container")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div id="toast-container"></div>',
    );
  }
  setActiveNav();

  // Close modals on overlay click
  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  });
});

// ── Supabase error handler ──
function handleSbError(error, label = "Operation") {
  console.error(label, error);
  showToast(`${label} failed: ${error.message}`, "error");
}

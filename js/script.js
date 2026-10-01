// Mobile Navigation
const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

function setMenu(open) {
  navbar.classList.toggle("open", open);
  header.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
}

menuToggle.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

navbar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

// Header-Hintergrund beim Scrollen
function updateHeader() {
  header.classList.toggle("sticky", window.scrollY > 40);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Aktiven Navigationspunkt markieren
const navLinks = [...navbar.querySelectorAll('a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((sec) => navObserver.observe(sec));

  // Sanftes Einblenden der Inhalte
  const revealTargets = document.querySelectorAll(
    ".section-head, .card, .steps li, .timeline li, .lesson, .about-mark, .contact-form, .focus"
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

// Jahr im Footer
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

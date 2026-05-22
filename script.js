// Initialise les icônes vectorielles après le chargement de la librairie Lucide.
if (window.lucide) {
  window.lucide.createIcons();
}

const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.querySelector("#mobileMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.classList.toggle("open");
  mobileMenu.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".mobile-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Slider hero léger : pas de dépendance, transition fluide, image réelle plein écran.
const slides = [...document.querySelectorAll(".hero-slider .slide")];
let activeSlide = 0;

setInterval(() => {
  slides[activeSlide].classList.remove("active");
  activeSlide = (activeSlide + 1) % slides.length;
  slides[activeSlide].classList.add("active");
}, 5200);

// Apparition progressive des sections au scroll.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// Recherche et filtre produits combinés.
const searchInput = document.querySelector("#productSearch");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = [...document.querySelectorAll(".product-card")];
const emptyState = document.querySelector("#emptyState");
let activeFilter = "all";

function updateProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.includes(query);
    const shouldShow = matchesFilter && matchesSearch;

    card.classList.toggle("hidden", !shouldShow);
    if (shouldShow) visibleCount += 1;
  });

  emptyState.classList.toggle("hidden", visibleCount !== 0);
}

searchInput?.addEventListener("input", updateProducts);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateProducts();
  });
});

// Formulaire vitrine : confirmation instantanée et conservation du parcours sans backend.
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Demande reçue. TechZone vous recontactera rapidement.";
  contactForm.reset();
  setTimeout(() => {
    formStatus.textContent = "";
  }, 5000);
});

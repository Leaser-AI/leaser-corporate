const returnLine = document.querySelector(".return-line span");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");

if (returnLine) {
  returnLine.style.offsetPath = "ellipse(50% 50% at 50% 50%)";
}

if (siteHeader && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  siteHeader.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

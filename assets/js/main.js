(function () {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const revealTargets = Array.from(document.querySelectorAll(".section-observe"));
  const contactForm = document.querySelector("[data-contact-form]");
  const formNote = document.querySelector("[data-form-note]");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if ("IntersectionObserver" in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
  }

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      {
        rootMargin: "-35% 0px -58% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const subject = encodeURIComponent(`Website inquiry from ${name || "LORD Law website"}`);
      const bodyText = encodeURIComponent(
        [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "Not provided"}`,
          "",
          "Message:",
          message
        ].join("\n")
      );

      if (formNote) {
        formNote.textContent = "Opening your email client with the inquiry details.";
        formNote.classList.add("is-success");
      }

      window.location.href = `mailto:info@lordlaw.ph?subject=${subject}&body=${bodyText}`;
    });
  }
})();

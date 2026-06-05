(function () {
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const hashNavLinks = navLinks.filter((link) => String(link.getAttribute("href") || "").startsWith("#"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const revealTargets = Array.from(document.querySelectorAll(".section-observe"));
  const contactForm = document.querySelector("[data-contact-form]");
  const formNote = document.querySelector("[data-form-note]");
  const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
  const counters = Array.from(document.querySelectorAll("[data-count]"));
  const wordRotators = Array.from(document.querySelectorAll("[data-rotate-words]"));
  const practiceCards = Array.from(document.querySelectorAll("[data-practice-open]"));
  const practiceModal = document.querySelector("[data-practice-modal]");
  const practicePanel = practiceModal ? practiceModal.querySelector(".practice-modal-panel") : null;
  const practiceTitle = practiceModal ? practiceModal.querySelector("[data-practice-title]") : null;
  const practiceIntro = practiceModal ? practiceModal.querySelector("[data-practice-intro]") : null;
  const practiceKicker = practiceModal ? practiceModal.querySelector("[data-practice-kicker]") : null;
  const practiceWork = practiceModal ? practiceModal.querySelector("[data-practice-work]") : null;
  const practiceHelp = practiceModal ? practiceModal.querySelector("[data-practice-help]") : null;
  const practiceNote = practiceModal ? practiceModal.querySelector("[data-practice-note]") : null;
  let lastPracticeTrigger = null;

  const practiceDetails = {
    "real-estate": {
      kicker: "01 Featured practice",
      title: "Real Estate Solutions",
      intro: "Legal support for property transfers, development, ownership checks, taxes, and real estate disputes.",
      work: [
        "Transfer of title by sale, donation, inheritance, or extra-judicial settlement.",
        "Review and drafting of deeds, leases, broker engagements, options to purchase, and related property documents.",
        "Due diligence on title history, encumbrances, zoning, tax exposure, and third-party rights.",
        "Quieting of title, adverse claims, lis pendens, correction of title entries, and real estate disputes."
      ],
      help: [
        "Check the legal risk before a client signs or pays.",
        "Prepare documents that match the transaction and the registry requirements.",
        "Guide the client through tax, filing, and title-transfer steps.",
        "Handle disputes when ownership, possession, boundary, or document issues appear."
      ],
      note: "This is useful for buyers, sellers, families, developers, brokers, and property owners who need a clean path from agreement to registration."
    },
    corporate: {
      kicker: "02 Featured practice",
      title: "Corporate and Business Law",
      intro: "Practical legal work for business setup, daily operations, contracts, compliance, labor, tax, IP, AML, and data privacy.",
      work: [
        "SEC, DTI, LGU, secondary licenses, foreign investment, restructuring, and dissolution.",
        "Corporate housekeeping, board and stockholder documents, secretary certificates, and business records.",
        "Contracts, retainer support, service agreements, supplier terms, HR policies, and workplace rules.",
        "Taxation, incentives, intellectual property, brand protection, AML compliance, and data privacy support."
      ],
      help: [
        "Build the legal foundation before the business scales.",
        "Review documents before important decisions are signed.",
        "Keep company records and compliance steps organized.",
        "Give business owners a clear legal view before hiring, expanding, collecting, or contracting."
      ],
      note: "This area is useful for entrepreneurs, corporations, partnerships, family businesses, and companies that need legal support without slowing down daily operations."
    },
    family: {
      kicker: "03 Featured practice",
      title: "Family Law and Estate Planning",
      intro: "Support for family cases, civil registry concerns, succession, wills, trusts, and family-owned assets.",
      work: [
        "Nullity, annulment, legal separation, custody, support, VAWC concerns, and adoption.",
        "Correction of civil registry records, guardianship, and recognition of foreign divorce.",
        "Wills, living trusts, succession planning, family corporations, and business succession.",
        "Real estate transfers involving family property, inheritance, or estate settlement."
      ],
      help: [
        "Explain the legal options in plain terms before the family takes action.",
        "Prepare documents and court filings with care.",
        "Protect family assets and reduce confusion during succession.",
        "Coordinate sensitive family matters with privacy and structure."
      ],
      note: "This area is useful when family, property, and business interests overlap and the client needs both legal clarity and careful handling."
    },
    immigration: {
      kicker: "04 Featured practice",
      title: "Immigration, Naturalization, and Visas",
      intro: "Guidance for visa applications, permits, residency, naturalization, blacklist lifting, and deportation concerns.",
      work: [
        "9-G employment visas, student visas, 13-A visas, dependent visas, and special study permits.",
        "Temporary and permanent resident visas, quota immigrant visas, SIRV, SRRV, treaty trader, and investor visas.",
        "Work permits, Bureau of Immigration compliance, and document preparation.",
        "Judicial naturalization, deportation litigation, and lifting of blacklist."
      ],
      help: [
        "Identify the right visa or immigration path for the client.",
        "Prepare requirements and filings to avoid avoidable delays.",
        "Guide employers, foreign nationals, and families through compliance steps.",
        "Respond to immigration problems before they become bigger legal issues."
      ],
      note: "This area is useful for foreign nationals, employers, investors, students, spouses, and families who need lawful stay or status in the Philippines."
    },
    litigation: {
      kicker: "05 Featured practice",
      title: "Civil and Criminal Litigation",
      intro: "Court and dispute support for civil, criminal, commercial, debt, administrative, and appellate matters.",
      work: [
        "Representation before trial courts, the Court of Appeals, the Supreme Court, and administrative bodies.",
        "Civil cases, criminal cases, commercial court litigation, debt collection, and contract disputes.",
        "Pre-litigation demand letters, negotiation, mediation, compromise, and settlement work.",
        "Case assessment, pleading preparation, hearings, evidence review, and appeal support."
      ],
      help: [
        "Study the facts and identify the strongest legal path.",
        "Try practical settlement when it protects the client better than a long fight.",
        "Prepare court documents and represent the client through hearings.",
        "Keep the client informed about risks, timelines, and next steps."
      ],
      note: "This area is useful when a dispute needs firm legal action, but the client still wants a practical view of cost, time, risk, and possible settlement."
    },
    government: {
      kicker: "06 Featured practice",
      title: "Government Accountability Cases",
      intro: "Support for sensitive proceedings involving Ombudsman, Sandiganbayan, Commission on Audit, and administrative agencies.",
      work: [
        "Ombudsman complaints, counter-affidavits, position papers, and related submissions.",
        "Sandiganbayan and administrative proceedings involving public officers or government transactions.",
        "Commission on Audit concerns, notices, disallowances, and accountability-related issues.",
        "Document review, case strategy, hearings, and coordination for sensitive government matters."
      ],
      help: [
        "Clarify the issue, exposure, and documents needed before responding.",
        "Prepare a structured answer backed by facts and law.",
        "Handle sensitive communications with care and proper timing.",
        "Guide clients through agency procedures, hearings, and required filings."
      ],
      note: "This area is useful when the matter involves public accountability, government funds, official action, or administrative liability."
    }
  };

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

  if ("IntersectionObserver" in window && sections.length && hashNavLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          hashNavLinks.forEach((link) => {
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

  if (heroSlides.length) {
    let activeHeroSlide = 0;

    const setHeroSlide = (index) => {
      activeHeroSlide = (index + heroSlides.length) % heroSlides.length;

      heroSlides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeHeroSlide);
      });
    };

    window.setInterval(() => setHeroSlide(activeHeroSlide + 1), 5500);
  }

  if (wordRotators.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    wordRotators.forEach((rotator) => {
      const words = String(rotator.dataset.rotateWords || "")
        .split(",")
        .map((word) => word.trim())
        .filter(Boolean);

      if (words.length < 2) return;

      let activeWord = Math.max(0, words.indexOf(rotator.textContent.trim()));

      window.setInterval(() => {
        activeWord = (activeWord + 1) % words.length;
        rotator.classList.add("is-changing");

        window.setTimeout(() => {
          rotator.textContent = words[activeWord];
          rotator.classList.remove("is-changing");
        }, 180);
      }, 1800);
    });
  }

  if (counters.length) {
    const formatCount = (value) => `${Math.round(value).toLocaleString()}+`;
    const animateCounter = (counter) => {
      if (counter.dataset.counted === "true") return;

      const target = Number(counter.dataset.count || "0");
      if (!Number.isFinite(target) || target <= 0) return;

      counter.dataset.counted = "true";
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = formatCount(target * eased);

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          counter.textContent = formatCount(target);
        }
      };

      window.requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.35 }
      );

      counters.forEach((counter) => counterObserver.observe(counter));
    } else {
      counters.forEach(animateCounter);
    }
  }

  if (practiceCards.length && practiceModal && practicePanel) {
    const fillList = (list, items) => {
      if (!list) return;
      list.innerHTML = "";
      items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });
    };

    const openPracticeModal = (key, trigger) => {
      const details = practiceDetails[key];
      if (!details) return;

      lastPracticeTrigger = trigger || null;
      if (practiceKicker) practiceKicker.textContent = details.kicker;
      if (practiceTitle) practiceTitle.textContent = details.title;
      if (practiceIntro) practiceIntro.textContent = details.intro;
      fillList(practiceWork, details.work);
      fillList(practiceHelp, details.help);
      if (practiceNote) practiceNote.textContent = details.note;

      practiceModal.hidden = false;
      body.classList.add("modal-open");
      window.setTimeout(() => practicePanel.focus(), 0);
    };

    const closePracticeModal = () => {
      if (practiceModal.hidden) return;

      practiceModal.hidden = true;
      body.classList.remove("modal-open");

      if (lastPracticeTrigger) {
        lastPracticeTrigger.focus();
      }
    };

    practiceCards.forEach((card) => {
      card.addEventListener("click", () => {
        openPracticeModal(card.dataset.practiceOpen, card);
      });
    });

    practiceModal.querySelectorAll("[data-practice-close]").forEach((closeButton) => {
      closeButton.addEventListener("click", closePracticeModal);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closePracticeModal();
      }
    });
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

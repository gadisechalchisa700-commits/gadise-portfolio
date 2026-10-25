
/* ==========================================
   1. MOBILE NAVIGATION MENU
========================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  // Close the menu after clicking a navigation link.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // Close the menu when Escape is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}


/* ==========================================
   2. TYPING ANIMATION
========================================== */

const typingText = document.querySelector("#typing-text");

if (typingText) {
  const roles = [
    "Full-Stack Developer",
    "Web Developer",
    "Creative Problem Solver"
  ];

  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = true;

  function typeRole() {
    const currentRole = roles[roleIndex];

    if (deleting) {
      characterIndex--;
    } else {
      characterIndex++;
    }

    typingText.textContent = currentRole.slice(0, characterIndex);

    let delay = deleting ? 55 : 90;

    if (characterIndex === 0 && deleting) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    } else if (
      characterIndex === roles[roleIndex].length &&
      !deleting
    ) {
      deleting = true;
      delay = 1400;
    }

    setTimeout(typeRole, delay);
  }

  // Wait before starting the first typing cycle.
  setTimeout(typeRole, 1800);
}


/* ==========================================
   3. REVEAL SECTIONS WHEN SCROLLING
========================================== */

// Add the class "reveal" to HTML elements
// that you want to animate when they enter the screen.

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Keep content visible in browsers without IntersectionObserver.
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


/* ==========================================
   4. CONTACT FORM VALIDATION
========================================== */

const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = contactForm.querySelector(
      'input[name="name"]'
    );

    const emailInput = contactForm.querySelector(
      'input[name="email"]'
    );

    const messageInput = contactForm.querySelector(
      'textarea[name="message"]'
    );

    // Check that the expected fields exist.
    if (!nameInput || !emailInput || !messageInput) {
      formStatus.textContent =
        "The contact form fields need to be checked.";
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Check for empty fields.
    if (!name || !email || !message) {
      formStatus.textContent =
        "Please fill in your name, email, and message.";
      return;
    }

    // Basic email format check.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      formStatus.textContent =
        "Please enter a valid email address.";
      emailInput.focus();
      return;
    }

    // Frontend validation succeeded.
    // A backend will be connected in a later step.
    formStatus.textContent =
      "Your form is valid! Sending messages will work after we connect the backend.";
  });
}


/* ==========================================
   5. UPDATE FOOTER YEAR AUTOMATICALLY
========================================== */

const footerYear = document.querySelector("#year");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}
// Animate the introduction word by word
const introTyping = document.getElementById("intro-typing");

if (introTyping) {
  const words = ["Hi,", "I'm", "Gadise", "Chalchisa"];
  let wordIndex = 0;

  // Start with an empty heading.
  introTyping.textContent = "";

  function showNextWord() {
    if (wordIndex >= words.length) {
      return;
    }

    const word = document.createElement("span");

    // Highlight the name.
    if (wordIndex >= 2) {
      word.className = "intro-name";
    }

    word.textContent = words[wordIndex];

    word.style.opacity = "0";
    word.style.display = "inline-block";
    word.style.marginRight = "0.25em";
    word.style.animation =
      "introWordAppear 0.4s ease forwards";

    introTyping.appendChild(word);

    wordIndex++;

    setTimeout(showNextWord, 450);
  }

  showNextWord();
}
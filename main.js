// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ========== NAVIGATION TOGGLE ==========
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    navToggle.classList.toggle("open"); // For hamburger animation
  });

  // Close nav on link click (mobile)
  const links = navLinks.querySelectorAll("a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("open");
    });
  });

  // ========== SMOOTH SCROLLING ==========
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // ========== SCROLL REVEAL ANIMATIONS ==========
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on load too

  // ========== FORM VALIDATION ==========
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const errorMsg = document.getElementById("form-error");
  const successMsg = document.getElementById("form-success");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      errorMsg.textContent = "Please fill in all fields.";
      successMsg.textContent = "";
      return;
    }

    if (!validateEmail(email)) {
      errorMsg.textContent = "Please enter a valid email address.";
      successMsg.textContent = "";
      return;
    }

    // Simulate successful submission
    errorMsg.textContent = "";
    successMsg.textContent = "Thank you! Your message has been sent.";

    // Clear form
    form.reset();
  });

  function validateEmail(email) {
    // Simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});

/* GA Elite Crushers campaign (mock) — progressive enhancement only.
   The page is fully readable and navigable without JS. */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close menu when a link inside it is chosen
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- Smooth scroll for in-page anchors (respects reduced motion) ---- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      // Move focus for keyboard/screen-reader users
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  /* ---- Mock interest form (no backend, no fake success) ---- */
  var form = document.getElementById("interest-form");
  if (form) {
    var status = document.getElementById("form-status");

    function setInvalid(field, invalid) {
      var wrap = field.closest(".field");
      if (wrap) wrap.classList.toggle("invalid", invalid);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      var required = form.querySelectorAll("[required]");
      required.forEach(function (field) {
        var ok = field.value.trim() !== "";
        if (field.type === "email") {
          ok = ok && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }
        setInvalid(field, !ok);
        if (!ok && valid) field.focus();
        if (!ok) valid = false;
      });

      if (!status) return;
      if (!valid) {
        status.className = "form-status show";
        status.textContent = "Please complete the highlighted required fields so the campaign team can follow up.";
        return;
      }

      // Set reply-to so email replies reach the submitter
      var emailField = form.querySelector("#email");
      var replyto = form.querySelector("#replyto-mirror");
      if (emailField && replyto) replyto.value = emailField.value.trim();

      // Submit to Formspree via fetch so the visitor stays on the page
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }
      status.className = "form-status show";
      status.textContent = "Sending your information…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            status.className = "form-status show";
            status.innerHTML =
              "<strong>Thank you.</strong> Your information has been sent to the campaign team, " +
              "and someone will follow up with you. No payment or commitment was made.";
          } else {
            return response.json().then(function (data) {
              var msg = (data && data.errors)
                ? data.errors.map(function (er) { return er.message; }).join(", ")
                : "Something went wrong sending your message.";
              throw new Error(msg);
            });
          }
        })
        .catch(function (err) {
          status.className = "form-status show";
          status.innerHTML =
            "<strong>Sorry, that didn't send.</strong> " +
            (err && err.message ? err.message + " " : "") +
            "Please try again, or email the campaign team directly at " +
            "<a href=\"mailto:bazeocrisy@yahoo.com\">bazeocrisy@yahoo.com</a>.";
        })
        .then(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        });
    });

    // Clear invalid state as the user corrects a field
    form.addEventListener("input", function (e) {
      var wrap = e.target.closest(".field.invalid");
      if (wrap) wrap.classList.remove("invalid");
    });
  }

  /* ---- Footer contact button: assemble mailto in JS so scrapers can't read it ---- */
  var emailBtn = document.getElementById("footer-email");
  if (emailBtn) {
    var user = "bazeocrisy";
    var domain = "yahoo.com";
    var subject = encodeURIComponent("GA Elite Crushers sponsorship question");
    emailBtn.setAttribute(
      "href",
      "mailto:" + user + "@" + domain + "?subject=" + subject
    );
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

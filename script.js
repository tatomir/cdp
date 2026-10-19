const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const status = form.querySelector(".form-status");
    const submitButton = form.querySelector('button[type="submit"]');
    const initialButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Se trimite…";
    status.className = "form-status";
    status.textContent = "Solicitarea se trimite.";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Submission failed");
      }

      form.reset();
      status.classList.add("is-success");
      status.textContent = "Solicitarea a fost trimisă. Vă mulțumesc!";
    } catch {
      status.classList.add("is-error");
      status.textContent = "Solicitarea nu a putut fi trimisă. Încercați din nou.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = initialButtonText;
    }
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

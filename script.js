const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

function closeMenu() {
  navigation?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Deschide meniul");
}

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Închide meniul" : "Deschide meniul");
});

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("is-open")) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});

// Without JavaScript all three program descriptions remain available.
document.querySelectorAll("[data-programs]").forEach((explorer) => {
  const tabs = [...explorer.querySelectorAll("[data-panel]")];
  const tabList = explorer.querySelector(".program-tabs");
  const mobile = window.matchMedia("(max-width: 680px)");
  tabList.setAttribute("role", "tablist");
  const setOrientation = () => tabList.setAttribute("aria-orientation", mobile.matches ? "horizontal" : "vertical");
  setOrientation();
  mobile.addEventListener("change", setOrientation);

  function selectTab(selected) {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.dataset.panel).hidden = !active;
    });
  }
  tabs.forEach((tab, index) => {
    const panel = document.getElementById(tab.dataset.panel);
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.tabIndex = 0;
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (event.key === (mobile.matches ? "ArrowRight" : "ArrowDown")) next = (index + 1) % tabs.length;
      if (event.key === (mobile.matches ? "ArrowLeft" : "ArrowUp")) next = (index + tabs.length - 1) % tabs.length;
      if (next === undefined) return;
      event.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    });
  });
  selectTab(tabs[0]);
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-drawing");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.3 });
  document.querySelectorAll(".draw-thread").forEach((path) => observer.observe(path));
}

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

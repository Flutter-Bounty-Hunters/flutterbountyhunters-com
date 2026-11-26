// Navbar

(function() {
  const hero = document.querySelector("header");
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navbarToggle");
  const menu = document.getElementById("navbarMenu");
  const links = Array.from(menu.querySelectorAll("a"));

  // The navbar sticks at the moment that the hero above it leaves the window.
  new IntersectionObserver(([entry]) => {
    navbar.toggleAttribute("data-stuck", !entry.isIntersecting);
  }, { rootMargin: "-1px 0px 0px 0px" }).observe(hero);

  const target = document.getElementById("navbarTarget");
  let pointedAt = null;

  // Moves the target brackets to the link that's being pointed at, or else the link for the section in view.
  function aim() {
    const link = pointedAt || links.find((link) => link.hasAttribute("aria-current"));
    if (!link) {
      target.removeAttribute("data-locked");
      return;
    }

    // Appear directly on the first link, instead of sliding over from wherever the brackets were last seen.
    const isAppearing = !target.hasAttribute("data-locked");
    if (isAppearing) {
      target.style.transition = "none";
    }
    target.style.left = `${link.offsetLeft}px`;
    target.style.width = `${link.offsetWidth}px`;
    if (isAppearing) {
      target.getBoundingClientRect();
      target.style.transition = "";
    }
    target.toggleAttribute("data-locked", true);
  }

  function pointAt(link) {
    pointedAt = link;
    aim();
  }

  links.forEach((link) => {
    link.addEventListener("pointerenter", () => pointAt(link));
    link.addEventListener("pointerleave", () => pointAt(null));
    link.addEventListener("focus", () => link.matches(":focus-visible") && pointAt(link));
    link.addEventListener("blur", () => pointAt(null));
  });

  // Links change size when the web font loads.
  new ResizeObserver(aim).observe(menu);

  // Highlight the section that's crossing a line partway down the window.
  const sections = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const link = links.find((link) => link.hash === "#" + entry.target.id);
      if (entry.isIntersecting) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
    aim();
  }, { rootMargin: "-40% 0px -60% 0px" });
  links.forEach((link) => sections.observe(document.querySelector(link.hash)));

  function setOpen(isOpen) {
    navbar.toggleAttribute("data-open", isOpen);
    toggle.setAttribute("aria-expanded", isOpen);
  }

  toggle.addEventListener("click", () => {
    const isOpen = !navbar.hasAttribute("data-open");
    setOpen(isOpen);

    // Below the hero, the navbar is near the bottom of the window. Bring it to the top to make room for the menu.
    if (isOpen && !navbar.hasAttribute("data-stuck")) {
      window.scrollTo({ top: hero.offsetTop + hero.offsetHeight });
    }
  });

  links.forEach((link) => link.addEventListener("click", () => setOpen(false)));

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navbar.hasAttribute("data-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
})();

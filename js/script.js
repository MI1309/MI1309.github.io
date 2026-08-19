document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const revealItems = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sections = document.querySelectorAll(".content-section");
  const navItems = document.querySelectorAll(".side-nav .nav-item");

  const sectionMap = new Map();
  navItems.forEach((item) => {
    const href = item.getAttribute("href");
    if (href && href.startsWith("#")) {
      const id = href.substring(1);
      const section = document.getElementById(id);
      if (section) {
        sectionMap.set(section, item);
      }
    }
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const navItem = sectionMap.get(entry.target);
        if (navItem) {
          if (entry.isIntersecting) {
            navItems.forEach((n) => n.classList.remove("active"));
            navItem.classList.add("active");
          }
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    if (sectionMap.has(section)) {
      sectionObserver.observe(section);
    }
  });

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const href = item.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    });
  });

  const roleWords = ["Cyber Security", "Full Stack"];
  const cycler = document.getElementById("role-cycler");
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const TYPE_SPEED = 110;
  const DELETE_SPEED = 60;
  const PAUSE_AFTER_WORD = 1400;
  const PAUSE_AFTER_DELETE = 350;

  if (cycler) {
    function cycleRoles() {
      const currentWord = roleWords[wordIndex];

      if (!isDeleting) {
        charIndex++;
        cycler.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          isDeleting = true;
          setTimeout(cycleRoles, PAUSE_AFTER_WORD);
          return;
        }
        setTimeout(cycleRoles, TYPE_SPEED + Math.random() * 50);
      } else {
        charIndex--;
        cycler.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % roleWords.length;
          setTimeout(cycleRoles, PAUSE_AFTER_DELETE);
          return;
        }
        setTimeout(cycleRoles, DELETE_SPEED);
      }
    }

    setTimeout(cycleRoles, 600);
  }
});

  // Load archive (static `/data/archive.json` preferred) and render into #archive-list
  async function loadArchive() {
    try {
      // prefer static file for GitHub Pages / Vercel static deploy
      let res = await fetch('/data/archive.json');
      if (!res.ok) {
        // fallback to serverless endpoint if static not found
        res = await fetch('/api/archive');
      }
      if (!res.ok) throw new Error('no archive');
      const data = await res.json();
      const container = document.getElementById('archive-list');
      if (!container) return;
      if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = '<p>No archive items.</p>';
        return;
      }
      const html = data.map(item => {
        return `<article class="project-card"><div class="project-body"><h3>${escapeHtml(item.title || '')}</h3><p>${escapeHtml(item.description || '')}</p></div></article>`;
      }).join('\n');
      container.innerHTML = html;
    } catch (e) {
      const container = document.getElementById('archive-list');
      if (container) container.innerHTML = '<p>Failed to load archive.</p>';
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (s) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]);
    });
  }

  document.addEventListener('DOMContentLoaded', loadArchive);

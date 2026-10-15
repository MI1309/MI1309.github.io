"use client";
import { useEffect } from "react";
export default function ScrollEffects() {
  useEffect(() => {
    document.documentElement.classList.add("has-js");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((item) => {
      revealObserver.observe(item);
    });
    const sections = Array.from(
      document.querySelectorAll('main[data-section="home"] .content-section'),
    );
    const navItems = document.querySelectorAll(".side-nav [data-section-target]");
    let scrollFrame = 0;
    const updateActiveSection = () => {
      if (!sections.length) return;

      const activationLine = window.innerHeight * 0.42;
      let activeSection = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          activeSection = section;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        activeSection = sections[sections.length - 1];
      }

      navItems.forEach((item) => {
        const isActive = item.dataset.sectionTarget === activeSection.id;
        item.classList.toggle("active", isActive);
        if (isActive) {
          item.setAttribute("aria-current", "location");
        } else {
          item.removeAttribute("aria-current");
        }
      });
    };
    const scheduleActiveSectionUpdate = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(updateActiveSection);
    };

    if (sections.length) {
      window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
      window.addEventListener("resize", scheduleActiveSectionUpdate);
      window.addEventListener("hashchange", scheduleActiveSectionUpdate);
      updateActiveSection();
    }
    return () => {
      document.documentElement.classList.remove("has-js");
      revealObserver.disconnect();
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
      window.removeEventListener("hashchange", scheduleActiveSectionUpdate);
      cancelAnimationFrame(scrollFrame);
    };
  }, []);
  return null;
}

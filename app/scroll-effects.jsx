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
    const sections = document.querySelectorAll(".content-section");
    const navItems = document.querySelectorAll(".side-nav .nav-item");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navItems.forEach((item) => {
            item.classList.toggle(
              "active",
              item.hash === `#${entry.target.id}`,
            );
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));
    const roleCycler = document.getElementById("role-cycler");
    const roles = ["Cyber Security", "Full Stack"];
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer;
    const cycleRole = () => {
      const role = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      if (roleCycler) roleCycler.textContent = role.slice(0, characterIndex);
      if (characterIndex === role.length) {
        deleting = true;
        timer = setTimeout(cycleRole, 1400);
      } else if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timer = setTimeout(cycleRole, 350);
      } else {
        timer = setTimeout(cycleRole, deleting ? 60 : 110);
      }
    };
    timer = setTimeout(cycleRole, 600);
    return () => {
      document.documentElement.classList.remove("has-js");
      revealObserver.disconnect();
      sectionObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return null;
}

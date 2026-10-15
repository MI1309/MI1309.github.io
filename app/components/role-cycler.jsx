"use client";
import { useEffect } from "react";
const roles = ["Web Development", "Cybersecurity", "Japanese Learning"];
export function RoleCycler() {
  useEffect(() => {
    const text = document.getElementById("role-cycler");
    if (
      !text ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer;
    const cycleRole = () => {
      const role = roles[roleIndex];
      characterIndex += deleting ? -1 : 1;
      text.textContent = role.slice(0, characterIndex);
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
    text.textContent = "";
    timer = setTimeout(cycleRole, 600);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <h2 className="hero-role" aria-hidden="true">
        <span id="role-cycler">Web Development</span>
        <span className="cursor">|</span>
      </h2>
      <span className="sr-only">
        Web development, cybersecurity, and Japanese learning
      </span>
    </>
  );
}

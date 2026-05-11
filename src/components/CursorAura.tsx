"use client";

import { useEffect } from "react";

/**
 * Custom cursor aura — a thin ring that follows the cursor with a delay,
 * giving the page a deliberate, exploratory feel. Disabled on touch devices.
 */
export default function CursorAura() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const ring = document.createElement("div");
    ring.id = "cursor-ring";
    document.body.appendChild(ring);

    let rafId = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onEnterInteractive = () => ring.classList.add("is-hover");
    const onLeaveInteractive = () => ring.classList.remove("is-hover");

    const animate = () => {
      // Smooth follow — lag the cursor for a deliberate feel
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      ring.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", onMove);

    // Attach hover detection to all interactive elements
    const interactiveSelectors = "a, button, input, textarea, [role='button']";
    const elements = document.querySelectorAll(interactiveSelectors);
    elements.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    // Re-attach when new interactive elements appear (rough but good enough)
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(interactiveSelectors);
      newElements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
      observer.disconnect();
      ring.remove();
    };
  }, []);

  return null;
}

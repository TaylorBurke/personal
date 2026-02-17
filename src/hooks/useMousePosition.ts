"use client";

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";

const SPRING_CONFIG = { stiffness: 150, damping: 20, mass: 0.5 };

/**
 * Track mouse position relative to a container, normalised to -1…1.
 * Returns spring-smoothed MotionValues so React never re-renders on move.
 */
export function useMousePosition(
  ref: RefObject<HTMLElement | null>
): { mouseX: MotionValue<number>; mouseY: MotionValue<number> } {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, SPRING_CONFIG);
  const mouseY = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      rawX.set(nx);
      rawY.set(ny);
    };

    const handleLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref, rawX, rawY]);

  return { mouseX, mouseY };
}

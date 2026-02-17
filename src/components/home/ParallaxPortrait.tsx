"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "motion/react";

// Generate a true squircle (superellipse n=4) as an SVG polygon.
function generateSquirclePoints(n = 4, steps = 72): string {
  return Array.from({ length: steps }, (_, i) => {
    const angle = (2 * Math.PI * i) / steps;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const exp = 2 / n;
    const x = 0.5 + 0.5 * Math.sign(cos) * Math.abs(cos) ** exp;
    const y = 0.5 + 0.5 * Math.sign(sin) * Math.abs(sin) ** exp;
    return `${x.toFixed(4)},${y.toFixed(4)}`;
  }).join(" ");
}

const squirclePoints = generateSquirclePoints();

interface ParallaxPortraitProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  delay?: number;
}

export default function ParallaxPortrait({
  mouseX,
  mouseY,
  delay = 0.3,
}: ParallaxPortraitProps) {
  // Map normalised -1…1 mouse to rotation (inverted for natural tilt)
  const rotateY = useTransform(mouseX, [-1, 1], [-12, 12]);
  const rotateX = useTransform(mouseY, [-1, 1], [12, -12]);

  // Glow ring shifts opposite direction for parallax depth
  const glowX = useTransform(mouseX, [-1, 1], [6, -6]);
  const glowY = useTransform(mouseY, [-1, 1], [6, -6]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className="mx-auto mb-8 relative inline-block"
      style={{ perspective: 800 }}
    >
      {/* SVG clipPath definition for a true squircle */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="squircle" clipPathUnits="objectBoundingBox">
            <polygon points={squirclePoints} />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Glow ring behind the squircle — shifts opposite for depth */}
        <motion.div
          className="absolute -inset-1 rounded-[28%] bg-gradient-to-br from-violet to-coral opacity-50 blur-md"
          style={{ x: glowX, y: glowY }}
        />
        <div
          className="relative shadow-2xl shadow-violet/20"
          style={{ clipPath: "url(#squircle)" }}
        >
          <Image
            src="/images/portrait.png"
            alt="Taylor Burke"
            width={280}
            height={280}
            priority
            className="block object-cover object-center"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

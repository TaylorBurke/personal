"use client";

import Image from "next/image";
import { motion } from "motion/react";
import AnimatedText from "@/components/ui/AnimatedText";
import RotatingTitle from "@/components/home/RotatingTitle";

// Generate a true squircle (superellipse n=4) as an SVG polygon.
// Formula: |x|^n + |y|^n = r^n  with n=4, mapped to 0-1 for objectBoundingBox.
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

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      {/* SVG clipPath definition for a true squircle */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="squircle" clipPathUnits="objectBoundingBox">
            <polygon points={squirclePoints} />
          </clipPath>
        </defs>
      </svg>

      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-violet/15 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-coral/10 blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Portrait — true squircle mask */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-8 relative inline-block"
        >
          {/* Glow ring behind the squircle */}
          <div className="absolute -inset-1 rounded-[28%] bg-gradient-to-br from-violet to-coral opacity-50 blur-md" />
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <RotatingTitle />
        </motion.div>

        <AnimatedText
          text="Taylor Burke"
          as="h1"
          className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold tracking-tight bg-gradient-to-r from-snow via-violet-hover to-coral bg-clip-text text-transparent"
          delay={0.2}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-fog max-w-2xl mx-auto leading-relaxed"
        >
          I craft bold digital experiences at the intersection of design and
          technology. Multi-disciplinary maker of things that look good and work
          even better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-violet to-coral text-snow font-heading font-medium text-lg shadow-lg shadow-violet/25 hover:shadow-violet/50 hover:brightness-110 transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-ash text-snow font-heading font-medium text-lg hover:border-violet hover:text-violet transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-fog"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

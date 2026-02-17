"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import AnimatedText from "@/components/ui/AnimatedText";
import RotatingTitle from "@/components/home/RotatingTitle";
import AuroraBackground from "@/components/home/AuroraBackground";
import ParallaxPortrait from "@/components/home/ParallaxPortrait";
import { useMousePosition } from "@/hooks/useMousePosition";

/** Cinematic entrance beat timings (seconds) */
const BEAT = {
  aurora: 0,
  portrait: 0.3,
  title: 0.6,
  heading: 0.8,
  subtitle: 1.4,
  cta: 1.7,
  scroll: 2.2,
} as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { mouseX, mouseY } = useMousePosition(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden"
    >
      {/* Aurora animated background */}
      <AuroraBackground delay={BEAT.aurora} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Parallax 3D portrait */}
        <ParallaxPortrait
          mouseX={mouseX}
          mouseY={mouseY}
          delay={BEAT.portrait}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: BEAT.title }}
          className="mb-6"
        >
          <RotatingTitle />
        </motion.div>

        <AnimatedText
          text="Taylor Burke"
          as="h1"
          className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold tracking-tight bg-gradient-to-r from-snow via-violet-hover to-coral bg-clip-text text-transparent"
          delay={BEAT.heading}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: BEAT.subtitle, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-fog max-w-2xl mx-auto leading-relaxed"
        >
          I craft bold digital experiences at the intersection of design and
          technology. Multi-disciplinary maker of things that look good and work
          even better.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: BEAT.cta, duration: 0.6 }}
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
          transition={{ delay: BEAT.scroll }}
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

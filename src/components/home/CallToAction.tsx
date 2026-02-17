"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const VERBS = ["build", "code", "craft", "design", "hack", "spark"];
const TYPE_SPEED = 90;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const started = useRef(false);

  const word = words[wordIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (displayedChars < word.length) {
        setIsIdle(false);
        return setTimeout(() => setDisplayedChars((c) => c + 1), TYPE_SPEED);
      } else {
        setIsIdle(true);
        return setTimeout(() => {
          setIsIdle(false);
          setIsDeleting(true);
        }, PAUSE_AFTER_TYPE);
      }
    } else {
      setIsIdle(false);
      if (displayedChars > 0) {
        return setTimeout(() => setDisplayedChars((c) => c - 1), DELETE_SPEED);
      } else {
        return setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((i) => (i + 1) % words.length);
        }, PAUSE_AFTER_DELETE);
      }
    }
  }, [displayedChars, isDeleting, word.length, words.length]);

  useEffect(() => {
    const timeout = tick();
    return () => clearTimeout(timeout);
  }, [tick]);

  return { text: word.slice(0, displayedChars), isIdle, started };
}

export default function CallToAction() {
  const { text, isIdle } = useTypewriter(VERBS);

  return (
    <section className="py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet/10 blur-[100px]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-violet to-coral bg-clip-text text-transparent">
              {text}
            </span>
            <span
              className={`inline-block w-[3px] h-[0.75em] bg-gradient-to-b from-violet to-coral ml-0.5 align-baseline relative -top-[0.05em] ${isIdle ? "animate-[blink_1s_ease-in-out_infinite]" : ""}`}
            />
            <br />
            something together.
          </h2>
          <Button href="/contact" variant="primary" size="lg">
            Get in Touch
          </Button>

          <style jsx>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </motion.div>
      </Container>
    </section>
  );
}

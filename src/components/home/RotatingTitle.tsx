"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const builderTitles = [
  "Maker", "Tinkerer", "Dreamer", "Builder", "Crafter", "Coder", "Hacker",
  "Sketcher", "Doodler", "Fixer", "Hatcher", "Grower",
  "Linker", "Molder", "Splicer", "Patcher", "Forger", "Gluer",
  "Nester", "Planter", "Rigger", "Bender", "Looper", "Stitcher",
  "Binder", "Caster", "Photo-bomber", "Clicker", "Typer",
  "Snapper", "Sander", "Bridger", "Joiner",
  "Welder", "Weaver", "Knitter", "Spinner", "Winder", "Dabbler", "Fiddler",
  "Prodder", "Nudger", "Bundler", "Wrangler",
  "Kindler", "Whisperer", "Writer", "Inker", "Painter", "Seeker",
  "Searcher", "Finder", "Solver", "Shaper", "Explorer", "Mapper",
  "Wanderer", "Rover", "Striver", "High-fiver",
  "Mover", "Shaker", "Mixer", "Blender", "Composer", "Arranger",
  "Polisher", "Originator", "Generator", "Producer",
  "Creator", "Sticker-slapper", "Head-scratcher", "Bug-slayer"
];

const MOBILE_MAX_CHARS = 9;

function pickRandomBuilder(lastPick: string, isMobile: boolean): string {
  const pool = isMobile
    ? builderTitles.filter((t) => t.length <= MOBILE_MAX_CHARS)
    : builderTitles;
  let pick: string;
  do {
    pick = pool[Math.floor(Math.random() * pool.length)];
  } while (pick === lastPick);
  return pick;
}

const TYPE_SPEED = 90;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

// Fixed sequence: Designer, Developer, then random builder title repeating
function getTitle(index: number, lastBuilder: string, isMobile: boolean): { label: string; font: string; italic: boolean } {
  const pos = index % 3;
  if (pos === 0) {
    return { label: "Designer", font: "var(--font-playfair)", italic: true };
  } else if (pos === 1) {
    return { label: "Developer", font: "var(--font-jetbrains-mono)", italic: false };
  } else {
    return { label: pickRandomBuilder(lastBuilder, isMobile), font: "var(--font-syne)", italic: false };
  }
}

interface RotatingTitleProps {
  onCycle?: () => void;
}

export default function RotatingTitle({ onCycle }: RotatingTitleProps) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const lastBuilderRef = useRef("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 639px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const [current, setCurrent] = useState(() => getTitle(0, "", false));

  const tick = useCallback(() => {
    const fullText = current.label;

    if (!isDeleting) {
      if (displayedChars < fullText.length) {
        setIsIdle(false);
        return setTimeout(
          () => setDisplayedChars((c) => c + 1),
          TYPE_SPEED
        );
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
        return setTimeout(
          () => setDisplayedChars((c) => c - 1),
          DELETE_SPEED
        );
      } else {
        return setTimeout(() => {
          setIsDeleting(false);
          onCycle?.();
          setTitleIndex((i) => {
            const next = i + 1;
            const nextTitle = getTitle(next, lastBuilderRef.current, isMobile);
            if (next % 3 === 2) lastBuilderRef.current = nextTitle.label;
            setCurrent(nextTitle);
            return next;
          });
        }, PAUSE_AFTER_DELETE);
      }
    }
  }, [displayedChars, isDeleting, current.label, isMobile, onCycle]);

  useEffect(() => {
    const timeout = tick();
    return () => clearTimeout(timeout);
  }, [tick]);

  return (
    <div className="h-20 sm:h-24 flex items-center justify-center">
      <span
        className={`text-5xl sm:text-7xl font-semibold tracking-wide leading-tight pb-1 bg-gradient-to-r from-violet to-coral bg-clip-text text-transparent decoration-clone ${current.italic ? "italic" : ""}`}
        style={{ fontFamily: current.font }}
      >
        {current.label.slice(0, displayedChars)}
      </span>
      <span
        className={`inline-block w-[3px] h-12 sm:h-16 bg-gradient-to-b from-violet to-coral ml-1 ${isIdle ? "animate-[blink_1s_ease-in-out_infinite]" : ""}`}
      />

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

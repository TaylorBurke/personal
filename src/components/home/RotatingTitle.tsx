"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const builderTitles = [
  "Maker", "Tinkerer", "Dreamer", "Builder", "Crafter", "Coder", "Hacker",
  "Sketcher", "Doodler", "Fixer", "Hatcher", "Grower", "Wielder", "Stacker",
  "Linker", "Molder", "Splicer", "Wirer", "Patcher", "Forger", "Gluer",
  "Nester", "Planter", "Rigger", "Bender", "Twister", "Looper", "Stitcher",
  "Binder", "Caster", "Flinger", "Tapper", "Clicker", "Typer", "Dragger",
  "Dropper", "Snapper", "Sander", "Piler", "Spacer", "Bridger", "Joiner",
  "Welder", "Weaver", "Knitter", "Spinner", "Winder", "Dabbler", "Fiddler",
  "Prodder", "Nudger", "Thumper", "Wrapper", "Bundler", "Wrangler",
  "Handler", "Whisperer", "Writer", "Inker", "Painter", "Seeker",
  "Searcher", "Finder", "Solver", "Shaper", "Explorer", "Mapper",
  "Pioneer", "Wanderer", "Rover", "Achiever", "Striver", "Thriver",
  "Doer", "Mover", "Shaker", "Mixer", "Blender", "Composer", "Arranger",
  "Improver", "Enhancer", "Polisher", "Originator", "Generator", "Producer",
  "Creator",
];

function pickRandomBuilder(lastPick: string): string {
  let pick: string;
  do {
    pick = builderTitles[Math.floor(Math.random() * builderTitles.length)];
  } while (pick === lastPick);
  return pick;
}

const TYPE_SPEED = 90;
const DELETE_SPEED = 50;
const PAUSE_AFTER_TYPE = 1800;
const PAUSE_AFTER_DELETE = 400;

// Fixed sequence: Designer, Developer, then random builder title repeating
function getTitle(index: number, lastBuilder: string): { label: string; font: string; italic: boolean } {
  const pos = index % 3;
  if (pos === 0) {
    return { label: "Designer", font: "var(--font-playfair)", italic: true };
  } else if (pos === 1) {
    return { label: "Developer", font: "var(--font-jetbrains-mono)", italic: false };
  } else {
    return { label: pickRandomBuilder(lastBuilder), font: "var(--font-syne)", italic: false };
  }
}

export default function RotatingTitle() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const lastBuilderRef = useRef("");

  const [current, setCurrent] = useState(() => getTitle(0, ""));

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
          setTitleIndex((i) => {
            const next = i + 1;
            const nextTitle = getTitle(next, lastBuilderRef.current);
            if (next % 3 === 2) lastBuilderRef.current = nextTitle.label;
            setCurrent(nextTitle);
            return next;
          });
        }, PAUSE_AFTER_DELETE);
      }
    }
  }, [displayedChars, isDeleting, current.label]);

  useEffect(() => {
    const timeout = tick();
    return () => clearTimeout(timeout);
  }, [tick]);

  return (
    <div className="h-10 sm:h-12 flex items-center justify-center">
      <span
        className={`text-xl sm:text-2xl font-semibold tracking-wide bg-gradient-to-r from-violet to-coral bg-clip-text text-transparent ${current.italic ? "italic" : ""}`}
        style={{ fontFamily: current.font }}
      >
        {current.label.slice(0, displayedChars)}
      </span>
      <span
        className={`inline-block w-[2px] h-6 sm:h-7 bg-gradient-to-b from-violet to-coral ml-0.5 ${isIdle ? "animate-[blink_1s_ease-in-out_infinite]" : ""}`}
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

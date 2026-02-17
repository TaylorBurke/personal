"use client";

import { motion } from "motion/react";

interface AuroraBackgroundProps {
  delay?: number;
}

const blobs = [
  {
    color: "bg-violet/20",
    size: "w-[600px] h-[600px]",
    pos: "top-[10%] left-[10%]",
    duration: 14,
    x: [0, 80, -40, 60, 0],
    y: [0, -60, 40, -20, 0],
    scale: [1, 1.15, 0.9, 1.1, 1],
  },
  {
    color: "bg-coral/15",
    size: "w-[500px] h-[500px]",
    pos: "bottom-[10%] right-[5%]",
    duration: 16,
    x: [0, -70, 50, -30, 0],
    y: [0, 50, -60, 30, 0],
    scale: [1, 0.9, 1.2, 0.95, 1],
  },
  {
    color: "bg-cyan/10",
    size: "w-[450px] h-[450px]",
    pos: "top-[40%] right-[20%]",
    duration: 18,
    x: [0, 60, -80, 40, 0],
    y: [0, -40, 70, -50, 0],
    scale: [1, 1.1, 0.85, 1.15, 1],
  },
  {
    color: "bg-violet/10",
    size: "w-[550px] h-[550px]",
    pos: "bottom-[20%] left-[15%]",
    duration: 22,
    x: [0, -50, 70, -60, 0],
    y: [0, 70, -30, 50, 0],
    scale: [1, 0.95, 1.15, 0.9, 1],
  },
];

export default function AuroraBackground({ delay = 0 }: AuroraBackgroundProps) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay }}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${blob.color} ${blob.size} ${blob.pos} blur-[120px]`}
          animate={{
            x: blob.x,
            y: blob.y,
            scale: blob.scale,
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

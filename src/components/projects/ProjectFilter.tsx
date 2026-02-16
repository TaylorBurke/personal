"use client";

import { motion } from "motion/react";

interface ProjectFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProjectFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer ${
            activeCategory === category
              ? "text-snow"
              : "text-fog hover:text-snow border border-ash hover:border-fog"
          }`}
        >
          {activeCategory === category && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 bg-violet rounded-full -z-10"
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
            />
          )}
          {category}
        </button>
      ))}
    </div>
  );
}

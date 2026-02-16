"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-2xl border border-ash/50 bg-charcoal/50 overflow-hidden hover:border-violet/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet/5"
      >
        <div className="aspect-video bg-smoke relative overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-violet/20 to-coral/20 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-heading text-2xl font-bold text-snow/50 group-hover:text-snow/70 transition-colors duration-300">
                  {project.title}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge>{project.category}</Badge>
            <span className="text-xs text-fog">{project.year}</span>
          </div>
          <h3 className="text-xl font-heading font-semibold mb-2 group-hover:text-violet transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-fog text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="violet">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge>+{project.tags.length - 3}</Badge>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

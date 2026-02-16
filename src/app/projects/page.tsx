"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectFilter from "@/components/projects/ProjectFilter";
import PageTransition from "@/components/layout/PageTransition";
import { projects, getProjectCategories } from "@/lib/projects";

export default function ProjectsPage() {
  const categories = getProjectCategories();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <PageTransition>
      <section className="py-24">
        <Container>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Projects
          </h1>
          <p className="text-fog text-lg mb-12 max-w-2xl">
            A collection of work spanning web development, brand design, and
            product thinking.
          </p>

          <ProjectFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <ProjectGrid projects={filteredProjects} />
        </Container>
      </section>
    </PageTransition>
  );
}

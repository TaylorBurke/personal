"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getFeaturedProjects } from "@/lib/projects";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-fog text-lg mb-12 max-w-2xl">
            A selection of recent work across design, development, and
            everything in between.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
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
                  <p className="text-fog text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button href="/projects" variant="secondary" size="lg">
            View All Projects
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

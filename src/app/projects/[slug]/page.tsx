import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/layout/PageTransition";
import { projects, getProjectBySlug } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      <section className="py-24">
        <Container className="max-w-4xl">
          <Link
            href="/projects"
            className="text-violet hover:text-violet-hover transition-colors duration-300 font-medium mb-8 inline-block"
          >
            &larr; Back to projects
          </Link>

          {/* Hero image area */}
          <div className="aspect-video bg-smoke rounded-2xl overflow-hidden mb-10 relative">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-violet/20 to-coral/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-4xl font-bold text-snow/60">
                    {project.title}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Project info */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="violet">{project.category}</Badge>
                <span className="text-sm text-fog">{project.year}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold">
                {project.title}
              </h1>
            </div>

            <div className="flex gap-3 shrink-0">
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  variant="primary"
                  size="sm"
                >
                  Live Site
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="secondary"
                  size="sm"
                >
                  GitHub
                </Button>
              )}
            </div>
          </div>

          <p className="text-fog text-lg leading-relaxed mb-8">
            {project.longDescription}
          </p>

          {/* Tech tags */}
          <div className="mb-16">
            <h3 className="text-sm font-heading font-semibold text-fog uppercase tracking-wider mb-4">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="violet">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}

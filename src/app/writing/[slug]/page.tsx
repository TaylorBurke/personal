import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import PageTransition from "@/components/layout/PageTransition";
import { mdxComponents } from "@/components/writing/MdxComponents";
import { getPostBySlug, getAllSlugs } from "@/lib/mdx";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageTransition>
      <article className="py-24">
        <Container className="max-w-3xl">
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-fog mb-4">
              <time>
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
              {post.frontmatter.title}
            </h1>
            {post.frontmatter.tags && (
              <div className="flex flex-wrap gap-2">
                {post.frontmatter.tags.map((tag) => (
                  <Badge key={tag} variant="violet">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <div className="prose-custom">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight, rehypeSlug],
                },
              }}
            />
          </div>

          <footer className="mt-16 pt-8 border-t border-ash">
            <a
              href="/writing"
              className="text-violet hover:text-violet-hover transition-colors duration-300 font-medium"
            >
              &larr; Back to all posts
            </a>
          </footer>
        </Container>
      </article>
    </PageTransition>
  );
}

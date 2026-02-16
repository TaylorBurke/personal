import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PostList from "@/components/writing/PostList";
import PageTransition from "@/components/layout/PageTransition";
import { getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Thoughts on design, development, and the craft of building digital products.",
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <PageTransition>
      <section className="py-24">
        <Container>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Writing
          </h1>
          <p className="text-fog text-lg mb-12 max-w-2xl">
            Thoughts on design, development, and the craft of building digital
            products.
          </p>
          <PostList posts={posts} />
        </Container>
      </section>
    </PageTransition>
  );
}

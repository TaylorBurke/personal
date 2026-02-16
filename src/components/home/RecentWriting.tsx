"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Post } from "@/types/post";

interface RecentWritingProps {
  posts: Post[];
}

export default function RecentWriting({ posts }: RecentWritingProps) {
  return (
    <section className="py-24 bg-charcoal/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Recent Writing
          </h2>
          <p className="text-fog text-lg mb-12 max-w-2xl">
            Thoughts on design, development, and the craft of building digital
            products.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/writing/${post.slug}`}
                className="group block rounded-2xl border border-ash/50 bg-smoke/50 p-6 hover:border-violet/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 text-sm text-fog mb-4">
                  <time>
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-violet transition-colors duration-300">
                  {post.frontmatter.title}
                </h3>
                <p className="text-fog text-sm leading-relaxed">
                  {post.frontmatter.excerpt}
                </p>
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
          <Button href="/writing" variant="secondary" size="lg">
            Read All Posts
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

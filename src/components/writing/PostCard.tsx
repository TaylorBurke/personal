"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/writing/${post.slug}`}
        className="group block rounded-2xl border border-ash/50 bg-charcoal/50 p-6 hover:border-violet/50 transition-all duration-300 hover:-translate-y-1"
      >
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
        <h2 className="text-xl font-heading font-semibold mb-3 group-hover:text-violet transition-colors duration-300">
          {post.frontmatter.title}
        </h2>
        <p className="text-fog text-sm leading-relaxed mb-4">
          {post.frontmatter.excerpt}
        </p>
        {post.frontmatter.tags && (
          <div className="flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="violet">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}

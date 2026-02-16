import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentWriting from "@/components/home/RecentWriting";
import CallToAction from "@/components/home/CallToAction";
import { getAllPosts } from "@/lib/mdx";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <RecentWriting posts={recentPosts} />
      <CallToAction />
    </>
  );
}

import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "mystic-cards",
    title: "Mystic Cards",
    description:
      "A community-driven tarot platform featuring original decks from independent artists and AI-powered readings.",
    longDescription:
      "Mystic Cards is a tarot platform that brings together independent deck artists and spiritual seekers. Users can explore original decks, ask questions, and receive personalized card interpretations powered by astrological models. The artist marketplace lets creators sell directly to users, earning 70% of every sale. Features include reading history tracking, multiple spread options, and a premium tier with follow-up pulls and custom spreads. Built with a dark, mystical aesthetic using glassmorphism and animated star effects.",
    category: "Web",
    image: "/images/projects/mystic.png",
    tags: ["Next.js", "TypeScript", "AI", "Tailwind CSS", "Stripe"],
    liveUrl: "https://getmystic.cards",
    featured: true,
    year: "2025",
  },
  {
    slug: "cockpit",
    title: "Cockpit",
    description:
      "A personal dashboard for mental health, wellbeing, growth, and productivity — all in one place.",
    longDescription:
      "Cockpit is a personal dashboard designed to support daily wellness and productivity. It combines a clock, bookmarks, daily quotes, horoscopes, and a fortune cookie into a calm, unified interface. A built-in XP and leveling system gamifies personal growth across wellbeing, productivity, and self-improvement tracks. The dashboard features rotating nature backgrounds that change with the day, customizable layouts, and a minimalist card-based UI. Built for focus and intention.",
    category: "Product",
    image: "/images/projects/cockpit.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Local Storage"],
    liveUrl: "https://cock-pit.vercel.app",
    featured: true,
    year: "2025",
  },
  {
    slug: "lethe",
    title: "Lethe",
    description:
      "A Python CLI tool that generates complete 78-card tarot decks using AI image models via Replicate's API.",
    longDescription:
      "Lethe is a Python CLI tool that generates a complete 78-card tarot deck plus a card back using Replicate's API, with support for Flux, SDXL, and style-transfer models. An interactive questionary-based CLI guides users through style prompts, model selection, aspect ratio, parallelism, and reference image configuration. The tool maintains style consistency across all cards using seed derivation and style prefixes, with optional per-suit reference images for fine-grained control. Card definitions are fully customizable via YAML, and a symmetrical card back is automatically generated at the end of every run.",
    category: "CLI",
    tags: ["Python", "AI", "Replicate", "CLI"],
    githubUrl: "https://github.com/TaylorBurke/lethe",
    featured: true,
    year: "2025",
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectCategories(): string[] {
  const categories = new Set(projects.map((p) => p.category));
  return ["All", ...Array.from(categories)];
}

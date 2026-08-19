export type Project = {
  name: string;
  description: string;
  href: string;
  /** Short label shown on the right of the row. */
  tag: string;
  /** Screenshots shown on hover; multiple images cycle while hovered. */
  previews: string[];
};

export const caseStudies: Project[] = [
  {
    name: "Joy of Life",
    description: "A mental health consulting studio.",
    href: "#",
    tag: "Consulting",
    previews: ["/work/joy-of-life.webp"],
  },
  {
    name: "Salad Co",
    description: "A daily and monthly salad subscription.",
    href: "#",
    tag: "D2C",
    previews: ["/work/salad-co.webp", "/work/salad-co-sourcing.webp"],
  },
  {
    name: "VitalityPhysio",
    description: "Services, doctors and clinic technology.",
    href: "#",
    tag: "Healthcare",
    previews: ["/work/vitality-physio.svg"],
  },
];

export const craft: Project[] = [
  {
    name: "Aural",
    description: "A music streaming interface, dark and quiet.",
    href: "#",
    tag: "Product UI",
    previews: ["/work/aural.webp"],
  },
  {
    name: "Obsidian Studio",
    description: "A landing page for a film production studio.",
    href: "#",
    tag: "Landing",
    previews: ["/work/obsidian-studio.webp"],
  },
  {
    name: "Glass Widgets",
    description: "A desktop widget stack in frosted glass.",
    href: "#",
    tag: "Concept",
    previews: ["/work/glass-widgets.webp"],
  },
  {
    name: "Reader",
    description: "Reading progress cards, light and dark.",
    href: "#",
    tag: "Components",
    previews: ["/work/reader.webp"],
  },
  {
    name: "Design Partner",
    description: "Editorial slides for a design studio.",
    href: "#",
    tag: "Brand",
    previews: ["/work/studio-brand.webp"],
  },
  {
    name: "Daily Tasks",
    description: "A calm daily to-do card with progress.",
    href: "#",
    tag: "Concept",
    previews: ["/work/daily-tasks.webp"],
  },
];

export const socials = {
  x: { label: "X", href: "https://x.com/kajol_manwani" },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kajol-manwani-b0786b185/",
  },
  email: { label: "kajolmanwani34@gmail.com", href: "mailto:kajolmanwani34@gmail.com" },
};

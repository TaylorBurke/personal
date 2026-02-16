interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "violet" | "coral" | "cyan";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-smoke text-fog border-ash",
    violet: "bg-violet/10 text-violet-hover border-violet/30",
    coral: "bg-coral/10 text-coral border-coral/30",
    cyan: "bg-cyan/10 text-cyan border-cyan/30",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

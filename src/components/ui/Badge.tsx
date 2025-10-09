interface BadgeProps {
  children: string;
  variant?: "default" | "concept";
  size?: "sm" | "md";
}

export default function Badge({ children, variant = "default", size = "md" }: BadgeProps) {
  const sizeStyles = size === "sm"
    ? "px-3 py-1 text-xs"
    : "px-4 py-2 text-sm";

  const variantStyles = variant === "concept"
    ? "bg-blue-600/90"
    : "bg-black/80";

  return (
    <div className={`${sizeStyles} ${variantStyles} text-white font-medium uppercase tracking-wider`}>
      {children}
    </div>
  );
}

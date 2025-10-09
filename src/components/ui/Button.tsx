import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const baseStyles = "px-8 py-4 text-lg font-medium transition-colors";
  const variantStyles = variant === "primary"
    ? "bg-white text-black hover:bg-gray-100"
    : "border border-white text-white hover:bg-white hover:text-black";

  return (
    <a
      href={href}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </a>
  );
}

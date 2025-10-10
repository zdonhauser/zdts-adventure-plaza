interface SectionHeaderProps {
  title: string;
  description: string;
  variant?: "light" | "dark";
}

export default function SectionHeader({ title, description, variant = "dark" }: SectionHeaderProps) {
  const textColor = variant === "light" ? "text-gray-300" : "text-gray-600";

  return (
    <div className="mb-20">
      <h3 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">{title}</h3>
      <p className={`text-xl ${textColor} max-w-2xl`}>{description}</p>
    </div>
  );
}

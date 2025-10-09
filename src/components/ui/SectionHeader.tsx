interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="mb-20">
      <h3 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">{title}</h3>
      <p className="text-xl text-gray-600 max-w-2xl">{description}</p>
    </div>
  );
}

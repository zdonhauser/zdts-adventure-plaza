interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  onLinkClick?: (label: string, href: string) => void;
}

export default function MobileMenu({ isOpen, onClose, links, onLinkClick }: MobileMenuProps) {
  const handleClick = (link: NavLink) => {
    if (onLinkClick) {
      onLinkClick(link.label, link.href);
    }
    onClose();
  };

  return (
    <div className={`md:hidden bg-white border-b border-gray-100 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
      <div className="px-6 py-4 flex flex-col gap-4 text-sm">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-gray-600 transition-colors py-2"
            onClick={() => handleClick(link)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

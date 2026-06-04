import Link from 'next/link';

const footerLinks = [
  { label: 'Help', href: '/help' },
  { label: 'About', href: '/about' },
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-sans text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-sm font-sans text-gray-400">
            © {new Date().getFullYear()} Medium
          </div>
        </div>
      </div>
    </footer>
  );
}
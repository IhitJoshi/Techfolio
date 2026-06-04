'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Search, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Stories' },
  { href: '/about', label: 'About' },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hideOnPrefixes = ['/', '/blog', '/about'];
  const isHome = hideOnPrefixes.some((p) => pathname === p || pathname.startsWith(p + '/'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const queryParam = searchParams.get('q') || '';
  const [isSearchOpen, setIsSearchOpen] = useState(!!queryParam);

  // Sync search open state with query param presence on path change
  useEffect(() => {
    if (queryParam) {
      setIsSearchOpen(true);
    }
  }, [queryParam]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold tracking-tight text-black">Techfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-sans transition-colors duration-200 ${
                    isActive
                      ? 'text-black font-medium'
                      : 'text-gray-400 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {pathname === '/blog' && (
              <div className="flex items-center gap-2">
                {isSearchOpen ? (
                  <div className="relative flex items-center animate-in fade-in zoom-in-95 duration-200">
                    <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search stories..."
                      value={queryParam}
                      onChange={(e) => {
                        const value = e.target.value;
                        const params = new URLSearchParams(searchParams.toString());
                        if (value) {
                          params.set('q', value);
                        } else {
                          params.delete('q');
                        }
                        router.replace(`${pathname}?${params.toString()}`);
                      }}
                      className="pl-9 pr-8 py-1.5 w-36 sm:w-48 md:w-60 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-white transition-all duration-200"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setIsSearchOpen(false);
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete('q');
                        router.replace(`${pathname}?${params.toString()}`);
                      }}
                      className="absolute right-3 text-gray-400 hover:text-black p-0.5 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-2 text-sm font-sans text-gray-400 hover:text-black transition-colors duration-200"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {!isHome && (
              <>
                <Link href="/admin/dashboard">
                  <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-sans text-gray-400 hover:text-black transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                    Write
                  </button>
                </Link>

                <Link href="/admin/login">
                  <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-5 py-2 h-auto text-sm font-sans transition-colors duration-200">
                    Sign In
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-black hover:text-gray-400 transition-colors duration-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 md:hidden">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-lg font-sans text-black hover:text-gray-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            {!isHome && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 text-lg font-sans text-black hover:text-gray-400 transition-colors duration-200"
              >
                Write
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
import { PublicNavbar } from '@/components/layout/public-navbar';
import { Footer } from '@/components/layout/footer';
import { Suspense } from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-16 border-b border-gray-100 bg-white" />}>
        <PublicNavbar />
      </Suspense>
      <main className="min-h-screen pt-16 bg-white">{children}</main>
      <Footer />
    </>
  );
}
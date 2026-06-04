import { AdminNavbar } from '@/components/layout/admin-navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen pt-16 pb-20 md:pb-0">{children}</main>
    </>
  );
}

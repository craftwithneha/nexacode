'use client';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 min-h-screen bg-gradient-to-b from-[#0e0e10] via-[#0b0b0d] to-[#000000] text-white">
      {children}
    </main>
  );
}
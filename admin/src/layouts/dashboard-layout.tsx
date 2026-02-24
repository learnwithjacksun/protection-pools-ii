import { Header, Sidebar } from "@/components/main";

interface DashboardLayoutProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <div className="flex h-screen w-full bg-background overflow-y-scroll hide-scrollbar">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-y-scroll overflow-x-hidden hide-scrollbar bg-gray-50">
          <Header />
          <main className="px-4 sm:px-6 lg:px-8 pb-10 pt-4 space-y-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              {title && (
                <h2 className="text-lg font-space font-semibold text-main">
                  {title}
                </h2>
              )}
            </div>
            <div className="relative space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}

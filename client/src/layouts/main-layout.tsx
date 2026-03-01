import { Footer, Header } from "@/components/main";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="bg-secondary">{children}</main>
      <Footer />
    </>
  );
}

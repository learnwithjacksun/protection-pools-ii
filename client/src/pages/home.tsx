import { FAQ, Hero } from "@/components/main";
import { MainLayout } from "@/layouts";

export default function Home() {
  return (
    <>
      <MainLayout>
        <Hero />
        <FAQ />
      </MainLayout>
    </>
  );
}

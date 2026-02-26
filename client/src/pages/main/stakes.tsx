import { Betslip, Matches } from "@/components/main";
import { MainLayout } from "@/layouts";

export default function Stakes() {
  return (
    <MainLayout>
      <section className="border-t border-line bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[100dvh]">
          <div className="lg:col-span-2 col-span-1 overflow-y-scroll hide-scrollbar lg:h-[100dvh] pb-20">

          <Matches />
          </div>
          <div className="col-span-1 bg-white overflow-y-scroll hide-scrollbar lg:h-[100dvh] pb-20">
            <Betslip />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

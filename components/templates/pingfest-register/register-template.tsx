import { PingfestRegisterLeftSection } from "@/components/organisms/pingfest-register/left-section";
import { PingfestRegisterRightSection } from "@/components/organisms/pingfest-register/right-section";

export function PingfestRegisterTemplate() {
  return (
    <div className="min-h-screen bg-background flex">
      <PingfestRegisterLeftSection />
      <PingfestRegisterRightSection />
    </div>
  );
}

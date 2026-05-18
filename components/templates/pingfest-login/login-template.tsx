import { PingfestLoginLeftSection } from "@/components/organisms/pingfest-login/left-section";
import { PingfestLoginRightSection } from "@/components/organisms/pingfest-login/right-section";

export function PingfestLoginTemplate() {
  return (
    <div className="min-h-screen bg-background flex">
      <PingfestLoginLeftSection />
      <PingfestLoginRightSection />
    </div>
  );
}

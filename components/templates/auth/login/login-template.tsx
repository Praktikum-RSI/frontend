import { LoginLeftSection } from "@/components/organisms/auth/login/left-section";
import { LoginRightSection } from "@/components/organisms/auth/login/right-section";

export const LoginTemplate = () => {
  return (
    <>
      <main className="min-h-screen bg-background flex">
        <LoginLeftSection />
        <LoginRightSection />
      </main>
    </>
  );
};

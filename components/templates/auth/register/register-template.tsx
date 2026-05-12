import { LoginLeftSection } from "@/components/organisms/auth/login/left-section";
import { RegisterRightSection } from "@/components/organisms/auth/register/right-section";

export const RegisterTemplate = () => {
  return (
    <>
      <main className="min-h-screen bg-background flex">
        <LoginLeftSection />
        <RegisterRightSection />
      </main>
    </>
  );
};

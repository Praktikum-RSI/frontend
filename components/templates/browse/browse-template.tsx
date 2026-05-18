import { Header } from "@/components/organisms/layout/header";
import { BrowseSection } from "@/components/organisms/browse/browse-section";

export function BrowseTemplate() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BrowseSection />
    </div>
  );
}

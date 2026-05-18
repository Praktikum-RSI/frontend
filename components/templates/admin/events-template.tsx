import { Header } from "@/components/organisms/layout/header";
import { Sidebar } from "@/components/organisms/layout/sidebar";
import { AdminEventsSection } from "@/components/organisms/admin/events-section";

export function AdminEventsTemplate() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header variant="admin" />
        <main className="flex-1 overflow-auto p-6">
          <AdminEventsSection />
        </main>
      </div>
    </div>
  );
}

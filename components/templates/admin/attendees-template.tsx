import { Header } from "@/components/organisms/layout/header";
import { Sidebar } from "@/components/organisms/layout/sidebar";
import { AdminAttendeesSection } from "@/components/organisms/admin/attendees-section";

export function AdminAttendeesTemplate() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header variant="admin" />
        <main className="flex-1 overflow-auto p-6">
          <AdminAttendeesSection />
        </main>
      </div>
    </div>
  );
}

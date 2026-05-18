import { Header } from "@/components/organisms/layout/header";
import { Sidebar } from "@/components/organisms/layout/sidebar";
import { AdminReportsSection } from "@/components/organisms/admin/reports-section";

export function AdminReportsTemplate() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header variant="admin" />
        <main className="flex-1 overflow-auto p-6">
          <AdminReportsSection />
        </main>
      </div>
    </div>
  );
}

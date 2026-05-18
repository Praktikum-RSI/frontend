import { Header } from "@/components/organisms/layout/header";
import { Sidebar } from "@/components/organisms/layout/sidebar";
import { AdminDashboardSection } from "@/components/organisms/admin/dashboard-section";

export function AdminDashboardTemplate() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header variant="admin" />
        <main className="flex-1 overflow-auto">
          <AdminDashboardSection />
        </main>
      </div>
    </div>
  );
}

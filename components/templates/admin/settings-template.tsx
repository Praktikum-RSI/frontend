import { Header } from "@/components/organisms/layout/header";
import { Sidebar } from "@/components/organisms/layout/sidebar";
import { AdminSettingsSection } from "@/components/organisms/admin/settings-section";

export function AdminSettingsTemplate() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header variant="admin" />
        <main className="flex-1 overflow-auto p-6">
          <AdminSettingsSection />
        </main>
      </div>
    </div>
  );
}

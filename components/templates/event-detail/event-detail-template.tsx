import { Header } from "@/components/organisms/layout/header";
import { EventDetailSection } from "@/components/organisms/event-detail/event-detail-section";

interface EventDetailTemplateProps {
  eventId: string;
}

export function EventDetailTemplate({ eventId }: EventDetailTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EventDetailSection eventId={eventId} />
    </div>
  );
}

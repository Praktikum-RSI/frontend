"use client";

import { useParams } from "next/navigation";
import { EventDetailTemplate } from "@/components/templates/event-detail/event-detail-template";

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  return <EventDetailTemplate eventId={params?.id ?? ""} />;
}

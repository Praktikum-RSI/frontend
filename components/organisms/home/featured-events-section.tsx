"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/organisms/events/event-card";
import { type Event, eventsApi } from "@/lib/events";

export function FeaturedEventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await eventsApi.list();
        if (!cancelled) setEvents(res.data ?? []);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Gagal memuat event");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const featured = events.slice(0, 3);

  return (
    <section className="py-12">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Featured Events</h2>
          <p className="text-foreground/70 mt-2">Curated picks happening soon</p>
        </div>
        <Link href="/browse" className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-destructive">{error}</div>
      ) : featured.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center">
          <p className="text-foreground/70">Belum ada event saat ini. Cek kembali nanti!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} variant="public" />
          ))}
        </div>
      )}
    </section>
  );
}

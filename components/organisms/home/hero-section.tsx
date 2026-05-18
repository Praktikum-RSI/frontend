import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-20 space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          <Sparkles className="h-4 w-4" />
          P!NGFEST Platform
        </div>
        <h1 className="text-6xl font-bold text-foreground leading-tight">
          Your Premium Gate to <br />
          <span className="text-primary">World-Class Experiences</span>
        </h1>
        <p className="text-2xl text-foreground/70 max-w-2xl">
          Discover, register, and attend extraordinary events crafted for inspiration and connection.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href="/browse">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
            Explore Events
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

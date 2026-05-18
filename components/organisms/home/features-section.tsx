import { CalendarCheck, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Curated Events",
    description: "Access exclusively selected events designed for premium experiences and meaningful connections.",
  },
  {
    icon: CalendarCheck,
    title: "Seamless Registration",
    description: "Quick and secure registration process with instant confirmation and event details.",
  },
  {
    icon: Users,
    title: "Community Hub",
    description: "Connect with like-minded professionals and enthusiasts from around the world.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="p-8 rounded-2xl bg-card border border-border hover:border-primary transition-colors"
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-foreground/70">{feature.description}</p>
          </div>
        );
      })}
    </section>
  );
}

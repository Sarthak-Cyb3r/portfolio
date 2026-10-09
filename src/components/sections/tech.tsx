import { SectionHeader } from "@/components/ui/section-header";
import { Chip } from "@/components/ui/chip";
import { Smartphone, Globe, Database, Terminal } from "lucide-react";

interface TechGroup {
  category: string;
  icon: typeof Smartphone;
  items: string[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    category: "Mobile",
    icon: Smartphone,
    items: ["Flutter", "Dart", "Android SDK"],
  },
  {
    category: "Web",
    icon: Globe,
    items: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend & Data",
    icon: Database,
    items: ["SQLite FTS5", "Firestore", "Node.js"],
  },
  {
    category: "Tooling",
    icon: Terminal,
    items: ["Git", "Linux", "Capacitor"],
  },
];

export function Tech() {
  return (
    <section id="tech" className="py-24 sm:py-32 border-t border-border/80 bg-dot-pattern/50">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <SectionHeader
          label="Architecture & Toolchain"
          title="Disciplined engineering stack."
          description="A focused toolchain engineered for offline-first performance, real-time synchronization, and cross-platform native execution."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {TECH_GROUPS.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="p-6 rounded-2xl bg-card/85 dark:bg-card/70 backdrop-blur-xl border border-border shadow-xs hover:border-primary/40 transition-all duration-200 flex flex-col justify-between gap-5"
              >
                <div className="flex items-center gap-3 pb-3 border-b border-border/70">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-fg tracking-tight">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip key={item} variant="outline" size="md">
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

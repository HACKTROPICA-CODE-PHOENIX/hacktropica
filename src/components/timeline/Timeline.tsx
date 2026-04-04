import { ImpactUpdate } from "@/constants/mockData";
import { TimelineItem } from "./TimelineItem";

interface TimelineProps {
  updates: ImpactUpdate[];
}

export function Timeline({ updates }: TimelineProps) {
  if (!updates.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No updates yet.
      </div>
    );
  }

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {updates.map((update, idx) => (
        <TimelineItem key={update.id} update={update} isEven={idx % 2 === 0} />
      ))}
    </div>
  );
}

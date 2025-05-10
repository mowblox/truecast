import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

export const StatusPill = ({ status }: { status: "Upcoming" | "Ongoing" | "Closed" }) => {
  const colors = {
    Upcoming: "bg-primary/10 border-primary/30 text-primary",
    Ongoing: "bg-success/10 border-success/30 text-success",
    Closed: "bg-danger/10 border-danger/30 text-danger",
  };
  return (
    <span
      className={cn(
        "px-2 py-0.5 w-fit rounded-full text-xs border-[0.5px] flex items-center",
        colors[status]
      )}
    >
      <Dot className="size-3" />
      {status}
    </span>
  );
};

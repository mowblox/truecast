import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

export const StatusPill = ({ status }: { status: "Ongoing" | "Closed" }) => {
  const colors = {
    Ongoing: "bg-success/10 border-success/30 text-success",
    Closed: "bg-danger/10 border-danger/30 text-danger",
  };
  return (
    <span
      className={cn(
        "p-0.5 w-16 rounded-full text-xs border-[0.5px] flex items-center",
        colors[status]
      )}
    >
      <Dot className="size-3" />
      {status}
    </span>
  );
};

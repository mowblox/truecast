"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";
import type { CalendarProps } from "@/components/ui/calendar";

export function DatePicker({
  placeholder,
  selected,
  onSelect,
  ...props
}: CalendarProps & {
  placeholder?: string;
  selected?: Date;
  onSelect: SelectSingleEventHandler;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal rounded-[4px]",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? (
            format(selected, "PPP")
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...props}
          mode="single"
          selected={selected}
          onSelect={onSelect}
          initialFocus
          className="bg-white dark:bg-dark rounded-[4px]"
        />
      </PopoverContent>
    </Popover>
  );
}

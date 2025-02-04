import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const InputWrapper = ({
  name,
  label,
  children,
  labelClass,
  className,
}: {
  name: string;
  label: string;
  children: ReactNode;
  labelClass?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label
        htmlFor={name}
        className={cn("text-lg dark:text-white/87", labelClass)}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputWrapper;

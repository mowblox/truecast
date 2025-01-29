import React, { ReactNode } from "react";

const InputWrapper = ({
  name,
  label,
  children,
}: {
  name: string;
  label: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className="text-lg dark:text-white/87">
        {label}
      </label>
      {children}
    </div>
  );
};

export default InputWrapper;

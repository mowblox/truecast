import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import React from "react";

const Election = () => {
  return (
    <form className="flex flex-col gap-14 w-full">
      <TextInput
        name="title"
        label="Election Title"
        placeholder="Eg. 2024 SRC President - UG"
      />
      <TextInput
        name="description"
        label="Description"
        placeholder="Write a brief summary about the purpose of the election"
      />

      <div className="flex flex-col gap-3">
        <label htmlFor="period" className="text-lg dark:text-white/87">
          Election Period
        </label>
        <div className="grid md:grid-cols-2 gap-x-8">
          <DatePicker placeholder="Start date" />
          <DatePicker placeholder="End date" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label htmlFor="election-type">Election Type</label>
        <RadioGroup defaultValue="option-one" className="flex gap-10">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <label htmlFor="option-one">Public</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <label htmlFor="option-two">Private</label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="bg-secondary dark:bg-primary rounded-full px-12 text-white py-2.5"
        >
          Next
        </button>
      </div>
    </form>
  );
};

type TextInputProps = {
  type?: "text" | "email" | "password" | "date";
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const TextInput = ({
  type = "text",
  name,
  label,
  placeholder,
  required = true,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className="text-lg dark:text-white/87">
        {label}
      </label>
      <input
        className="w-full bg-transparent border-b text-base dark:border-white/60 py-2 outline-none focus:border-primary placeholder:italic placeholder:font-normal dark:placeholder:text-white/60"
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
      />
    </div>
  );
};

const DateInput = () => {
  return <input type="date" className="py-2 border rounded-[4px]" />;
};

export default Election;

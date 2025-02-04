"use client";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import React from "react";
import TextInput from "./inputs/TextInput";
import InputWrapper from "./inputs/InputWrapper";
import { useRouter } from "next/navigation";

const Election = () => {
  const router = useRouter();

  const createElection = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('?tab=candidates');
  }

  return (
    <form
      onSubmit={createElection}
      className="flex flex-col gap-14 w-full">
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

      <InputWrapper name="election-type" label="Election Type">
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
      </InputWrapper>

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

export default Election;

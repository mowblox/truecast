import React from "react";
import InputWrapper from "../create-election/_components/inputs/InputWrapper";

const page = () => {
  return (
    <form className="mx-32 max-md:mx-4 max-w-2xl flex flex-col gap-24">
      <InputWrapper
        labelClass="text-white/60 text-3xl mb-1"
        label="Check eligibility"
        name="link"
      >
        <input
          required
          className="p-6 bg-[#1D57C21A] rounded-md text-secondary placeholder:italic placeholder:text-secondary outline-none"
          placeholder="Type or paste unique voting link"
        />
      </InputWrapper>

      <div className="flex justify-end">
        <button
          type="submit"
          className="w-fit px-8 py-2.5 rounded-full bg-primary text-white text-lg"
        >
          Verify
        </button>
      </div>
    </form>
  );
};

export default page;

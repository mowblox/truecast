"use client";
import { useParams } from "next/navigation";
import ElectionTitle from "./ElectionTitle";
import ElectionDescription from "./ElectionDescription";
import { useState } from "react";

interface Candidates {
  id: number;
  name: string;
}

export default function ElectionSummary() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id || "";

  const candidates: Candidates[] = [
    { id: 1, name: "Joshua Mensah" },
    { id: 2, name: "Alisson Newton" },
    { id: 3, name: "James Hammond" },
    { id: 4, name: "Michael Brown" },
  ];

  const [link, setlink] = useState<string>("");
  interface ResponseData {
    status: boolean;
    message: string;
    data: any;
  }
  interface VerifyLink {
    verifyLink: string;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setlink(value);
    console.log({ value });
  }

  async function submitLink(): Promise<ResponseData | null> {
    const url = "";
    const submitLink: VerifyLink = { verifyLink: link };
    // console.log(submitLink);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitLink),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData: ResponseData = await response.json();
      // console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  }

  return (
    <div className="w-[80%]">
      <div>
        <div className="gap-[12px]">
          <h2 className="">Election Title</h2>
          <p className="text-subtle-text mt-3">
            <ElectionTitle address={id} />
          </p>
        </div>

        <div className="mt-12">
          <h2>Description</h2>

          <p className="mt-3 text-subtle-text">
            <ElectionDescription address={id} />
          </p>
        </div>

        <div className="mt-12">
          <h2 className="font-space-grotesk ">Election Period</h2>
          <p className="text-subtle-text text-start mt-3">
            Aug 17, 2024 - Aug 29, 2024
          </p>
        </div>

        <div className="mt-12">
          <h2>Election Type</h2>
          <p className="text-subtle-text mt-3">Private</p>
        </div>

        <div className="mt-12">
          <h2>Candidates</h2>
          <ul>
            {candidates.map((candidate) => (
              <li key={candidate.id} className="text-subtle-text mt-3">
                {candidate.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="my-12">
          <h2>Voter Count</h2>
          <p className="text-subtle-text mt-3">24</p>
        </div>
      </div>
      <section className="flex flex-col gap-4 w-full md:max-w-[639px]">
        <div className="flex flex-col">
          <span className="text-base font-bold md:text-2xl">
            Check eligibility
          </span>
        </div>
        <input
          type="text"
          placeholder="Type or paste unique voting link here"
          className=" w-full bg-[#0D0E15] p-5 focus:outline-none rounded-xl placeholder:text-primary placeholder:font-space-grotesk text-italic"
          value={link}
          name="link"
          onChange={handleChange}
        />
        <div className="w-full flex justify-end mt-8">
          <button
            type="button"
            onClick={submitLink}
            className="flex bg-primary text-white font-space-grotesk py-3 px-12 font-bold rounded-full"
          >
            verify
          </button>
        </div>
      </section>
    </div>
  );
}

'use client';
import { useParams } from "next/navigation";
import ElectionTitle from "./ElectionTitle";
import ElectionDescription from "./ElectionDescription";

export default function ElectionDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id ?? '';

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
      </div>
    </div>
  );
}
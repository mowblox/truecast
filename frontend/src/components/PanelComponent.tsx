"use client"
import Image from "next/image";
import { Fragment, useState } from "react";

interface PanelProps {
  children?: React.ReactNode,
  title: string,
  icon: string,
  index: number,
  callback?: Function
}

// A Reusable panel component for ABVS which allows custom callbacks
export default function PanelComponent({ children, title, icon, index, callback }: PanelProps) {
  const [panelState, setPanelState] = useState(index == 1 ? true : false)
  const togglePanel = () => setPanelState(!panelState)

  // Function to call custom callback if exists else toggles panel
  const handlePanelClick = () => {
    if (callback) {
      return callback()
    }
    return togglePanel()
  }

  return (
    <Fragment>
      <div
        className="w-full h-12 flex items-center justify-between px-4 rounded-md bg-linear-to-r from-primary to-secondary cursor-pointer mt-6"
        onClick={handlePanelClick}
      >
        <span className="text-white text-lg font-space-grotesk">
          {title}
        </span>
        <Image
          src={`/images/${icon}`}
          width={24}
          height={24}
          alt="Add Candidate"
        />
      </div>
      {
        children && panelState ?
          <slot className="transition-all duration-[0.4s]">{children}</slot> :
          <slot></slot>
      }
    </Fragment>
  );
}
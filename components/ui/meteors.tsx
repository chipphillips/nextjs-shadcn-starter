"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  const id = useId();

  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={`${id}-${idx}`}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            "--meteor-left": `${Math.floor((idx / number) * 100)}%`,
            "--meteor-delay": `${(idx / number) * 2}s`,
            "--meteor-duration": `${2 + Math.random() * 4}s`,
          }}
        ></span>
      ))}
    </>
  );
};
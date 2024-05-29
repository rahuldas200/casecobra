import React, { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface phoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Phone = ({ className, imgSrc, dark = false, ...props }: phoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className
      )}
      {...props}
    >
      <img
        className="pointer-events-none z-50 select-none"
        src={
          dark
            ? "/phone-template-dark-edges.png"
            : "/phone-template-white-edges.png"
        }
        alt="phone image"
      />

      <div className="absolute -z-10 inset-0">
        <img
          className="object-cover"
          src={imgSrc}
          alt="overlaying phone image"
        />
      </div>
    </div>
  );
};

export default Phone;

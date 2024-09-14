"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { useSidebar } from "./SidebarProvider";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const { isSidebarOpen } = useSidebar();
  return (
    <div
      className={cn(
        `max-w-screen-xl mx-auto px-2.5 md:px-20 ${
          isSidebarOpen ? "md:px-10 " : ""
        }`,
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;

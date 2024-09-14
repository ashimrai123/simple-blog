"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "./SidebarProvider";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const SidebarLayouts = ({ children }: LayoutProps) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  useEffect(() => {
    // Toggle body overflow for mobile view based on sidebar state
    if (isSidebarOpen && window.innerWidth < 768) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex w-full overflow-hidden">
      {/* Sidebar */}
      <aside>
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div
        className={`flex flex-col flex-grow w-full transition-all duration-300 ${
          isSidebarOpen ? "pl-80" : "pl-0"
        }`}
      >
        {/* Mobile overlay to close the sidebar */}
        <div
          className={cn(
            "fixed hidden z-20 top-0 left-0 bg-black transition-all duration-300 w-full h-full",
            { "bg-opacity-70 block md:hidden": isSidebarOpen }
          )}
          onClick={toggleSidebar}
        />

        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main
          className={cn("flex-grow", {
            "min-w-max sm:min-w-full": isSidebarOpen,
          })}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayouts;

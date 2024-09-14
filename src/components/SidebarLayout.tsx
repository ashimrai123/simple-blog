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
    if (isSidebarOpen && window.innerWidth < 768) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarOpen]);

  return (
    <>
      <div className={`flex  w-full overflow-hidden `}>
        {/* Sidebar */}
        <aside>
          <Sidebar />
        </aside>
        <div
          className={`flex flex-col flex-grow w-full ease-in-out duration-300 ${
            isSidebarOpen ? "pl-80" : "pl-0"
          }`}
        >
          {/* Overlay */}
          <div
            className={cn(
              `fixed hidden z-20 top-0 left-0 bg-black transition-all duration-300 w-full h-full border  `,
              {
                "bg-opacity-70 block md:hidden ": isSidebarOpen,
              }
            )}
            onClick={() => toggleSidebar()}
          ></div>
          {/* Navbar */}

          <Navbar />

          {/* Main Content */}
          <div
            className={cn(`flex-grow flex-1  `, {
              "min-w-max sm:min-w-full": isSidebarOpen,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarLayouts;

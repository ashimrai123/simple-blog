"use client";

import { useSidebar } from "@/components/SidebarProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import {
  FaChevronRight,
  FaFileLines,
  FaFileMedical,
  FaRegPenToSquare,
} from "react-icons/fa6";
import { RiMenuFold3Line } from "react-icons/ri";

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const linkClass = (path: string) => {
    return pathname.startsWith(path)
      ? "bg-primary text-white -mx-4 px-4"
      : "hover:bg-primary/20 bg-transparent -mx-4 px-4";
  };

  return (
    <div
      className={`${
        isSidebarOpen ? "py-2 px-4 ml-0 w-full min-[400px]:w-80" : "-ml-80 w-80"
      } bg-white dark:bg-black border-r-2 fixed z-50 top-0 left-0 h-full overflow-y-auto ease-in-out duration-300`}
    >
      {/* Header with blog title and toggle button */}
      <div
        className={cn(
          buttonVariants({ variant: "shimmer" }),
          "flex rounded-md items-center justify-between py-6"
        )}
      >
        <Link href="/" className="flex items-center gap-3 py-3 px-3">
          <FaRegPenToSquare className="size-5" />
          <h1 className="text-2xl font-bold">Blog</h1>
        </Link>
        <Button
          onClick={toggleSidebar}
          className="bg-transparent rounded-none hover:bg-transparent"
        >
          <RiMenuFold3Line className="text-2xl" />
        </Button>
      </div>

      {/* Welcome section */}
      <div className="w-full h-32 bg-muted-foreground/30 rounded-md mt-4 flex flex-col items-center justify-center font-bold">
        <p className="text-lg mb-2">Welcome!</p>
      </div>

      {/* Sidebar navigation links */}
      <ul className="px-4 py-4">
        {[
          { href: "/", icon: <AiFillHome className="size-5" />, label: "Home" },
          {
            href: "/posts",
            icon: <FaFileLines className="size-5" />,
            label: "Posts",
          },
          {
            href: "/add-post",
            icon: <FaFileMedical className="size-5" />,
            label: "Add Post",
          },
        ].map(({ href, icon, label }) => (
          <li className="border-b" key={href}>
            <Link
              href={href}
              onClick={() => window.innerWidth < 768 && toggleSidebar()}
            >
              <div
                className={cn(
                  "flex justify-between items-center rounded-md py-3",
                  linkClass(href)
                )}
              >
                <div className="flex items-center gap-2">
                  {icon}
                  <p className="font-medium">{label}</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

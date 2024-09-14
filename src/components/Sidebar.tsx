"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import {
  FaChevronRight,
  FaFileLines,
  FaFileMedical,
  FaImages,
  FaRegPenToSquare,
} from "react-icons/fa6";
import { TfiDashboard } from "react-icons/tfi";
import { FiUser } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { RiLogoutBoxLine, RiMenuFold3Line } from "react-icons/ri";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSidebar } from "@/components/SidebarProvider";
import { IoDocumentText } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";

const Sidebar = () => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const linkClass = (path: string) => {
    if (path === "/") {
      // Special case for the root path
      return pathname === path
        ? "bg-primary text-white -mx-4 px-4"
        : "hover:bg-primary/20 bg-transparent -mx-4 px-4";
    }

    // General case for other paths
    return pathname.startsWith(path)
      ? "bg-primary text-white -mx-4 px-4"
      : "hover:bg-primary/20 bg-transparent -mx-4 px-4";
  };

  return (
    <>
      <div
        className={` ${
          isSidebarOpen
            ? " py-2 px-4 ml-0 w-full min-[400px]:w-80"
            : "-ml-80  w-80 "
        } bg-white dark:bg-black border-r-2 fixed shrink-0 z-50 top-0 left-0 h-full overflow-y-auto ease-in-out overflow-x-hidden duration-300`}
      >
        <div
          className={cn(
            buttonVariants({ variant: "shimmer" }),
            "flex    rounded-md items-center justify-between py-6 "
          )}
        >
          <div className={cn("flex items-center gap-3 py-3 px-3 ")}>
            <FaRegPenToSquare className="size-5" />
            <h1 className="text-2xl font-bold  cursor-default  ">Blog</h1>
          </div>
          <Button
            onClick={toggleSidebar}
            className="bg-transparent rounded-none hover:bg-transparent"
          >
            <RiMenuFold3Line className="text-2xl " />
          </Button>
        </div>
        <div className="w-full h-32 bg-muted-foreground/40 rounded-md mt-4 flex items-center justify-center font-bold"></div>
        <ul className="px-4 py-4">
          <li className=" border-b  ">
            <Link
              href={"/"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center  rounded-md py-3",
                  linkClass("/")
                )}
              >
                <div className="flex items-center gap-2">
                  <AiFillHome className="size-5" />
                  <p className="font-medium">Home</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
          <li className=" border-b  ">
            <Link
              href={"/posts"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center  rounded-md py-3",
                  linkClass("/posts")
                )}
              >
                <div className="flex items-center gap-2">
                  <FaFileLines className="size-5" />
                  <p className="font-medium">Posts</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
          <li className="  border-b">
            <Link
              href={"/add-post"}
              onClick={() => (window.innerWidth < 768 ? toggleSidebar() : null)}
            >
              <div
                className={cn(
                  "flex justify-between items-center rounded-md py-3",
                  linkClass("/add-post")
                )}
              >
                {" "}
                <div className="flex items-center gap-2">
                  <FaFileMedical className="size-5" />
                  <p className="font-medium">Add Post</p>
                </div>
                <FaChevronRight />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

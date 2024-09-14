"use client";
import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { GiHamburgerMenu } from "react-icons/gi";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Input } from "./ui/input";
import { GoSearch } from "react-icons/go";
import { IoAdd } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSidebar } from "./SidebarProvider";
import { RiMenuUnfold3Line } from "react-icons/ri";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const { setTheme, theme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);
  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCurrentTheme(newTheme);
  };
  return (
    <div>
      <MaxWidthWrapper>
        <div className="py-3 border-b">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-5">
              <Button
                onClick={toggleSidebar}
                className={`${isSidebarOpen ? "hidden" : ""}`}
              >
                <RiMenuUnfold3Line className=" text-2xl" />
              </Button>
            </div>
            {/* <div className="flex items-center gap-2">
              <Input className="  h-full" />
              <div className="">
                <GoSearch />
              </div>
            </div> */}
            <div className="flex items-center gap-5">
              <Link
                href={"/add-post"}
                className={cn(buttonVariants(), " hidden sm:flex  gap-2")}
              >
                <IoIosAddCircleOutline className="size-5" />
                <p>New Post</p>
              </Link>
              <Button
                variant="secondary"
                size="icon"
                onClick={toggleTheme}
                className="relative bg-transparent rounded-full "
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100  " />
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;

import React from "react";
import { Card } from "./ui/card";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <MaxWidthWrapper className="my-10">
      <Card>
        <div className="flex items-center justify-between flex-wrap gap-7">
          <div className="flex items-center gap-2">
            <p>Developer: </p>
            <Link
              href={"https://ashimrai1.com.np"}
              className={cn(buttonVariants({ variant: "default" }), "")}
              target="_blank"
            >
              Ashim Rai
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link
              href={"https://www.facebook.com/ashim.bantawa/"}
              target="_blank"
            >
              <FaFacebookF className="size-5" />
            </Link>
            <Link
              href={"https://www.instagram.com/ashim_raibs/"}
              target="_blank"
            >
              <FaInstagram className="size-5" />
            </Link>
            <Link
              href={"https://www.linkedin.com/in/ashim-rai-a90857198/"}
              target="_blank"
            >
              <FaLinkedinIn className="size-5" />
            </Link>
            <Link href={"https://github.com/ashimrai123"} target="_blank">
              <FaGithub className="size-5" />
            </Link>
          </div>
        </div>
      </Card>
    </MaxWidthWrapper>
  );
};

export default Footer;

import React from "react";
import { Card } from "./ui/card";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Footer = () => {
  return (
    <MaxWidthWrapper className="my-10">
      <Card>
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
      </Card>
    </MaxWidthWrapper>
  );
};

export default Footer;

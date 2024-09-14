"use client";

import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Link from "next/link";
import { Card } from "./ui/card";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

interface ClientPostCardProps {
  post: Post;
}

const ClientPostCard: React.FC<ClientPostCardProps> = ({ post }) => {
  const handleDeletePost = (id: number) => {
    console.log(id);
  };
  return (
    <Card key={post.id}>
      <div className="flex  gap-5">
        <TooltipProvider>
          <Image
            src={post.imageUrl as string}
            alt={`Post ${post.id}`}
            height={500}
            width={500}
            style={{ objectFit: "cover" }}
            className="w-96 h-50"
          />
          <div className="flex flex-col gap-5">
            <div className="flex justify-between  gap-4">
              <div className="order-2 flex  gap-2 ml-auto">
                {/* Edit button with tooltip */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className={cn(buttonVariants({ variant: "outline" }))}
                    >
                      <FaRegEdit className="text-xl sm:text-2xl" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>

                {/* Delete button with dialog and tooltip */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "cursor-pointer"
                      )}
                    >
                      <RiDeleteBinLine className="text-xl sm:text-2xl" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-white dark:bg-black">
                    <DialogHeader>
                      <DialogTitle>Delete Post</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this post?
                      </DialogDescription>
                    </DialogHeader>

                    <div className="flex justify-end gap-2 pt-3">
                      <DialogClose>
                        <div
                          className={cn(
                            buttonVariants({ variant: "secondary" }),
                            "cursor-pointer"
                          )}
                        >
                          Cancel
                        </div>
                      </DialogClose>
                      <DialogClose onClick={() => handleDeletePost(post.id)}>
                        <div
                          className={cn(
                            buttonVariants({ variant: "destructive" }),
                            "cursor-pointer"
                          )}
                        >
                          Yes
                        </div>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Link
                href={`/post/${post.id}`}
                className="text-2xl font-bold hover:underline underline-offset-4 "
              >
                {post.title}
              </Link>
            </div>

            <p className="line-clamp-3 ">{post.body}</p>
          </div>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default ClientPostCard;

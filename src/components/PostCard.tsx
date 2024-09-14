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
import { deletePostById } from "@/lib/deletePost";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

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
  const router = useRouter();
  const { toast } = useToast();

  const handleDeletePost = async (id: number) => {
    try {
      await deletePostById(id);
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted successfully.",
      });
      router.push("/posts");
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  return (
    <Card key={post.id}>
      <div className="grid xl:grid-cols-2 gap-5">
        {/* Image with hover effect */}
        <TooltipProvider>
          <Link href={`/posts/${post.id}`} className="relative group">
            <Image
              src={post.imageUrl as string}
              alt={`Post ${post.id}`}
              height={500}
              width={500}
              style={{ objectFit: "cover" }}
              className="w-full h-52 sm:h-72"
            />
            <div className="absolute z-10 inset-0 bg-black opacity-0 rounded-md group-hover:opacity-35 transition-opacity duration-300"></div>
          </Link>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-4">
              <div className="order-2 flex gap-2 ml-auto">
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
                  <TooltipContent>Edit</TooltipContent>
                </Tooltip>

                {/* Delete button with dialog */}
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
                href={`/posts/${post.id}`}
                className="text-lg tracking-tighter sm:text-2xl font-bold hover:underline underline-offset-4"
              >
                {post.title}
              </Link>
            </div>
            <p className="line-clamp-3 text-sm sm:text-base">{post.body}</p>
          </div>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default ClientPostCard;

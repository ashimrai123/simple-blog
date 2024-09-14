"use client";

import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { RiDeleteBinLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { deletePostById } from "@/lib/deletePost";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

interface PostDetailProps {
  post: Post;
}

export default function PostDetail({ post }: PostDetailProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Handle post deletion with error handling
  const handleDeletePost = async (id: number) => {
    try {
      await deletePostById(id);
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted successfully.",
      });
      setOpen(false);
      router.push("/posts");
    } catch (error) {
      console.error("Failed to delete the post", error);
    }
  };

  return (
    <>
      {/* --------------------------- Breadcrumb ----------------------------- */}
      <div className="pb-10">
        <div className="flex gap-4 items-center font-medium">
          <Link
            href="/posts"
            className="hover:text-primary hover:underline underline-offset-4"
          >
            Posts
          </Link>{" "}
          <FaChevronRight className="shrink-0" />{" "}
          <p className="text-gray-500 truncate max-w-72" title={post.title}>
            {post.title}
          </p>
        </div>
      </div>

      <Card>
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-4">
          <h1 className="text-lg tracking-tighter sm:text-2xl font-bold hover:underline underline-offset-4">
            {post.title}
          </h1>
          <div className="flex gap-2 ml-auto">
            {/* Edit button with tooltip */}
            <TooltipProvider>
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
            </TooltipProvider>

            {/* Delete button with dialog and tooltip */}
            <Dialog open={open} onOpenChange={setOpen}>
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
        </div>
        <div className="mt-5">
          <Image
            src={post.imageUrl as string}
            height={500}
            width={500}
            style={{ objectFit: "cover" }}
            className="rounded-md w-96 h-96 mx-auto"
            alt={`Image of Post ${post.id}`}
          />
        </div>
      </Card>
      <Card className="mt-10">
        <p>{post.body}</p>
      </Card>
    </>
  );
}

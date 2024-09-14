"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

interface PostDetailProps {
  post: Post;
}

export default function EditPost({ post }: PostDetailProps) {
  return (
    <>
      {/* Breadcrumb navigation */}
      <div className="pb-10">
        <div className="flex gap-4 items-center font-medium">
          <Link
            href="/posts"
            className="hover:text-primary hover:underline underline-offset-4"
          >
            Edit Post
          </Link>{" "}
          <FaChevronRight className="shrink-0" />{" "}
          <Link
            href={`/posts/${post.id}`}
            title={post.title}
            className="hover:text-primary hover:underline underline-offset-4 truncate max-w-72"
          >
            {post.title}
          </Link>{" "}
          <FaChevronRight className="shrink-0" />{" "}
          <p className="text-gray-500">Edit</p>
        </div>
      </div>

      {/* Post details */}
      <Card>
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-4">
          <h1 className="text-lg tracking-tighter sm:text-2xl font-bold hover:underline underline-offset-4">
            {post.title}
          </h1>
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

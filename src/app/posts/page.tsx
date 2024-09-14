// app/posts/page.tsx (Server Component)
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import React from "react";
import { fetchCombinedData } from "@/lib/api";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

const Posts = async () => {
  const posts: Post[] = await fetchCombinedData();

  return (
    <>
      <MaxWidthWrapper className="my-10">
        <Card>
          <h1 className="text-xl sm:text-2xl">All Posts</h1>
          <div className="grid gap-5 mt-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Card>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
};

export default Posts;

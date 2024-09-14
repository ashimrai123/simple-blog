// pages/posts.tsx
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import React from "react";
import { fetchCombinedData } from "@/lib/api";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import PostPagination from "@/components/PostPagination";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

const POSTS_PER_PAGE = 10;

const Posts = async () => {
  const posts: Post[] = await fetchCombinedData();
  const reversedPosts = [...posts].reverse();

  return (
    <>
      <MaxWidthWrapper className="my-10">
        <Card>
          <h1 className="text-xl sm:text-2xl">All Posts</h1>
          <PostPagination posts={reversedPosts} postsPerPage={POSTS_PER_PAGE} />
        </Card>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
};

export default Posts;

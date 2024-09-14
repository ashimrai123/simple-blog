import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import React from "react";
import { fetchCombinedData } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | undefined;
}
const Posts = async () => {
  // const posts: Post[] = await fetchCombinedData();

  return (
    <>
      <MaxWidthWrapper className="my-10">
        <Card>
          <h1 className="text-xl sm:text-2xl">All Posts</h1>

          {}
        </Card>
      </MaxWidthWrapper>
    </>
  );
};

export default Posts;

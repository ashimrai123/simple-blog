// pages/posts.tsx
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PostPagination from "@/components/PostPagination";
import { Card } from "@/components/ui/card";
import { fetchCombinedData } from "@/lib/api";

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

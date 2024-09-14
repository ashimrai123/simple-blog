// pages/posts/[postId].tsx
import { fetchPostById } from "@/lib/api";
import PostDetail from "@/components/PostDetail";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface PageProps {
  params: {
    postId: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

export default async function PostPage({ params }: PageProps) {
  const { postId } = params;
  const post: Post = await fetchPostById(postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <MaxWidthWrapper className="my-10">
        <PostDetail post={post} />
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}

import { fetchPostById } from "@/lib/api";
import PostDetail from "@/components/PostDetail";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface PageProps {
  params: {
    postId: string; // Dynamic postId from the URL
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

  // Fetch the post by ID
  const post: Post = await fetchPostById(postId);

  // Handle case when no post is found
  if (!post) {
    return <div>Post not found</div>;
  }

  // Render the post detail and footer
  return (
    <>
      <MaxWidthWrapper className="my-10">
        <PostDetail post={post} />
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}

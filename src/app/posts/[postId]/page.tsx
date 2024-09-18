import { fetchPostById } from "@/lib/api";
import PostDetail from "@/components/PostDetail";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface PageProps {
  post: Post | null; // Post object or null if not found
}

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

export default function PostPage({ post }: PageProps) {
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

// This function gets called on every request
export async function getServerSideProps(context: {
  params: { postId: string };
}) {
  const { postId } = context.params;

  try {
    // Fetch the post by ID
    const post = await fetchPostById(postId);

    // Pass the post data to the page via props
    return { props: { post } };
  } catch (error) {
    // Handle errors (e.g., post not found)
    return { props: { post: null } };
  }
}

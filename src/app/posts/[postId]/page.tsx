import { fetchPostById } from "@/lib/api";

interface PageProps {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PageProps) {
  const { postId } = params;

  const post = await fetchPostById(postId);

  if (!post) {
    return <div>Post not found</div>; // Handle the case where the post does not exist
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

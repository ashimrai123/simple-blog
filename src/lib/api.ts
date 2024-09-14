// Define interfaces
interface BlogPost {
  id: number;
  title: string;
  body: string;
}

interface Image {
  id: string;
  download_url: string;
}

// Fetch the first 20 blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const allPosts: BlogPost[] = await res.json();
  // Limit to the first 20 posts
  return allPosts.slice(0, 20);
}

// Fetch the first 20 images
export async function fetchImages(): Promise<Image[]> {
  const res = await fetch("https://picsum.photos/v2/list?page=1&limit=20");
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  return res.json();
}

// Combine Post with images
export async function fetchCombinedData(): Promise<
  (BlogPost & { imageUrl: string | null })[]
> {
  const [blogPosts, images] = await Promise.all([
    fetchBlogPosts(),
    fetchImages(),
  ]);

  // Create a map for images using the stringified ID
  const imageMap = new Map<string, string>(
    images.map((image) => [image.id, image.download_url])
  );

  // Map blog posts with image URLs
  return blogPosts.map((post) => ({
    ...post,
    imageUrl: imageMap.get(String(post.id - 1)) || null, // Convert post.id to string for matching
  }));
}

// Fetch a single blog post by ID
export async function fetchPostById(id: string): Promise<BlogPost> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

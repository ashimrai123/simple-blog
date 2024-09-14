// Fetch all blog posts without images
export async function fetchBlogPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

// Fetch images to combine with posts
export async function fetchImages() {
  const res = await fetch("https://picsum.photos/v2/list");
  if (!res.ok) {
    throw new Error("Failed to fetch images");
  }
  return res.json();
}

// Combine Post with images
export async function fetchCombinedData() {
  const [blogPosts, images] = await Promise.all([
    fetchBlogPosts(),
    fetchImages(),
  ]);

  // Create a map for images using the stringified ID
  const imageMap = new Map<string, string>(
    images.map((image: any) => [image.id, image.download_url])
  );

  // Map blog posts with image URLs
  return blogPosts.map((post: any) => ({
    id: post.id,
    title: post.title,
    body: post.body,
    imageUrl: imageMap.get(String(post.id)) || null, // Convert post.id to string for matching
  }));
}

// Fetch a single blog post by ID
export async function fetchPostById(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

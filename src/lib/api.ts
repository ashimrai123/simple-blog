// Fetch the first 25 blog posts
export async function fetchBlogPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const allPosts = await res.json();
  // Limit to the first 25 posts
  return allPosts.slice(0, 20);
}

// Fetch the first 25 images
export async function fetchImages() {
  const res = await fetch("https://picsum.photos/v2/list?page=1&limit=20");
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
    imageUrl: imageMap.get(String(post.id - 1)) || null, // Convert post.id to string for matching
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

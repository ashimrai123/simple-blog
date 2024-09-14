import axios from "axios";
import { axiosInstance } from "./axiosInstance";

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
  try {
    const res = await axiosInstance.get<BlogPost[]>("/posts");
    // Limit to the first 20 posts
    return res.data.slice(0, 20);
  } catch (error) {
    throw new Error("Failed to fetch posts: " + error);
  }
}

// Fetch the first 20 images
export async function fetchImages(): Promise<Image[]> {
  try {
    const res = await axios.get<Image[]>(
      "https://picsum.photos/v2/list?page=1&limit=20"
    );
    return res.data;
  } catch (error) {
    throw new Error("Failed to fetch images: " + error);
  }
}

// Combine Post with images
export async function fetchCombinedData(): Promise<
  (BlogPost & { imageUrl: string | null })[]
> {
  try {
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
      imageUrl: imageMap.get(String(post.id - 1)) || null,
    }));
  } catch (error) {
    throw new Error("Failed to fetch combined data: " + error);
  }
}

// Generate a URL for the image based on the post ID
function generateImageUrl(postId: number): string {
  // Image starts with 0 while Post starts with 1, so post has to be subtracted by 1 to make it 0 index
  return `https://picsum.photos/id/${postId - 1}/2000/2000`;
}

// Fetch a single blog post by ID and its image
export async function fetchPostById(
  id: string
): Promise<BlogPost & { imageUrl: string | null }> {
  try {
    const postRes = await axiosInstance.get<BlogPost>(`/posts/${id}`);
    const post = postRes.data;

    // Generate the image URL based on the post ID
    const imageUrl = generateImageUrl(post.id);

    return {
      ...post,
      imageUrl,
    };
  } catch (error) {
    throw new Error("Failed to fetch post: " + error);
  }
}

// DELETE a blog post by ID
export async function deletePostById(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`/posts/${id}`);
    console.log(`Post with ID ${id} deleted successfully.`);
  } catch (error) {
    throw new Error(`Failed to delete post with ID ${id}: ` + error);
  }
}

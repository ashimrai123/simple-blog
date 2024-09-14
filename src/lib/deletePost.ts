import { axiosInstance } from "./axiosInstance";

// DELETE a blog post by ID
export async function deletePostById(id: number): Promise<void> {
  try {
    await axiosInstance.delete(`/posts/${id}`);
    console.log(`Post with ID ${id} deleted successfully.`);
  } catch (error) {
    throw new Error(`Failed to delete post with ID ${id}: ` + error);
  }
}

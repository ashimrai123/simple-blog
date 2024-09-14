"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useToast } from "@/hooks/use-toast";
import { fetchPostById } from "@/lib/api";
import Image from "next/image";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa6";
import Link from "next/link";

// Page props and post interfaces
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

// Zod schema for form validation
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z
    .string()
    .min(10, { message: "Body must be at least 10 characters long" })
    .max(6000, { message: "Body must be at most 6000 characters long" }),
  imageUrl: z
    .string()
    .url({ message: "Invalid URL format" })
    .nullable()
    .optional()
    .or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

// ---------------- Edit Post Component ------------------//

const EditPost = ({ params }: PageProps) => {
  const router = useRouter();
  const { postId } = params;

  // React Hook Form setup
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
      imageUrl: "",
    },
  });

  // Local state for handling image and loading status
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post>();

  const { toast } = useToast();

  // Fetch post details for editing when the component mounts
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const post = await fetchPostById(postId as string);
          if (post) {
            // Pre-populate form fields with fetched data
            setValue("title", post.title);
            setValue("body", post.body);
            setValue("imageUrl", post.imageUrl || "");
            setImageSrc(post.imageUrl || null);
            setIsLoading(false);
          }
          setPost(post);
        } catch (error) {
          console.error("Failed to fetch post", error);
          setIsLoading(false);
          toast({
            title: "Error",
            description: "Failed to fetch post details.",
          });
        }
      };

      fetchPost();
    }
  }, [postId, setValue, toast]);

  // Ref for file input to handle image uploads
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle form submission for updating the post
  const onSubmit = async (data: FormData) => {
    const file = fileInputRef.current?.files?.[0];

    // Validate either image file or URL is provided
    if (!file && !data.imageUrl) {
      setImageError(
        "You must upload at least one image or provide an image URL."
      );
      return;
    }

    // Validate file type and size if a file is uploaded
    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageError("File must be an image");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError("File size must be less than 5MB");
        return;
      }
    }

    setImageError(null);

    // Prepare form data (for image file upload if needed)
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
    if (file) formData.append("image", file);

    // API call to update the post
    try {
      await axiosInstance.put(`/posts/${postId}`, {
        title: data.title,
        body: data.body,
        imageUrl: data.imageUrl || null,
      });

      console.log("Update successful", formData);

      toast({
        title: "Post Updated",
        description: "Your post has been updated successfully.",
      });

      // Reset form and redirect to the updated post page
      reset();
      setImageSrc(null);
      router.push(`/posts/${postId}`);
    } catch (err) {
      console.error("Error updating post", err);
      toast({
        title: "Error",
        description: "There was an error updating the post.",
      });
    }
  };

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageError("File must be an image");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError("File size must be less than 5MB");
        return;
      }
      setImageError(null);
      setImageSrc(URL.createObjectURL(file));
    }
  };

  // Programmatically trigger the file input when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <MaxWidthWrapper className="my-10">
        {/* --------------------------- Breadcrumb ----------------------------- */}
        <div className="pb-10">
          <div className="flex gap-4 items-center font-medium">
            <Link
              href="/posts"
              className="hover:text-primary hover:underline underline-offset-4"
            >
              Posts
            </Link>{" "}
            <FaChevronRight className="shrink-0" />{" "}
            <Link
              href={`/posts/${post?.id}`}
              className=" hover:text-primary truncate max-w-72 hover:underline underline-offset-4 "
              title={post?.title}
            >
              {post?.title}
            </Link>{" "}
            <FaChevronRight className="shrink-0" />{" "}
            <p className="text-gray-500">Edit</p>
          </div>
        </div>

        {/* --------------------------- Edit Post Form ----------------------------- */}
        <Card>
          <h1 className="text-xl sm:text-2xl">Edit Blog Post</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="flex flex-col gap-5 mt-5">
              <div>
                <Label className="text-base sm:text-lg font-semibold">
                  Title
                </Label>
                {isLoading ? (
                  <div className="h-8 rounded-md mt-2 bg-muted-foreground/40 w-full animate-pulse duration-1000"></div>
                ) : (
                  <Input
                    {...register("title")}
                    type="text"
                    placeholder="Enter the post title"
                    className="mt-2"
                  />
                )}
                {errors.title && (
                  <p className="mt-2 text-primary">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Label className="text-base sm:text-lg font-semibold">
                  Body
                </Label>
                {isLoading ? (
                  <div className="h-60 rounded-md mt-2 bg-muted-foreground/40 w-full animate-pulse duration-1000"></div>
                ) : (
                  <Textarea
                    {...register("body")}
                    placeholder="Enter the post content"
                    className="resize-none mt-2"
                    rows={10}
                  />
                )}
                {errors.body && (
                  <p className="mt-2 text-primary">{errors.body.message}</p>
                )}
              </div>
              <div>
                <Label className="text-base sm:text-lg font-semibold">
                  Image URL
                </Label>
                {isLoading ? (
                  <div className="h-8 rounded-md mt-2 bg-muted-foreground/40 w-full animate-pulse duration-1000"></div>
                ) : (
                  <Input
                    {...register("imageUrl")}
                    type="text"
                    placeholder="Optional: Enter image URL"
                    className="mt-2"
                  />
                )}
                {errors.imageUrl && (
                  <p className="mt-2 text-primary">{errors.imageUrl.message}</p>
                )}
              </div>
              <div className="flex flex-col">
                <Label className="text-base sm:text-lg font-semibold">
                  Upload Image
                </Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt="Preview"
                    width={200}
                    height={200}
                    style={{ objectFit: "cover" }}
                    className="my-3 h-40 w-40 rounded-md"
                  />
                ) : isLoading ? (
                  <div className="my-3 h-40 w-40 rounded-md  bg-muted-foreground/40  animate-pulse duration-1000"></div>
                ) : (
                  <div className="my-3 h-40 w-40 bg-muted-foreground/30 rounded-md flex justify-center items-center text-center">
                    No Image Available
                  </div>
                )}
                <div>
                  <Button
                    type="button"
                    onClick={handleButtonClick}
                    variant={"outline"}
                  >
                    <IoMdAddCircleOutline className="text-xl sm:text-2xl" />{" "}
                    Upload Image
                  </Button>
                </div>
                {imageError && (
                  <p className="mt-2 text-primary">{imageError}</p>
                )}
              </div>

              <Button type="submit" className="w-40 h-10">
                Update Post
              </Button>
            </Card>
          </form>
        </Card>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
};

export default EditPost;

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";
import Image from "next/image";
import { IoMdAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axiosInstance";
import { useToast } from "@/hooks/use-toast";

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

const AddPost = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset, // Destructure reset method
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      body: "",
      imageUrl: "",
    },
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const { toast } = useToast();

  // For referencing type = file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (data: FormData) => {
    // Set the form as submitted

    const file = fileInputRef.current?.files?.[0];

    // Ensure at least one image is uploaded or URL provided
    if (!file && !data.imageUrl) {
      setImageError(
        "You must upload at least one image or provide an image URL."
      );
      return;
    }

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

    setImageError(null); // Clear any previous errors

    // Convert image file to FormData if file is provided
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    if (data.imageUrl) formData.append("imageUrl", data.imageUrl);
    if (file) formData.append("image", file);

    try {
      // Sending the post data to jsonplaceholder without image because it doesn't allow that method
      const res = await axiosInstance.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: data.title,
          body: data.body,
          imageUrl: data.imageUrl || null,
        }
      );

      // Show toast notification
      toast({
        title: "Post Added",
        description: "Your post has been added successfully.",
      });

      console.log("Post added successfully:", res.data);

      // Reset the form fields and image preview
      reset();
      setImageSrc(null);
    } catch (err) {
      console.error("Error adding post", err);
      // Optionally, show an error toast notification here
      toast({
        title: "Error",
        description: "There was an error adding the post.",
      });
    }
  };

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
      setImageError(null); // Clear any previous errors
      setImageSrc(URL.createObjectURL(file));
    }
  };

  // Click on the referenced element
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <MaxWidthWrapper className="my-10">
        <Card>
          <h1 className="text-xl sm:text-2xl">Add Blog Post</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="flex flex-col gap-5 mt-5">
              <div>
                <Label className="text-base sm:text-lg font-semibold">
                  Title
                </Label>
                <Input
                  {...register("title")}
                  type="text"
                  placeholder="Enter the post title"
                  className="mt-2"
                />
                {errors.title && (
                  <p className="mt-2 text-primary">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Label className="text-base sm:text-lg font-semibold">
                  Body
                </Label>
                <Textarea
                  {...register("body")}
                  placeholder="Enter the post content"
                  className="resize-none mt-2"
                  rows={10}
                />
                {errors.body && (
                  <p className="mt-2 text-primary">{errors.body.message}</p>
                )}
              </div>
              <div>
                <Label className="text-base sm:text-lg font-semibold">
                  Image URL
                </Label>
                <Input
                  {...register("imageUrl")}
                  type="text"
                  placeholder="Optional: Enter image URL"
                  className="mt-2"
                />
                {errors.imageUrl && (
                  <p className=" mt-2 text-primary">
                    {errors.imageUrl.message}
                  </p>
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
                Add Post
              </Button>
            </Card>
          </form>
        </Card>
      </MaxWidthWrapper>
      <Footer />
    </>
  );
};

export default AddPost;

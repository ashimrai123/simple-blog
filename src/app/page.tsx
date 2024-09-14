// app/page.tsx (Server Component - No "use client")
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { fetchCombinedData } from "@/lib/api";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl?: string | null;
}

export default async function Home() {
  // Fetch data on the server side. Perfect for static generation (SSG).
  const posts: Post[] = await fetchCombinedData();

  // Grab the last 3 posts from the fetched data
  const lastPosts = posts.slice(-3);

  return (
    <div>
      <section>
        <MaxWidthWrapper className="my-10">
          <Card className="mb-10">
            <div className="grid grid-cols-3 gap-10">
              {/* --------------------- Display the most recent post prominently ----------------------- */}
              <div className="col-span-3 lg:col-span-2 lg:border-r-2 lg:pr-10 ">
                <Link href={`/posts/${posts.length}`} className={""}>
                  {posts.length > 0 && posts[posts.length - 1].imageUrl ? (
                    <div className="relative group">
                      {/* Show the most recent post's image if available */}
                      <Image
                        src={posts[posts.length - 1].imageUrl as string}
                        alt={posts[posts.length - 2].title}
                        width={500}
                        height={300}
                        style={{ objectFit: "cover" }}
                        className="w-full h-96  duration-200 rounded-md  group"
                      />
                      {/* Fade-in overlay effect when hovering */}
                      <div className=" absolute z-10 inset-0 bg-black opacity-0 rounded-md group-hover:opacity-35 transition-opacity duration-300"></div>
                    </div>
                  ) : (
                    <p>No image available</p>
                  )}
                  {/* Display the title and excerpt of the most recent post */}
                  <h2 className="mt-4 text-xl sm:text-3xl tracking-tight ">
                    {posts[posts.length - 1].title}
                  </h2>
                  <p className="mt-2 line-clamp-3">
                    {posts[posts.length - 1].body}
                  </p>
                </Link>
              </div>

              {/* --------------------- Display two more recent posts on the side ----------------------- */}
              <div className=" flex flex-col gap-5 col-span-3 lg:col-span-1">
                <div className="flex flex-col gap-2">
                  <div className="border-4 w-14 border-primary"></div>
                  <h2 className="font-bold">Popular Now</h2>
                </div>

                {/* Loop through the last two posts and show them */}
                {lastPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className=" ">
                    <Link href={`/posts/${post.id}`} className={""}>
                      {post.imageUrl && (
                        <div>
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            width={500}
                            height={300}
                            style={{ objectFit: "cover" }}
                            className="w-full h-56 hover:scale-105 rounded-md duration-200"
                          />
                        </div>
                      )}
                      <h2 className="mt-2 sm:text-lg font-light">
                        {post.title}
                      </h2>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* ----------------- Display the first three posts under "Editor's Picks" section --------------- */}
          <Card className="my-5">
            <h1 className="text-4xl">EDITOR&apos;S PICKS</h1>
            <div className="grid lg:grid-cols-3 gap-10 py-5">
              {/* Loop through the first three posts and display them */}
              {posts.slice(0, 3).map((post) => (
                <div key={post.id}>
                  <Link href={`/posts/${post.id}`} className={""}>
                    {post.imageUrl && (
                      <div className="relative group">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={500}
                          height={300}
                          style={{ objectFit: "cover" }}
                          className="w-full h-56 rounded-md"
                        />
                        {/* Same hover effect for each post */}
                        <div className="absolute z-10 inset-0 bg-black opacity-0 rounded-md group-hover:opacity-35 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <h2 className="mt-2 sm:text-lg font-light">{post.title}</h2>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </MaxWidthWrapper>
      </section>

      <Footer />
    </div>
  );
}

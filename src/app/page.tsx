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
  imageUrl?: string | undefined;
}

export default async function Home() {
  // Fetch data server-side, at build time for SSG
  const posts: Post[] = await fetchCombinedData();

  // Get the last 3 posts
  const lastPosts = posts.slice(-3);

  return (
    <div>
      <section>
        <MaxWidthWrapper className="my-10">
          <Card className="mb-10">
            <div className="grid grid-cols-3 gap-10">
              {/* --------------------- Display Last 3 Posts ----------------------- */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="border-4 w-14 border-primary"></div>
                  <h2 className="font-bold">Popular Now</h2>
                </div>

                {lastPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className="">
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
              <div className="col-span-2 border-l-2 pl-10 ">
                <Link href={`/posts/${posts.length - 1}`} className={""}>
                  {posts.length > 0 && posts[posts.length - 1].imageUrl ? (
                    <div className="relative group">
                      <Image
                        src={posts[posts.length - 1].imageUrl as string}
                        alt={posts[posts.length - 2].title}
                        width={500}
                        height={300}
                        style={{ objectFit: "cover" }}
                        className="w-full h-96  duration-200 rounded-md  group"
                      />
                      <div className="absolute z-10 inset-0 bg-black opacity-0 group-hover:opacity-35 transition-opacity duration-300"></div>
                    </div>
                  ) : (
                    <p>No image available</p>
                  )}
                  <h2 className="mt-4 text-xl sm:text-3xl tracking-tight ">
                    {posts[posts.length - 1].title} {/* Last post title */}
                  </h2>
                  <p className="mt-2 line-clamp-3">
                    {posts[posts.length - 1].body}
                  </p>
                </Link>
              </div>
            </div>
          </Card>

          {/* ----------------- Displaying first three posts --------------- */}
          <Card className="my-5">
            <h1 className="text-4xl">EDITOR&apos;S PICKS</h1>
            <div className="grid grid-cols-3 gap-10 py-5">
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
                          className="w-full h-56"
                        />
                        <div className="absolute z-10 inset-0 bg-black opacity-0 group-hover:opacity-35 transition-opacity duration-300"></div>
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

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { fetchCombinedData } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  body: string;
  imageUrl: string | null;
}

export default async function Home() {
  const posts: Post[] = await fetchCombinedData();

  return (
    <div>
      <section>
        <MaxWidthWrapper>
          <Card className="my-10">
            <div className="grid grid-cols-3 gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="border-4 w-14 border-primary"></div>

                  <h2 className="font-bold">Popular Now</h2>
                </div>

                <div>
                  {posts[13].imageUrl && (
                    <Image
                      src={posts[13].imageUrl}
                      alt={posts[13].title}
                      width={500}
                      height={300}
                      className=""
                    />
                  )}
                  <h2 className=" sm:text-lg font-light ">{posts[13].title}</h2>
                </div>
                <div>
                  {posts[21].imageUrl && (
                    <Image
                      src={posts[21].imageUrl}
                      alt={posts[21].title}
                      width={500}
                      height={300}
                      className=""
                    />
                  )}
                  <h2 className="  sm:text-lg font-light ">
                    {posts[21].title}
                  </h2>
                </div>
              </div>
              <div className="col-span-2 border-l-2 pl-10">
                {posts[12].imageUrl && (
                  <Image
                    src={posts[12].imageUrl}
                    alt={posts[12].title}
                    width={500}
                    height={300}
                    className="w-full"
                  />
                )}
                <h2 className=" text-xl sm:text-3xl tracking-tight ">
                  {posts[12].title}
                </h2>
              </div>
            </div>
          </Card>
          <Card className="my-5">
            <h1 className="text-4xl">EDITOR&apos;S PICKS</h1>
            <div className="grid grid-cols-3 gap-10 py-5">
              {posts[3].imageUrl && (
                <Image
                  src={posts[3].imageUrl}
                  alt={posts[3].title}
                  width={500}
                  height={300}
                  className="w-full col-span-2"
                />
              )}
              <h2 className=" text-xl sm:text-3xl tracking-tight ">
                {posts[3].title}
              </h2>
            </div>
          </Card>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

{
  /* {posts.map((post) => (
                <div key={post.id}>
                  <h2>{post.title}</h2>
                  {post.imageUrl && (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={500}
                      height={300}
                      layout="responsive"
                    />
                  )}
                  <p>{post.body}</p>
                </div>
              ))} */
}

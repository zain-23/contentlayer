import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { allPosts, Post } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import Link from "next/link";

function PostCard(post: Post) {
  return (
    <div className="mb-8">
      <Card className="mix-blend-plus-lighter isolate opacity-60">
        <CardHeader>
          <CardTitle className="text-2xl text-primary hover:text-primary/60 space-y-1">
            <Link href={post.url}>
              {post.title}
            </Link>
            <time className="block text-lg text-gray-600">
              {format(post.date, "LLLL d, yyyy")}
            </time>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  return (
    <div className="mx-auto max-w-xl py-8">
      <h1 className="mb-8 text-center text-2xl font-black">
        Next.js + Contentlayer Example
      </h1>
      {posts.map((data, idx) => (
        <PostCard key={idx} {...data} />
      ))}
    </div>
  );
}

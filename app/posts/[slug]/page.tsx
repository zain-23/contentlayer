import { allPosts } from "@/.contentlayer/generated";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface ParamsProps {
  params: {
    slug: string;
  };
}

export const getStaticParams = async ({ params }: ParamsProps) =>
  allPosts.map((p) => ({ slug: p._raw.flattenedPath }));

export const generateMetadata = ({ params }: ParamsProps) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) notFound();
  return {
    title: post.title,
  };
};

const PostLayout = ({ params }: ParamsProps) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) notFound();
  return (
    <div className="mx-auto max-w-xl py-8">
      <div className="mb-4 text-center">
        <time className="mb-1 text-xs text-gray-500">
          {format(post.date, "LLLL d, yyyy")}
        </time>
      </div>
      <Link href={"/"} className="flex gap-x-2 items-center group">
        <div className="h-7 w-7 border flex justify-center items-center rounded-full">
          <ArrowLeftIcon className="w-4 h-4 group-hover:scale-125 duration-200" />
        </div>
        All Post
      </Link>
      <h1 className="text-3xl font-bold my-3 text-primary">{post.title}</h1>
      <div
        className="prose prose-invert prose-red"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      ></div>
    </div>
  );
};

export default PostLayout;

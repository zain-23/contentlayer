import { allPosts } from "@/.contentlayer/generated";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import React from "react";

interface ParamsProps {
  params: {
    slug: string;
  };
}

export const generateMetaDate = ({ params }: ParamsProps) => {
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
      <div className="mb-8 text-center">
        <time className="mb-1 text-xs text-gray-500">
          {format(post.date, "LLLL d, yyyy")}
        </time>
      </div>
      <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
      <div
        className="prose prose-green"
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      ></div>
    </div>
  );
};

export default PostLayout;

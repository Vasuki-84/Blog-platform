import Post from "@/Components/Post";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`
  ).then((res) => res.json());

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return <Post params={resolvedParams} />;
}
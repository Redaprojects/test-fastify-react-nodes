// app/routes/profile.tagged.grid.tsx

import { api } from "~/services/api";
import { postsSchema, type Post } from "~/schemas/post.schema";
import { useLoaderData } from "react-router";
import { PostCard } from "~/components/PostCard";

export async function loader() {
  const response = await api.get("/tagged/grid");
  const posts: Post[] = postsSchema.parse(response.data);
  return posts;
}

export default function TaggedGrid() {
  const posts = useLoaderData() as Post[];
  return (
    <div>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}
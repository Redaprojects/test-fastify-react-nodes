// app/routes/profile.posts.grid.tsx
import { api } from "~/services/api";
import { postsSchema, type Post } from "~/schemas/post.schema";
import { useLoaderData } from "react-router";
import { PostCard } from "~/components/PostCard";

export async function loader() {
  const response = await api.get("/posts");
  const posts: Post[] = postsSchema.parse(response.data);
  return posts;
}

export default function PostsGrid() {
  const posts = useLoaderData() as Post[];
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
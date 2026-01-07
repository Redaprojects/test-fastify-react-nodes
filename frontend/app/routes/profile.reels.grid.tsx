// app/routes/profile.reels.grid.tsx

import { api } from "~/services/api";
import { reelsSchema, type Reel } from "~/schemas/reel.schema";
import { useLoaderData } from "react-router";
import { ReelGridItem } from "~/components/ReelGridItem";

export async function loader() {
  const response = await api.get("/reels/grid");
  const reels: Reel[] = reelsSchema.parse(response.data);
  return reels;
}

export default function ReelsGrid() {
  const reels = useLoaderData() as Reel[];
  return (
    <div className="grid grid-cols-3 gap-1">
      {reels.map((reel) => (
        <ReelGridItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
}
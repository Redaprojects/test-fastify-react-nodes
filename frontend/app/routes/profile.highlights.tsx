// app/routes/profile.highlights.tsx

import { api } from "~/services/api";
import { highlightsSchema, type Highlight } from "~/schemas/highlight.schema";
import { useLoaderData } from "react-router";
import { HighlightBubble } from "~/components/HighlightBubble";

export async function loader() {
  const res = await api.get("/highlights");
  const data: Highlight[] = highlightsSchema.parse(res.data);
  return data;
}

export default function HighlightsList() {
  const highlights = useLoaderData() as Highlight[];
  return (
    <div className="flex overflow-x-auto py-4">
      {highlights.map((h) => (
        <HighlightBubble key={h.id} highlight={h} />
      ))}
    </div>
  );
}
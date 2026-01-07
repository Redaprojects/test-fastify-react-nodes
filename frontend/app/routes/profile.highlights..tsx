// app/routes/profile.highlights.tsx
// Detail route (dynamic)
import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { api } from "~/services/api";
import {
  highlightSchema,
  type Highlight,
} from "~/schemas/highlight.schema";

export async function loader({ params }: LoaderFunctionArgs) {
  const highlightId = params.id;
  const response = await api.get(`/highlights/${highlightId}`);
  return highlightSchema.parse(response.data);
}

export default function HighlightDetail() {
  const highlight = useLoaderData() as Highlight;
  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold">{highlight.title}</h1>
      <img
        src={highlight.cover_image_url}
        alt={highlight.title}
        className="w-full max-w-md mx-auto mt-4 rounded-lg"
      />
    </div>
  );
}
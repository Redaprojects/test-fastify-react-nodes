// app/components/HighlightBubble.tsx

import { Link } from "react-router";

export function HighlightBubble({
  highlight,
}: {
  highlight: { id: number; cover_image_url: string; title: string };
}) {
  return (
    <Link
      to={`/profile/highlights/${highlight.id}`}
      className="flex flex-col items-center mx-2"
    >
      <img
        src={highlight.cover_image_url}
        alt={highlight.title}
        className="w-20 h-20 rounded-full object-cover border"
      />
      <span className="text-sm mt-1">{highlight.title}</span>
    </Link>
  );
}
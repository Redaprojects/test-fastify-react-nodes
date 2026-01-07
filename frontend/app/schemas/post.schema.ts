// app/schemas/post.schema.ts

import { z } from "zod";

const postSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  created_at: z.string(),
});

const postsSchema = z.array(postSchema);
type Post = z.infer<typeof postSchema>;

export { postSchema, postsSchema };
export type { Post };

// Update schema for create‑post validation
export const createPostInputSchema = z
  .object({
    caption: z.string().min(1, "Caption is required.").max(255).optional(),
    image: z.instanceof(File).optional(),
  })
  .refine((data) => data.caption || data.image, {
    message: "Either an image or a caption is required.",
    path: ["image"],
  });

export type CreatePostInput = z.infer<typeof createPostInputSchema>;
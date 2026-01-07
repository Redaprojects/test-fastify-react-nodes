// src/core/database/databaseConnectionTesterBuilder.transactions.ts
import type { Database } from "better-sqlite3";
import { CreatePostDto } from "src/modules/posts/posts.types";

// This factory function creates and returns our transaction helpers.
const createTransactionHelpers = (db: Database) => {
  // We use prepared statements for security and performance.
  const statements = {
    getPostById: db.prepare("SELECT * FROM posts WHERE id = ?"),
    getAllPosts: db.prepare("SELECT * FROM posts"),
    createPost: db.prepare(
      "INSERT INTO posts (img_url, caption) VALUES (@img_url, @caption) RETURNING *",
    ),
    // Add any extra prepared statements here if needed later
  };

  const posts = {
    getById: (id: number) => {
      return statements.getPostById.get(id);
    },
    getAll: () => {
      return statements.getAllPosts.all();
    },
    create: (data: CreatePostDto) => {
      return statements.createPost.get(data);
    },
  };

  // --- new tagged helper section ---
  const tagged = {
    getAll: () =>
      db.prepare("SELECT * FROM tagged_posts ORDER BY id DESC").all(),
  };

  // Return an object that bundles all modules together
  return {
    posts,
    tagged,
  };
};

// Export types & factory
export type TransactionHelpers = ReturnType<typeof createTransactionHelpers>;
export { createTransactionHelpers };
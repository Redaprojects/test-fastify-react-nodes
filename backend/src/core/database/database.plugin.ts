import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import Database from "better-sqlite3";
import {
  createTransactionHelpers,
  type TransactionHelpers,
} from "./database.transactions";

declare module "fastify" {
  interface FastifyInstance {
    db: Database.Database;
    transactions: TransactionHelpers;
  }
}

async function databasePluginHelper(fastify: FastifyInstance) {
  const db = new Database("./database.db");
  fastify.log.info("SQLite database connection established.");

  // Create a simple table for testing if it doesn't exist
  db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    img_url TEXT NOT NULL,
    caption TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

    // --- NEW tagged_posts table & seed  ---
  db.prepare(`
    CREATE TABLE IF NOT EXISTS tagged_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      img_url TEXT NOT NULL,
      caption TEXT,
      user TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `).run();

  const taggedSeed = [
    {
      img_url: "http://example.com/tagged1.jpg",
      caption: "Tagged image",
      user: "webeet_user",
    },
  ];

  for (const p of taggedSeed) {
    db.prepare(
      `INSERT INTO tagged_posts (img_url, caption, user)
       VALUES (@img_url, @caption, @user)`
    ).run(p);
  }

  const transactions = createTransactionHelpers(db);

  fastify.decorate("db", db);
  fastify.decorate("transactions", transactions);

  fastify.addHook("onClose", (instance, done) => {
    instance.db.close();
    instance.log.info("SQLite database connection closed.");
    done();
  });
}

const databasePlugin = fp(databasePluginHelper);

export { databasePlugin };
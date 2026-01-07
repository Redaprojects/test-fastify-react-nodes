// src/modules/tagged/tagged.service.ts
import type { FastifyInstance } from "fastify";

const taggedService = (fastify: FastifyInstance) => ({
  getAll: async () => fastify.transactions.tagged.getAll(),
});

export { taggedService };
// src/modules/tagged/tagged.routes.ts
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { taggedService } from "./tagged.service";

const taggedRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  const service = taggedService(fastify);

  fastify.get("/tagged/grid", async (_req, reply) => {
    const taggedPosts = await service.getAll();
    return reply.code(200).send(taggedPosts);
  });
};

export { taggedRoutes };
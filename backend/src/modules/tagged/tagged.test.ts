// src/modules/tagged/tagged.test.ts
import Fastify from "fastify";
import { taggedRoutes } from "./tagged.routes";

describe("GET /tagged/grid", () => {
  it("should return an array of tagged posts with a 200 status code", async () => {
    const app = Fastify();

    const mockTaggedPosts = [
      {
        id: 1,
        img_url: "http://example.com/tagged1.jpg",
        caption: "Tagged photo 1",
        user: "webeet_user",
        created_at: "2025‑06‑20",
      },
    ];

    // include both posts and tagged mocks, and use jest.fn()
    app.decorate("transactions", {
      posts: {
        getById: jest.fn(),
        getAll: jest.fn(),
        create: jest.fn(),
      },  
      tagged: { getAll: jest.fn().mockReturnValue(mockTaggedPosts) },
    });

    app.register(taggedRoutes);

    const response = await app.inject({ method: "GET", url: "/tagged/grid" });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual(mockTaggedPosts);
  });
});
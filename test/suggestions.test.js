const request = require("supertest");
const app = require("../src/app");

describe("API /suggestions", () => {
  test("Returns 400 status if query is empty", async () => {
    const res = await request(app).get("/suggestions");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });

  test("Returns city suggestions based on query", async () => {
    const res = await request(app).get("/suggestions?q=Toronto");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("suggestions");
    expect(res.body.suggestions.length).toBeGreaterThan(0);
  });

  test("Returns results sorted by highest score", async () => {
    const res = await request(app).get("/suggestions?q=Toronto");
    expect(res.body.suggestions[0].score).toBeGreaterThan(0.5);
  });
});

import dotenv from "dotenv/config";
import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";

beforeAll(async () => {
  // Wait until the connection is fully open (readyState 1) before starting tests
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});
describe("Auth Routes", () => {
  let token;

  it("should register a user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test3@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe("test3@example.com");
  });

  it("returns 400 if no body is sent", async () => {
    const res = await request(app).post("/api/auth/register"); // no .send()

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Request body/i);
  });

  it("should login user and return token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });
});
afterAll(async () => {
  await mongoose.connection.close();
});

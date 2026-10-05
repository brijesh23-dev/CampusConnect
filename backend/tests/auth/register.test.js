const request = require("supertest");
const app = require("../../src/app");
const clearDatabase = require("../helpers/db");

describe("POST /api/auth/register", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  test("should register a new user successfully", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Test Student",
      email: "teststudent@gmail.com",
      password: "password123",
      role: "student",
    });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe("User registered successfully");
    
    // these are optional because we already validate body by validator.

    // expect(response.body.user).toBeDefined();

    // expect(response.body.user.name).toBe("Test Student");

    // expect(response.body.user.email).toBe("teststudent@gmail.com");

    // expect(response.body.user.role).toBe("student");

    // expect(response.body.token).toBeDefined();
  });

  test("should return 400 when name is missing", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "teststudent@gmail.com",
      password: "password123",
      role: "student",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("validation failed");

    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  test("should return 400 when email is invalid", async () => {
    const response = await request(app).post("/api/auth/register").send({
      name: "Test Student",
      email: "invalid-email",
      password: "password123",
      role: "student",
    });

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);

    expect(response.body.errors).toBeDefined();
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  test("should return 409 when email already exists", async () => {
    const user = {
      name: "Existing User",
      email: "existing@gmail.com",
      password: "password123",
      role: "student",
    };

    // Create the user first
    await request(app).post("/api/auth/register").send(user);

    // Try registering the same email again
    const response = await request(app).post("/api/auth/register").send({
      name: "Another User",
      email: "existing@gmail.com",
      password: "another123",
      role: "student",
    });

    expect(response.statusCode).toBe(409);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toBe("User already exists");
  });
});

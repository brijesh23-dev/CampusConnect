const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../src/app");
const clearDatabase = require("../helpers/db");
const UserModel = require("../../src/models/user.model");

describe("POST api/auth/login", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  test("should login user successfully", async () => {
    //register user
    await request(app).post("/api/auth/register").send({
      name: "Test Student",
      email: "teststudent@gmail.com",
      password: "password123",
      role: "student",
    });

    //login
    const response = await request(app).post("/api/auth/login").send({
      email: "teststudent@gmail.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.user).toBeDefined();
    expect(response.body.token).toBeDefined();
    const token = jwt.decode(response.body.token);
    expect(token.exp - token.iat).toBe(7 * 24 * 60 * 60);
    expect(response.headers["set-cookie"][0]).toContain("Max-Age=604800");
  });

  test("should keep the session for 30 days when rememberMe is enabled", async () => {
    await request(app).post("/api/auth/register").send({
      name: "Test Student",
      email: "teststudent@gmail.com",
      password: "password123",
      role: "student",
    });

    const response = await request(app).post("/api/auth/login").send({
      email: "teststudent@gmail.com",
      password: "password123",
      rememberMe: true,
    });

    expect(response.statusCode).toBe(200);
    const token = jwt.decode(response.body.token);
    expect(token.exp - token.iat).toBe(30 * 24 * 60 * 60);
    expect(response.headers["set-cookie"][0]).toContain("Max-Age=2592000");
  });

  test.each(["student", "club", "admin"])(
    "a new %s login invalidates the previous device session",
    async (role) => {
      const email = `test-${role}@gmail.com`;
      await request(app).post("/api/auth/register").send({
        name: `Test ${role}`,
        email,
        password: "password123",
        role: role === "admin" ? "student" : role,
      });
      if (role === "admin") {
        await UserModel.updateOne({ email }, { role: "admin" });
      }

      const firstLogin = await request(app)
        .post("/api/auth/login")
        .send({ email, password: "password123" });
      const secondLogin = await request(app)
        .post("/api/auth/login")
        .send({ email, password: "password123" });

      const firstSession = await request(app)
        .get("/api/auth/getme")
        .set("Authorization", `Bearer ${firstLogin.body.token}`);
      const secondSession = await request(app)
        .get("/api/auth/getme")
        .set("Authorization", `Bearer ${secondLogin.body.token}`);

      expect(firstLogin.statusCode).toBe(200);
      expect(secondLogin.statusCode).toBe(200);
      expect(firstSession.statusCode).toBe(401);
      expect(firstSession.body.message).toBe(
        "Your session has expired. Please log in again.",
      );
      expect(secondSession.statusCode).toBe(200);
    },
  );

  test("should return 401 when password is incorrect", async () => {
    //register user
    await request(app).post("/api/auth/register").send({
      name: "Test Student",
      email: "teststudent@gmail.com",
      password: "password123",
      role: "student",
    });

    //login with wrong pass
    const response = await request(app).post("/api/auth/login").send({
      email: "teststudent@gmail.com",
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Incorrect password.");
  });

  test("should return 401 when user does not exist", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "notfound@gmail.com",
      password: "password123",
    });

  expect(response.statusCode).toBe(401);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Invalid credentials.");
});
});

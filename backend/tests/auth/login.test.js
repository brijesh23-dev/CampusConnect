const request = require("supertest");
const app = require("../../src/app");
const clearDatabase = require("../helpers/db");

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
  });
  test("should return 401 when password is incorrect", async () => {
    //register user
    await request(app).post("/api/auth/register").send({
      name: "Test Student",
      email: "teststudent@gmail.com",
      password: "password123",
      role: "Student",
    });

    //login with wrong pass
    const response = await request(app).post("/api/auth/login").send({
      email: "teststudent@gmail.com",
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid credentials.");
  });
});

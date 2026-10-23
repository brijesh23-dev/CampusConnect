const supertest = require("supertest");
const app = require("../../src/app");
const clearDatabase = require("../helpers/db");
const Notification = require("../../src/models/notification.model");
describe("POST /api/events/create", () => {
  beforeEach(async () => {
    await clearDatabase();
  });

  test("creates a draft event with an optional attendee limit", async () => {
    await supertest(app).post("/api/auth/register").send({
      name: "Test Club",
      email: "testclub@gmail.com",
      password: "password123",
      role: "club",
    });
    await supertest(app).post("/api/auth/register").send({
      name: "Test Student",
      email: "teststudent@gmail.com",
      password: "password123",
      role: "student",
    });

    const login = await supertest(app).post("/api/auth/login").send({
      email: "testclub@gmail.com",
      password: "password123",
    });

    const response = await supertest(app)
      .post("/api/events/create")
      .set("Cookie", login.headers["set-cookie"])
      .field("title", "Campus Tech Meetup")
      .field("description", "A meetup for students interested in technology.")
      .field("category", "Technology")
      .field("date", "2026-11-20")
      .field("startTime", "10:00")
      .field("endTime", "12:00")
      .field("venue", "Room 204")
      .field("status", "draft");

    expect(response.statusCode).toBe(201);
    expect(response.body.event.status).toBe("draft");
    expect(response.body.event.maxParticipants).toBeNull();
    expect(await Notification.countDocuments()).toBe(0);
  });
});

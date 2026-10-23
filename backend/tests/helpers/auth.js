const request = require("supertest");
const app = require("../../src/app");

const createClubAndLogin = async () => {
  await request(app).post("/api/auth/register").send({
    name: "Test Club",
    email: "testclubs@gmail.com",
    password: "password123",
    role: "club",
  });

  const response = await request(app).post("/api/auth/login").send({
    email: "testclub@gmail.com",
    password: "password123",
  });

  return response.headers["set-cookie"];
};

module.exports = createClubAndLogin;
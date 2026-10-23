const supertest = require("supertest");
const app = require("../../src/app");
const clearDatabase = require("../helpers/db");
const createClubAndLogin = require("../helpers/auth.js");

describe(" POST api/evnts/create-events", () => {
  let cookies;
  beforeEach(async () => {
    await clearDatabase();
  });

  test("should create an event successfully", async () => {});
});

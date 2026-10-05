const request = require('supertest');

const app = require('../../src/app');

describe("API Test",()=>{
    test("should return a response from the server", async()=>{
        const response = await request(app)
        .get("/api/events/all")

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.events)).toBe(true);
    })
})
const request = require("supertest");
const app = require("../src/index");

describe("API Tests", () => {
    test("GET / should return 'Hello, CI/CD!'", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Hello, CI/CD!");
    });

    test("GET /user/:id should return user details", async () => {
        const res = await request(app).get("/user/1");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: "1", name: "Alice" });
    });

    test("POST /user should return 201 on user creation", async () => {
        const res = await request(app).post("/user").send({ name: "David" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.name).toBe("David");
    });

    test("POST /user should return 400 if name is missing", async () => {
        const res = await request(app).post("/user").send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Name is required");
    });
});

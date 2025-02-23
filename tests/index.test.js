const request = require("supertest");
const app = require("../src/index");


describe("API Tests", () => {
    let server;

    beforeAll((done) => {
        server = app.listen(4000, done); // Start server on test port
    });

    afterAll((done) => {
        server.close(done); // Close server after tests
    });

    test("GET / should return 'Hello, CI/CD!'", async () => {
        const res = await request(server).get("/");
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Hello, CI/CD!");
    });

    test("GET /user/:id should return user details", async () => {
        const res = await request(server).get("/user/1");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ id: "1", name: "John Doe" });
    });

    test("POST /user should return 201 on user creation", async () => {
        const res = await request(server).post("/user").send({ name: "Alice" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ id: 1, name: "Alice" });
    });

    test("POST /user should return 400 if name is missing", async () => {
        const res = await request(server).post("/user").send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe("Name is required");
    });
});

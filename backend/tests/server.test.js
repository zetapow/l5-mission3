const server = require("../server");
const request = require("supertest");

describe("Backend APIs", () => {
   describe("GET / - root endpoint", () => {
      test("should return backend is running", async () => {
         const response = await request(server).get("/");
         expect(response.statusCode).toBe(200);
         expect(response.body).toEqual({ status: "backend is running" });
      });
   });
});

describe("POST /api/interview", () => {
   test("return 400 status if input is invalid", async () => {
      const response = await request(server).post("/api/interview").send({});
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Invalid input");
   });

   test("return AI response", async () => {
      // mock API call
      const response = await request(server)
         .post("/api/interview")
         .send({
            jobTitle: "developer",
            messages: [{ sender: "user", text: "Hello" }],
         });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("response");
      expect(response.body.jobTitle).toBe("developer");
      expect(response.body.history).toBeInstanceOf(Array);
   });
});

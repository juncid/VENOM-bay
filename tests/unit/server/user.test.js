const expect = require("expect");
const app = require("../../../server");
const request = require("supertest");
const User = require("../../../server/models/user");
const { seedUsers, populateUsers } = require("./seed");
const { ObjectId } = require("mongodb");

beforeEach(populateUsers);

describe("GET /users", () => {
  it("should return user if authenticated", async () => {
    const res = await request(app)
      .get("/users")
      .set("authorization", `Bearer ${seedUsers[0].token}`)
      .expect(200);
    expect(res.body.user._id).toBe(seedUsers[0]._id.toHexString());
  });
  it("should return 401 if unauthenticated", async () => {
    const res = await request(app)
      .get("/users")
      .expect(401);
    expect(res.body.user).toBeUndefined();
  });
});

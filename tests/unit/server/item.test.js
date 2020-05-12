const expect = require("expect");
const app = require("../../../server");
const request = require("supertest");
const Item = require("../../../server/models/item");

const seedItems = [
  {
    title: "Test item 1"
  },
  {
    title: "Test item 2"
  }
];

beforeEach(async () => {
  await Item.deleteMany();
  await Item.insertMany(seedItems);
});

describe("POST /items", () => {
  it("should create a new item", async () => {
    const body = {title: "Test title"};
    const res = await request(app)
      .post("/items")
      .send(body)
      .expect(200);
    expect(res.body.item.title).toBe(body.title);
    const items = await Item.find();
    expect(items.length).toBe(seedItems.length + 1);
    expect(items[seedItems.length].title).toBe(body.title);
  });
});

describe("GET /items", () => {
  it("should get all items", async () => {
    const res = await request(app)
      .get("/items")
      .expect(200);
    expect(res.body.items.length).toBe(seedItems.length);
  });
});

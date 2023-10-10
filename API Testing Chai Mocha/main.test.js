const request = require("supertest")("https://dummyapi.io/data/v1");
const chai = require("chai");
const cjs = require("chai-json-schema");

chai.use(cjs);
const { expect } = chai;

const userSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
  },
  required: ["firstName", "lastName"],
};

const usersSchema = {
  type: "object",
  properties: {
    data: {
      type: "array",
      items: {
        ...userSchema,
      },
    },
  },
};
let UID = "";
let POSTID = "";
describe("API TESTING FOR DUMMY API", () => {
  describe("USERS TEST", () => {
    it("GET ALL USER", async function () {
      const res = await request
        .get("/user")
        .set("APP-ID", "651fbd081efb491ee7b55efe");
      // console.log(res._body);
      // console.log(res.status);
      expect(res.body).have.jsonSchema(usersSchema);
      expect(res.status).equals(200);
    });
    it("CREATE USER", async function () {
      let data = {
        lastName: "Furtianto",
        firstName: "Fauzi",
        email: "chuaaaakz@buzztrucking.com",
      };
      const res = await request
        .post("/user/create")
        .send(data)
        .set("APP-ID", "651fbd081efb491ee7b55efe");
      expect(res._body.firstName).equals(data.firstName);
      expect(res._body.lastName).equals(data.lastName);
      expect(res._body.email).equals(data.email);
      UID = res.body.id;
    });
    it("UPDATE USER", async function () {
      let data = {
        lastName: "Furtiante",
        firstName: "Fauze",
        gender: "male",
      };
      const res = await request
        .put(`/user/${UID}`)
        .send(data)
        .set("APP-ID", "651fbd081efb491ee7b55efe");
      // console.log(res._body);
      expect(res._body.firstName).equals(data.firstName);
      expect(res._body.lastName).equals(data.lastName);
      expect(res._body.gender).equals(data.gender);
      // console.log(res.body);
      UID = res.body.id;
    });
    it("GET USER BY ID", async function () {
      const res = await request
        .get("/user/60d0fe4f5311236168a109ca")
        .set("APP-ID", "651fbd081efb491ee7b55efe");
      expect(res._body.id).equals("60d0fe4f5311236168a109ca");
      expect(res._body.title).equals("ms");
      expect(res._body.firstName).equals("Sara");
      expect(res._body).have.jsonSchema(userSchema);
    });
    it("DELETE USER BY ID", async function () {
      const res = await request
        .delete(`/user/${UID}`)
        .set("APP-ID", "651fbd081efb491ee7b55efe");
    });
  });
  describe("POST TEST", () => {
    it("GET TAG", async function () {
      const res = await request
        .get("/tag")
        .set("APP-ID", "651fbd081efb491ee7b55efe");
      expect(res.status).equals(200);
    });
    it("GET ALL POST", async function () {
      const res = await request
        .get("/post")
        .set("APP-ID", "651fbd081efb491ee7b55efe");
      expect(res.status).equals(200);
      // console.log(res.body.owner);
    });
    it("GET POST BY TAG", async function () {
      const res = await request
        .get("/tag/#naruto/post")
        .set("APP-ID", "651fbd081efb491ee7b55efe");
      expect(res.status).equals(200);
    });
    it("CREATE POST", async function () {
      const data = {
        text: "This is a testing for creating a post",
        owner: UID,
      };
      const res = await request
        .post("/post/create")
        .send(data)
        .set("APP-ID", "651fbd081efb491ee7b55efe");

      // console.log(res.body);
      // expect(res.body.text).equals(data.text);
      // expect(res.body.tags).equals(data.tags);
      // expect(res.body.owner.id).equals(UID);
      POSTID = res.body.id;
    });
  });
});

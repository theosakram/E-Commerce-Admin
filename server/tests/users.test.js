const request = require("supertest");
const app = require("../index");
const { queryInterface } = require("../models").sequelize;

const newUser = {
  name: "cyanidewithrice",
  email: "asdasd@gmail.com",
  password: "something",
  role: "admin",
};

afterAll((done) => {
  queryInterface
    .bulkDelete("Users")
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("/POST", () => {
  test("should return newly registered user", (done) => {
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.user).toHaveProperty("id", expect.any(Number));
        expect(res.body.user).toHaveProperty("name", newUser.name);
        expect(res.body.user).toHaveProperty("email", newUser.email);

        done();
      });
  });

  test("checking for empty value when register", (done) => {
    request(app)
      .post("/users/register")
      .send({ name: "", email: "", password: "" })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({ msg: "Name is required" });
        expect(res.body.errors).toContainEqual({ msg: "Email is required" });
        expect(res.body.errors).toContainEqual({ msg: "Password is required" });

        done();
      });
  });

  test("checking for correct email format when register", (done) => {
    request(app)
      .post("/users/register")
      .send({ name: "asdasd", email: "asdasd", password: "asdasd" })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({ msg: "Wrong email format" });

        done();
      });
  });

  test("checking email must've not already been registered", (done) => {
    request(app)
      .post("/users/register")
      .send(newUser)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "Email is already registered",
        });

        done();
      });
  });

  test("login should return access_token", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: newUser.email, password: newUser.password })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("name", newUser.name);
        expect(res.body.access_token).toBeTruthy();

        done();
      });
  });

  test("failed login wrong email/password", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: newUser.email,
        password: "alksdjalskdjalskdjasldkj",
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "Wrong email/ password",
        });

        done();
      });
  });

  test("failed login user not found", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: "123@gmail.com",
        password: "alksdjalskdjalskdjasldkj",
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "User not found",
        });

        done();
      });
  });
});

module.exports = newUser;

const request = require("supertest");
const app = require("../index");
const { User } = require("../models");
const { queryInterface } = require("../models").sequelize;

const newUser = {
  name: "cyanidewithrice",
  email: "cwr@gmail.com",
  password: "something",
  role: "admin",
};

beforeAll((done) => {
  User.create(newUser)
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

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
    const newUser2 = {
      name: "pqpqpqp",
      email: "pqpq@gmail.com",
      password: "something",
      role: "user",
    };
    request(app)
      .post("/users/register")
      .send(newUser2)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.user).toHaveProperty("id", expect.any(Number));
        expect(res.body.user).toHaveProperty("name", newUser2.name);
        expect(res.body.user).toHaveProperty("email", newUser2.email);
        expect(res.body.user).toHaveProperty("role", newUser2.role);

        done();
      });
  });

  test("login should return access_token", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: newUser.email,
        password: newUser.password,
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("name", newUser.name);
        expect(res.body.access_token).toBeTruthy();

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

  test("if role is empty when register, automatically become user", (done) => {
    let noRoleUser = {
      name: "thick",
      email: "thick@gmail.com",
      password: "thicker",
    };
    request(app)
      .post("/users/register")
      .send(noRoleUser)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.user).toHaveProperty("id", expect.any(Number));
        expect(res.body.user).toHaveProperty("name", noRoleUser.name);
        expect(res.body.user).toHaveProperty("email", noRoleUser.email);
        expect(res.body.user).toHaveProperty("role", "user");

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

const request = require("supertest");
const app = require("../index");
const { User } = require("../models");
const { queryInterface } = require("../models").sequelize;
const { createToken, verifyToken } = require("../helper/jwt");

let admin = {
  name: "admin",
  email: "admin@asdasd.com",
  password: "something",
  role: "admin",
};

let user = {
  name: "user",
  email: "user@asdasd.com",
  password: "something",
  role: "user",
};

let access_token = createToken(admin);
let access_token_user = createToken(user);
let product_id, product_id_2;

beforeAll((done) => {
  User.create(user)
    .then((_) => {
      return User.create(admin);
    })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Products")
    .then((_) => {
      return queryInterface.bulkDelete("Users");
    })
    .then((_) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("/GET", () => {
  test("should return array of products", (done) => {
    request(app)
      .get("/products")
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);

        done();
      });
  });

  test("should require authentication token", (done) => {
    request(app)
      .get("/products")
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Invalid Token" });

        done();
      });
  });

  test("should require valid token", (done) => {
    request(app)
      .get("/products")
      .set("access_token", "sdfu823023fjsdjkfl23f-923fo23okj")
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Invalid Token" });

        done();
      });
  });
});

describe("/POST", () => {
  test("success return detail of newly created product", (done) => {
    let newP = {
      name: "Nendoroid Catarina Claes",
      image_url:
        "https://images.goodsmile.info/cgm/images/product/20200630/9711/71531/large/2873b2fef19273caea217854a9f715ab.jpg",
      category: "Nendoroid",
      price: 820000,
      stock: 7,
    };
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(newP)
      .end((err, res) => {
        if (err) throw err;

        product_id = res.body.id;

        expect(res.status).toBe(201);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("id", expect.any(Number));
        expect(res.body).toHaveProperty("name", newP.name);
        expect(res.body).toHaveProperty("image_url", newP.image_url);
        expect(res.body).toHaveProperty("category", newP.category);
        expect(res.body).toHaveProperty("price", newP.price);
        expect(res.body).toHaveProperty("stock", newP.stock);

        done();
      });
  });

  test("checking for empty value when adding product", (done) => {
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send({ name: "", image_url: "", category: "", price: "", stock: "" })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({ msg: "Name is required" });
        expect(res.body.errors).toContainEqual({
          msg: "Image URL is required",
        });
        expect(res.body.errors).toContainEqual({
          msg: "You must give your product a price",
        });
        expect(res.body.errors).toContainEqual({
          msg: "Stock is required to sell things",
        });
        done();
      });
  });

  test("checking product name must be unique", (done) => {
    let newP = {
      name: "Nendoroid Catarina Claes",
      image_url:
        "https://images.goodsmile.info/cgm/images/product/20200630/9711/71531/large/2873b2fef19273caea217854a9f715ab.jpg",
      category: "asdasd",
      price: 820000,
      stock: 7,
    };
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send(newP)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "Name is already taken",
        });

        done();
      });
  });

  test("checking stock and price to be integer", (done) => {
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send({
        name: "asdasd",
        image_url: "asdasd",
        category: "asdasd",
        price: "asdasd",
        stock: "asdasd",
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "Price must be numbers",
        });
        expect(res.body.errors).toContainEqual({
          msg: "Stock must be numbers",
        });

        done();
      });
  });

  test("checking price cannot be < 1, and stock cannot be < 0", (done) => {
    request(app)
      .post("/products")
      .set("access_token", access_token)
      .send({
        name: "asdasd",
        image_url: "asdasd",
        category: "asdasd",
        price: 0,
        stock: -1,
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "Price cannot be lesser than one",
        });
        expect(res.body.errors).toContainEqual({
          msg: "Stock cannot be lesser than zero",
        });

        done();
      });
  });

  test("should require authentication token", (done) => {
    let newP = {
      name: "Nendoroid Catarina Claes",
      image_url:
        "https://images.goodsmile.info/cgm/images/product/20200630/9711/71531/large/2873b2fef19273caea217854a9f715ab.jpg",
      category: "Nendoroid",
      price: 820000,
      stock: 7,
    };
    request(app)
      .post("/products")
      .send(newP)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Invalid Token" });

        done();
      });
  });

  test("should require valid token", (done) => {
    let newP = {
      name: "Nendoroid Catarina Claes",
      image_url:
        "https://images.goodsmile.info/cgm/images/product/20200630/9711/71531/large/2873b2fef19273caea217854a9f715ab.jpg",
      category: "Nendoroid",
      price: 820000,
      stock: 7,
    };
    request(app)
      .post("/products")
      .send(newP)
      .set("access_token", "adspfoiu289p3orhwejf0dfhsjldfhsdy423ohjlk")
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Invalid Token" });

        done();
      });
  });
});

describe("/PUT", () => {
  test("success return detail of newly edited product", (done) => {
    let editP = {
      name: "Nendoroid Ristarte",
      image_url:
        "https://goodsmileshop.com/medias/sys_master/images/images/hf3/ha8/9179941273630.jpg",
      category: "Nendoroid",
      price: 850000,
      stock: 6,
    };
    request(app)
      .put(`/products/${product_id}`)
      .set("access_token", access_token)
      .send(editP)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("msg");
        expect(res.body.msg).toBe("Product edited successfully");

        expect(res.body.product).toHaveProperty("id", expect.any(Number));
        expect(res.body.product).toHaveProperty("name", editP.name);
        expect(res.body.product).toHaveProperty("image_url", editP.image_url);
        expect(res.body.product).toHaveProperty("category", editP.category);
        expect(res.body.product).toHaveProperty("price", editP.price);
        expect(res.body.product).toHaveProperty("stock", editP.stock);

        done();
      });
  });

  test("checking for existing product id", (done) => {
    let editP = {
      name: "Nendoroid Ristarte",
      image_url:
        "https://goodsmileshop.com/medias/sys_master/images/images/hf3/ha8/9179941273630.jpg",
      category: "Nendoroid",
      price: 850000,
      stock: 6,
    };
    request(app)
      .put(`/products/100`)
      .set("access_token", access_token)
      .send(editP)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Product not found" });

        done();
      });
  });

  test("checking for empty value when editing product", (done) => {
    request(app)
      .put(`/products/${product_id}`)
      .set("access_token", access_token)
      .send({ name: "", image_url: "", category: "", price: "", stock: "" })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({ msg: "Name is required" });
        expect(res.body.errors).toContainEqual({
          msg: "Image URL is required",
        });
        expect(res.body.errors).toContainEqual({
          msg: "You must give your product a price",
        });
        expect(res.body.errors).toContainEqual({
          msg: "Stock is required to sell things",
        });
        done();
      });
  });

  test("checking edited stock and price to be integer", (done) => {
    request(app)
      .put(`/products/${product_id}`)
      .set("access_token", access_token)
      .send({
        name: "asdasd",
        image_url: "asdasd",
        category: "asdasd",
        price: "asdasd",
        stock: "asdasd",
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "Price must be numbers",
        });
        expect(res.body.errors).toContainEqual({
          msg: "Stock must be numbers",
        });

        done();
      });
  });

  test("checking edited price cannot be < 1, and stock cannot be < 0", (done) => {
    request(app)
      .put(`/products/${product_id}`)
      .set("access_token", access_token)
      .send({
        name: "asdasd",
        image_url: "asdasd",
        category: "asdasd",
        price: 0,
        stock: -1,
      })
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);

        expect(res.body.errors).toContainEqual({
          msg: "Price cannot be lesser than one",
        });
        expect(res.body.errors).toContainEqual({
          msg: "Stock cannot be lesser than zero",
        });

        done();
      });
  });

  test("should require authentication token", (done) => {
    let editP = {
      name: "Nendoroid Ristarte",
      image_url:
        "https://goodsmileshop.com/medias/sys_master/images/images/hf3/ha8/9179941273630.jpg",
      category: "Nendoroid",
      price: 850000,
      stock: 6,
    };
    request(app)
      .put(`/products/${product_id}`)
      .send(editP)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Invalid Token" });

        done();
      });
  });

  test("should require valid token", (done) => {
    let editP = {
      name: "Nendoroid Ristarte",
      image_url:
        "https://goodsmileshop.com/medias/sys_master/images/images/hf3/ha8/9179941273630.jpg",
      category: "Nendoroid",
      price: 850000,
      stock: 6,
    };
    request(app)
      .put(`/products/${product_id}`)
      .send(editP)
      .set("access_token", "adspfoiu289p3orhwejf0dfhsjldfhsdy423ohjlk")
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(401);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Invalid Token" });

        done();
      });
  });

  test("should require authorization", (done) => {
    let editP = {
      name: "Nendoroid Ristarte",
      image_url:
        "https://goodsmileshop.com/medias/sys_master/images/images/hf3/ha8/9179941273630.jpg",
      category: "Nendoroid",
      price: 850000,
      stock: 6,
    };
    request(app)
      .put(`/products/${product_id}`)
      .set("access_token", access_token_user)
      .send(editP)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Unauthorized" });

        done();
      });
  });
});

describe("/DELETE", () => {
  test("should require authorization", (done) => {
    request(app)
      .delete(`/products/${product_id}`)
      .set("access_token", access_token_user)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(403);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Unauthorized" });

        done();
      });
  });

  test("checking for existing product id", (done) => {
    request(app)
      .delete(`/products/100`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toHaveProperty("errors");
        expect(res.body.errors).toBeInstanceOf(Array);
        expect(res.body.errors).toContainEqual({ msg: "Product not found" });

        done();
      });
  });

  test("should return confirmation", (done) => {
    request(app)
      .delete(`/products/${product_id}`)
      .set("access_token", access_token)
      .end((err, res) => {
        if (err) throw err;

        expect(res.status).toBe(200);
        expect(res.body.msg).toBe("Product deleted successfully");
        done();
      });
  });
});

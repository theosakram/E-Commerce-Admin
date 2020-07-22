# E-Commerce CMS

## URL

[Cyanide With Rice](https://kanban-bea73.web.app/)

## Route-Flows

### Login

- **Normal** <br />

  - **URL** : `/login`
  - **Method**: `POST`
  - **Success Response (at server)** : <br />

    - **Code** : `200`

    - **Content** :

      ```javascript
      {
        "msg": "User logged in ",
        "access_token": some random hashed string,
        "name": "Admin"
      }
      ```

  - **Error Response (at server)** : <br />

    - **Code** : `400`

    - **Content** :

      ```javascript
      { "msg": "User not found" }

        OR

      {"msg": "Wrong email/ password"}
      ```

      `OR`

    - **Code** : `500`

    - **Content** :

      ```javascript
      { "msg": "Internal server error" },
      ```

### Products

- **Add / Create**<br />

  - URL : `/products`
  - Method : `POST`

  - **Data Requirement**:

    - name: `string`
    - image_url: `string`
    - category: `string`
    - price: `integer`
    - stock: `integer`

  - **Headers Requirement**:

    - access_token: `string`

  - **Success Response (at server)** : <br />

    - **Code** : `201`
    - **Content** :

    ```javascript
      { "id": 1,
        "name" :  "Ristarte",
        "image_url" : "http://ajlskdalksdjalksdjklasjd.xxx",
        "category" : "Nendoroid",
        "price" : 875000,
        "stock" : 3
       }
    ```

  - **Error Response (at server)** : <br />

    - **Code** : `401`

    - **Content** :

      ```javascript
      { "msg": "Invalid Token" }
      ```

      OR

    - **Code** : `403`

    - **Content** :

      ```javascript
      { "msg": "Unauthorized" }
      ```

      OR

    - **Code** : `400`

    - **Content** :

      ```javascript
      { "msg": "Name is required" }

        OR

      { "msg": "Image URL is required" }

        OR

      { "msg": "You must give your product a price" }

        OR

      { "msg": "Stock is required to sell things" }

        OR

      { "msg": "Name is already taken" }

        OR

      { "msg": "Price must be numbers" }

        OR

      { "msg": "Stock must be numbers" }

        OR

      { "msg": "Price cannot be lesser than one" }

        OR

      { "msg": "Stock cannot be lesser than zero" }
      ```

      `OR`

    - **Code** : `500`

    - **Content** :

      ```javascript
      { "msg": "Internal server error" },
      ```

- **Get product Data** </br>

  - URL : `/produtcs`

    - Method : `GET`

    - **Success Response (at server)** : <br />

      - **Code** : `200`
      - **Content** :

        ```javascript
            {
              "id": 1,
              "name": "Ristarte",
              "image_url": "https://images.goodsmile.info/cgm/images/product/20200521/9566/70122/large/9f9596779f8d1e045ee024bae5c0928e.jpg",
              "category": "Nendoroid",
              "price": 820000,
              "stock": 3,
              "createdAt": "2020-07-22T12:55:41.398Z",
              "updatedAt": "2020-07-22T12:55:41.398Z"
            }
        ```

    - **Error Response (at server)** : <br />

    - **Code** : `401`

      - **Content** :

        ```javascript
        { "msg": "Invalid Token" },
        ```

        OR

      - **Code** : `500`

      - **Content** :

        ```javascript
        { "msg": "Internal server error" },
        ```

- **Edit** </br>

  - URL : `/products/:id`

    - Method : `PUT`

    - **Data Requirement**

      - name: `string`
      - image_url: `string`
      - category: `string`
      - price: `integer`
      - stock: `integer`

    - **Success Response (at server)** : <br />

      - **Code** : `200`
      - **Content** :

      ```javascript
        {
          "id": 1,
              "name": "Edited name",
              "image_url": "https://images.goodsmile.info/cgm/images/product/20200521/9566/70122/large/9f9596779f8d1e045ee024bae5c0928e.jpg",
              "category": "Asdjaklsdjkl",
              "price": 1,
              "stock": 2,
              "createdAt": "2020-07-22T12:55:41.398Z",
              "updatedAt": "2020-07-22T12:55:41.398Z"
         }
      ```

  - **Error Response (at server)** : <br />

    - **Code** : `401`

    - **Content** :

      ```javascript
        { "msg": "Invalid Token" }
      ```

      OR

    - **Code** : `400`

    - **Content** :

      ```javascript
      { "msg": "Name is required" }

      OR

      { "msg": "Image URL is required" }

      OR

      { "msg": "You must give your product a price" }

      OR

      { "msg": "Stock is required to sell things" }

      OR

      { "msg": "Name is already taken" }

      OR

      { "msg": "Price must be numbers" }

      OR

      { "msg": "Stock must be numbers" }

      OR

      { "msg": "Price cannot be lesser than one" }

      OR

      { "msg": "Stock cannot be lesser than zero" }
      ```

      `OR`

    - **Code** : `500`

    - **Content** :

      ```javascript
      { "msg": "Internal server error" },
      ```

- **Delete** </br>

  - URL : `/products/:id`

    - Method : `DELETE`

    - **Success Response (at server)** : <br />

      - **Code** : `200`
      - **Content** :

      ```javascript
        { "msg": "Product deleted successfully" }
      ```

    - **Error Response (at server)** : <br />


      - **Code** : `403`

      - **Content** :

        ```javascript
        { "msg": "Unauthorized" }
        ```
        OR

      - **Code** : `400`

      - **Content** :

        ```javascript
        { "msg": "Product not found" }
        ```
        OR

      - **Code** : `500`

      - **Content** :

        ```javascript
        { "msg": "Internal server error" },
        ```

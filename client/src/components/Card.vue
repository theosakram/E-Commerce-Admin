<template>
  <div class="column is-one-third" v-if="product.Category.name === category">
    <div class="card bottom">
      <div class="card-image">
        <figure>
          <img :src="product.image_url" :alt="product.name" class="image" />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ product.name }}</p>
            <p class="subtitle is-6">Rp {{ product.price }}</p>
            <p class="subtitle is-6">Available: {{ product.stock }}</p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a
          href="#"
          class="card-footer-item"
          @click.prevent="addModal(product.id, product.stock)"
          >Add</a
        >
        <a
          href="#"
          class="card-footer-item"
          @click.prevent="buyProduct(product.id, product.stock)"
          >Buy</a
        >
        <a href="#" class="card-footer-item" @click.prevent="toEditPage()"
          >Edit</a
        >
        <a
          href="#"
          class="card-footer-item"
          @click.prevent="deleteProduct(product.id)"
          >Delete</a
        >
      </footer>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Axios from "axios";

export default {
  props: ["product", "category"],
  data() {
    return {
      newP: this.product,
      editedP: [],
    };
  },
  methods: {
    deleteProduct(id) {
      this.$store
        .dispatch("DeleteProduct", id)
        .then((data) => {
          this.fetchProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ...mapActions(["fetchProducts"]),
    toEditPage(value) {
      this.$router.push({ name: "EditProduct", body: value });
    },
    addModal(id, pStock) {
      Swal.fire({
        title: "How many?",
        input: "number",
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
      }).then((result) => {
        if (result.value) {
          Axios({
            url: `https://e-cms-wyrdhn.herokuapp.com/products/${id}`,
            method: "put",
            data: {
              stock: +result.value + +pStock,
            },
            headers: {
              access_token: localStorage.access_token,
            },
          })
            .then((data) => {
              Swal.fire({
                icon: "success",
                title: `Stock added`,
              });
              this.fetchProducts();
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: `Error stock not added`,
              });
            });
        }
      });
    },
    buyProduct(id, pStock) {
      Axios({
        url: `https://e-cms-wyrdhn.herokuapp.com/products/${id}`,
        method: "put",
        data: {
          stock: +pStock - 1,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          this.fetchProducts();
          Swal.fire({
            icon: "success",
            title: `Buying successful`,
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: `Buying failed`,
          });
        });
    },
    toEditPage() {
      this.$router.push({
        name: "EditProduct",
        params: {
          id: `${this.product.id}`,
          name: `${this.product.name}`,
          image_url: `${this.product.image_url}`,
          category_id: `${this.product.category_id}. ${this.product.name}`,
          price: `${this.product.price}`,
          stock: `${this.product.stock}`,
        },
      });
    },
  },
};
</script>

<style scoped>
.bottom {
  margin-bottom: 10px;
}

.image {
  width: 100%;
  height: 65vh !important;
  object-fit: cover;
}

.card-image {
  height: 65vh !important;
}

.card {
  height: 100vh !important;
}

.card-content {
  height: 25vh;
}
</style>

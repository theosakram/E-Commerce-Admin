<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification ">
                  <h1 class="subtitle">Edit Product</h1>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input class="input" type="text" v-model="name" />
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input"
                        type="text"
                        placeholder="URL"
                        v-model="image_url"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-link"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="control">
                      <div class="select is-icon">
                        <select v-model="category_id">
                          <option
                            v-for="category in allCategories"
                            :key="category.id"
                          >
                            {{ category.id }}. {{ category.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input"
                        type="number"
                        placeholder="Price"
                        v-model="price"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-money-bill-wave"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left">
                      <input
                        class="input"
                        type="number"
                        placeholder="Stock"
                        v-model="stock"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-warehouse"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="columns">
                      <div class="column grid">
                        <p class="control">
                          <button
                            class="button has-text-white background"
                            @click.prevent="editProduct()"
                          >
                            Edit
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["product"],
  data() {
    return {
      id: `${this.$route.params.id}`,
      name: `${this.$route.params.name}`,
      image_url: `${this.$route.params.image_url}`,
      category_id: `${this.$route.params.category_id}`,
      price: `${this.$route.params.price}`,
      stock: `${this.$route.params.stock}`,
    };
  },
  methods: {
    editProduct() {
      this.$store
        .dispatch("editProduct", {
          id: this.id,
          name: this.name,
          image_url: this.image_url,
          category_id: +this.category_id[0],
          price: this.price,
          stock: this.stock,
        })
        .then((data) => {
          this.$router.push(`/category/${this.category_id.substring(3)}`);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response.statusText,
          });
        });
    },
  },
  computed: mapGetters(["allCategories"]),
  created() {
    if (this.$route.path !== "/") {
      if (!localStorage.access_token) {
        this.$router.push("/login");
      }
    }
  },
};
</script>

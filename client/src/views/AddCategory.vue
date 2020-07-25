<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification ">
                  <h1 class="subtitle">Add Category</h1>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <input
                        class="input"
                        type="text"
                        placeholder="Name"
                        v-model="name"
                      />
                      <span class="icon is-small is-left">
                        <i class="fas fa-list"></i>
                      </span>
                      <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                      </span>
                    </p>
                  </div>
                  <div class="field">
                    <div class="columns">
                      <div class="column grid">
                        <p class="control">
                          <button
                            class="button has-text-white background"
                            @click.prevent="addCategory()"
                          >
                            Add
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
  data() {
    return {
      name: "",
    };
  },
  methods: {
    addCategory() {
      this.$store
        .dispatch("AddCategory", {
          name: this.name,
        })
        .then((data) => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err.response);
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

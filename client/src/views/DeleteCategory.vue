<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification ">
                  <h1 class="subtitle">Choose category to delete</h1>
                  <div class="field">
                    <div class="control">
                      <div class="select is-icon">
                        <select v-model="name">
                          <option
                            v-for="category in allCategories"
                            :key="category.id"
                          >
                            {{ category.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field">
                    <div class="columns">
                      <div class="column grid">
                        <p class="control">
                          <button
                            class="button has-text-white background"
                            @click.prevent="deleteCategory()"
                          >
                            Delete
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
    deleteCategory() {
      let name = this.name;
      this.$store
        .dispatch("DeleteCategory", name)
        .then((data) => {
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
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

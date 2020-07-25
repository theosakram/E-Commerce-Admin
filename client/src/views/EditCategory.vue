<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="section">
          <div class="container grid-4">
            <div class="columns">
              <div class="column">
                <div class="notification ">
                  <h1 class="subtitle">Choose category to edit</h1>
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
                          <button class="button has-text-white background">
                            <a
                              @click.prevent="editCatPage()"
                              style="text-decoration:none;"
                              >Choose</a
                            >
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
    editCatPage() {
      this.$router.push({
        name: "EditCatPage",
        params: {
          name: `${this.name}`,
        },
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

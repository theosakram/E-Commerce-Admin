<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns" style="overflow: auto;">
          <BigCard
            v-for="category in allCategories"
            :key="category.id"
            :category="category"
            class="garmin"
          ></BigCard>
          <button class="button is-danger is-outlined">
            <router-link to="/addCategory" class="this-hover has-text-white"
              >Add Category</router-link
            >
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import BigCard from "../components/BigCard";

export default {
  computed: mapGetters(["allCategories"]),
  components: {
    BigCard,
  },
  methods: {
    ...mapActions(["fetchCategories"]),
  },
  created() {
    if (this.$route.path !== "/") {
      if (!localStorage.access_token) {
        this.$router.push("/login");
      }
    }

    this.fetchCategories();
  },
};
</script>

<style>
.garmin {
  margin-right: 15px;
}
</style>

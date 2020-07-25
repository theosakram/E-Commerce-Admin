<template>
  <div class="column is-one-fifth">
    <aside class="menu">
      <p class="menu-label has-text-white">
        Product
      </p>
      <ul class="menu-list">
        <li>
          <router-link to="/add" class="this-hover has-text-white"
            >Add</router-link
          >
        </li>
      </ul>
      <p class="menu-label has-text-white">
        Category
      </p>
      <ul class="menu-list has-text-white">
        <li v-for="category in allCategories" :key="category.id">
          <router-link
            :to="`/category/${category.name}`"
            class="this-hover has-text-white"
            :class="{ 'is-active': category.name === catNow }"
          >
            {{ category.name }}
          </router-link>
        </li>

        <li>
          <router-link to="/addCategory" class="this-hover has-text-white"
            >Add Category</router-link
          >
        </li>
      </ul>
      <p class="menu-label has-text-white">
        Actions
      </p>
      <ul class="menu-list">
        <li>
          <a class="this-hover has-text-white" @click.prevent="logout()"
            >Logout</a
          >
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["catNow"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["allCategories"]),
    newCategory() {
      return this.$route.params.category;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    ...mapActions(["fetchCategories"]),
    changePage() {
      this.$router.push({
        name: "Category",
        params: {
          id: `${this.category.id}`,
          name: `${this.category.name}`,
          category: `${this.category.name}`,
        },
      });
    },
  },
  created() {
    this.fetchCategories(this.newCategory);
  },
};
</script>

<style></style>

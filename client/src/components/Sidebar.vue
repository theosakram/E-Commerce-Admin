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
        <li v-for="(category, index) in allCategory" :key="index">
          <router-link
            :to="'/dashboard/' + category"
            class="this-hover has-text-white"
            v-bind:class="{ 'is-active': category === catNow }"
          >
            {{ category }}
          </router-link>
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
import { mapGetters } from "vuex";
export default {
  props: ["catNow"],
  computed: mapGetters(["allCategory"]),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>

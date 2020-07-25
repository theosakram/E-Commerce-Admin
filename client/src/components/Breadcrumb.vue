<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li>
        <router-link to="/dashboard" href="#" class="has-text-white"
          >Home</router-link
        >
      </li>
      <li>
        <a href="#" class="has-text-white"> {{ name }}</a>
      </li>
      <li>
        <a href="#" class="has-text-white"> Dashboard</a>
      </li>
      <li>
        <a href="#" class="has-text-white"> {{ newCategory }} </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.name,
      category: this.$route.params.category,
    };
  },
  computed: {
    newCategory() {
      return this.$route.params.category;
    },
  },
};
</script>

<style></style>

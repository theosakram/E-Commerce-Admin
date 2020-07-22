<template>
  <div class="column">
    <div class="notification">
      <h1 class="subtitle">
        {{ category }}
      </h1>
      <div class="columns is-multiline">
        <Card
          v-for="product in allProducts"
          :key="product.id"
          :product="product"
          :category="newCategory"
        ></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["category"],
  components: {
    Card,
  },
  data() {
    return {
      newCategory: this.category,
    };
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
  computed: mapGetters(["allProducts"]),
  created() {
    this.fetchProducts();
  },
};
</script>

<style>
.subtitle {
  word-break: normal;
}

.notification {
  text-align: center;
  display: block;
  padding: 1.5rem;
}
</style>

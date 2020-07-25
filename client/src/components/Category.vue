<template>
  <div class="column">
    <div class="notification">
      <h1 class="subtitle">
        {{ newCategory }}
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
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  props: ["category"],
  components: {
    Card,
  },
  data() {
    return {
      catNow: this.newCategory,
    };
  },
  methods: {
    ...mapActions(["fetchProducts"]),
  },
  computed: {
    ...mapGetters(["allProducts"]),
    newCategory() {
      return this.$route.params.category;
    },
    ...mapState(["tempId"]),
    newId() {
      return this.$route.params.id;
    },
  },
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

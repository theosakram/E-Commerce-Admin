<template>
  <div class="column">
    <div class="notification">
      <h1 class="subtitle">
        {{ category }}
      </h1>
      <Card></Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
export default {
  props: ["category"],
  components: {
    Card,
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

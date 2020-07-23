<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns" style="overflow: auto;">
          <BigCard
            v-for="(category, index) in allCategory"
            :key="index"
            :category="category"
            class="garmin"
          ></BigCard>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import BigCard from "../components/BigCard";

export default {
  computed: mapGetters(["allCategory"]),
  components: {
    BigCard,
  },
  created() {
    if (this.$route.path !== "/") {
      if (!localStorage.access_token) {
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style>
.garmin {
  margin-right: 15px;
}
</style>

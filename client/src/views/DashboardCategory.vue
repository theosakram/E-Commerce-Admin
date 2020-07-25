<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <Breadcrumb></Breadcrumb>
        <section class="section">
          <div class="columns" style="overflow: auto;">
            <Sidebar :catNow="newCategory"></Sidebar>
            <Category></Category>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import Category from "@/components/Category.vue";

export default {
  data() {
    return {};
  },
  computed: {
    newCategory() {
      return this.$route.params.category;
    },
  },
  components: {
    Sidebar,
    Breadcrumb,
    Category,
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

<style></style>

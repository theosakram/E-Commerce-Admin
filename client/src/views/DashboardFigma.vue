<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <Breadcrumb :category="category"></Breadcrumb>
        <section class="section">
          <div class="columns" style="overflow: auto;">
            <Sidebar :catNow="category"></Sidebar>
            <Category :category="category"></Category>
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
    return {
      category: "Figma",
    };
  },
  components: {
    Sidebar,
    Breadcrumb,
    Category,
  },
};
</script>

<style></style>

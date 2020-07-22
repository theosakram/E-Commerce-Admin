<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <Breadcrumb></Breadcrumb>
        <section class="section">
          <div class="columns" style="overflow: auto;">
            <Sidebar class="grid"></Sidebar>
            <Category
              class="grid-2"
              v-for="(category, index) in categories"
              :key="index"
              :category="category"
            ></Category>
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
      categories: ["Figma", "Funko", "Nendoroid"],
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

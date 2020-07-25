import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import LandingPage from "../views/LandingPage.vue";
import Add from "../views/AddProduct.vue";
import Dashboard from "../views/Dashboard.vue";
// import Dashboard_Nendro from "../views/DashboardNendro.vue";
// import Dashboard_Figma from "../views/DashboardFigma.vue";
// import Dashboard_Funko from "../views/DashboardFunko.vue";
// import Dashboard_PPP from "../views/DashboardPPP.vue";
import Category from "../views/DashboardCategory.vue";
import Edit from "../views/EditProduct.vue";
import AddCategory from "../views/AddCategory.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/add",
    name: "AddProduct",
    component: Add,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/edit",
    name: "EditProduct",
    component: Edit,
  },
  {
    path: "/addCategory",
    name: "AddCategory",
    component: AddCategory,
  },
  {
    path: "/category/:category",
    name: "Category",
    component: Category,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

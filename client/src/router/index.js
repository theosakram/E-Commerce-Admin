import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import LandingPage from "../views/LandingPage.vue";
import Add from "../views/AddProduct.vue";
import Dashboard from "../views/Dashboard.vue";
import Dashboard_Nendro from "../views/DashboardNendro.vue";
import Dashboard_Figma from "../views/DashboardFigma.vue";
import Dashboard_Funko from "../views/DashboardFunko.vue";
import Dashboard_PPP from "../views/DashboardPPP.vue";
import Edit from "../views/EditProduct.vue";

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
    path: "/dashboard/Nendoroid",
    name: "Dashboard-N",
    component: Dashboard_Nendro,
  },
  {
    path: "/add",
    name: "AddProduct",
    component: Add,
  },
  {
    path: "/dashboard/Figma",
    name: "Dashboard-Fi",
    component: Dashboard_Figma,
  },
  ,
  {
    path: "/dashboard/PPP",
    name: "Dashboard-P",
    component: Dashboard_PPP,
  },
  {
    path: "/dashboard/Funko",
    name: "Dashboard-Fu",
    component: Dashboard_Funko,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

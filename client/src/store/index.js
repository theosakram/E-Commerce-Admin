import Vue from "vue";
import Vuex from "vuex";
import products from "./modules/products";
import category from "./modules/category";
import login from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    products,
    category,
    login,
  },
});

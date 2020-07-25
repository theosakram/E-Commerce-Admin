import Axios from "axios";
let baseUrl = "https://e-cms-wyrdhn.herokuapp.com";

const state = {
  products: [],
};
const mutations = {
  setProducts: (state, products) => (state.products = products),
};
const actions = {
  fetchProducts: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `https://e-cms-wyrdhn.herokuapp.com/products`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          commit("setProducts", data.data);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  AddProduct: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: "https://e-cms-wyrdhn.herokuapp.com/products",
        method: "post",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  editProduct: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `https://e-cms-wyrdhn.herokuapp.com/products/${payload.id}`,
        method: "put",
        data: {
          name: payload.name,
          image_url: payload.image_url,
          category: payload.category,
          price: payload.price,
          stock: payload.stock,
        },
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  DeleteProduct: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `https://e-cms-wyrdhn.herokuapp.com/products/${payload}`,
        method: "delete",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          Swal.fire({
            icon: "success",
            title: "YES",
            text: data.data.msg,
          });
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
const getters = {
  allProducts: (state) => state.products,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

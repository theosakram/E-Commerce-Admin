import Axios from "axios";

const state = {
  categories: [],
};
const mutations = {
  setCategories: (state, categories) => (state.categories = categories),
};
const actions = {
  fetchCategories: ({ commit }) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: "https://e-cms-wyrdhn.herokuapp.com/categories",
        method: "get",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((data) => {
          commit("setCategories", data.data);
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  AddCategory: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: "https://e-cms-wyrdhn.herokuapp.com/categories",
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

  DeleteCategory: ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      Axios({
        url: `https://e-cms-wyrdhn.herokuapp.com/categories/${payload}`,
        method: "delete",
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

  EditCategory: ({ commit }, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      Axios({
        url: `https://e-cms-wyrdhn.herokuapp.com/categories/${payload.name}`,
        method: "put",
        data: {
          name2: payload.name2,
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
};
const getters = {
  allCategories: (state) => state.categories,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

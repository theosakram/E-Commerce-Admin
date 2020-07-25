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

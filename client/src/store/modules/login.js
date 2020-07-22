import Axios from "axios";

const state = {};
const mutations = {};
const actions = {
  async Login({ commit }, payload) {
    const response = await Axios.post("users/login", payload);
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("name", response.data.name);
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};

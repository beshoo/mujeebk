import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    color: "#f9f9f9",
    rtl: true,
    loginButton: null,
    logoutButton: null,
    elements: [],
    botMessage: 
    {
    "id": "JLzDgrhBCwfJoGGL8",
    "title": "",
    "endText": {},
    "endTextEnabled": true,
    "number": "1",
    "chain": {
    "id": "XD736KBocAp3SAwhC",
    "text": {
    "en": "اااااا"
    },
    "replies": [
    {
    "id": "zTTH89oSxGMK2L8Zm",
    "text": {},
    "selected": true
    }
    ]
    }
    }
  },
  mutations: {
    updateElements: (state, payload) => {
      state.elements = payload;
    },
    changeDir: (state, payload) => {
      state.rtl = payload;
    },
    restoreData: (state, payload) => {
      state.elements = payload;
    },
    addTree: state => {
      state.elements = state.elements.push();
    }
  },
  actions: {
    updateElements: ({ commit }, payload) => {
      commit("updateElements", payload);
    },
    changeDir: ({ commit }, payload) => {
      commit("changeDir", payload);
    },
    restore: ({ commit }, payload) => {
      commit("restoreData", payload);
    },
    addTree: async ({ commit }, { title }) => {
      commit("addTree", title);
    },
    removeTree: async ({ commit }, id) => {
      await axios.delete(`http://instaranker.com/test_array.php/${id}`);
      commit("removeTree", id);
    }
  },
  modules: {}
});

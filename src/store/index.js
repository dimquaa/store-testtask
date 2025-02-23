import Vue from "vue";
import Vuex from "vuex";
import cart from "./modules/cart"
import catalog from "./modules/catalog"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    course: 75,
    courseColor: ''
  },
  getters: {
    course(state) {
      return state.course
    },
    courseColor(state) {
      return state.courseColor
    }
  },
  mutations: {
    updCourse(state, value) {
      if (!isNaN(Number(value))) {
        state.courseColor = value > state.course ? 'red' : 'green'; //меняем цвет у цены при изменении курса валюты
        state.course = value
      }
    }
  },
  actions: {
    updateCourse(context, value) {
      context.commit('updCourse', value.target.value)
      context.commit('updateProductPrices', context.state.course)
    }
  },
  modules: { cart, catalog },
});

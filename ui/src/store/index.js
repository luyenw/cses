import Vuex from "vuex";
export default new Vuex.Store({
  state: {
    user: null,
    course_modules: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCourseModules(state, course_modules) {
      state.course_modules = course_modules;
    },
  },
  actions: {},
  getters: {
    isLoggedIn(state) {
      return state.user ? true : false;
    },
    user(state) {
      return state.user;
    },
    getCourseModules(state) {
      return state.course_modules;
    },
  },
});

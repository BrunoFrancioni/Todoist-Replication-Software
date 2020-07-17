import Vue from 'vue'
import Vuex from 'vuex'

import userServices from '../_services/user-services'

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export default new Vuex.Store({
  state: initialState,
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.state.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  actions: {
    async login({ commit }, user) {
      const result = await userServices.LoginUser(user);

      if(result.status === 200) {
        commit('loginSuccess', result.data.token);
        return result;
      } else {
        commit('loginFailure');
        return result;
      }
    },
    logout({ commit }) {
      userServices.LogoutUser();
      commit('logout');
    }
  },
  modules: {
  }
})

/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
export default ({
  state: {
    status: '',
    profile: {},
  },
  getters: {
    getProfile: (state) => state.profile,
    isProfileLoaded: (state) => !!state.profile.name,
  },
  mutations: {
    USER_REQUEST: (state) => {
      state.status = 'loading';
    },
    USER_SUCCESS: (state, resp) => {
      state.status = 'success';
      // To Do Profil anzeigen
      state.profile = resp.data;
    },
    USER_ERROR: (state) => {
      state.status = 'error';
    },
    AUTH_LOGOUT: (state) => {
      state.profile = {};
    },
  },
  actions: {
    USER_REQUEST: ({ commit, dispatch }, userid) => {
      commit('USER_REQUEST');
      // TO DO CALL TO GET USER
      axios.get(`http://localhost:3000/api/user/${userid}`)
        .then((resp) => {
          commit('USER_SUCCESS', resp);
        })
        .catch(() => {
          commit('USER_ERROR');
          // if resp is unauthorized, logout, to
          dispatch('AUTH_LOGOUT');
        });
    },
  },
  modules: {},
});

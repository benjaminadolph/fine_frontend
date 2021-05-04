export default ({
  state: {
    status: '',
    profile: {},
    id: '',
  },
  getters: {
    getUserProfile(state) {
      return state.profile;
    },
  },
  mutations: {
    USER_REQUEST: (state) => {
      state.status = 'loading';
    },
    USER_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.profile = resp.data;
      state.id = resp.data._id;
    },
    USER_ERROR: (state) => {
      state.status = 'error';
    },
    AUTH_LOGOUT: (state) => {
      state.profile = {};
    },
  },
  actions: {
    USER_REQUEST: async ({ commit, dispatch }, id) => {
      commit('USER_REQUEST');
      await axios.get(`http://localhost:3000/api/user/${id}`)
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

export default ({
  state: {
    status: '',
    profile: {},
    id: '',
  },
  getters: {
    getModulesSelected(state) {
      return state.profile.modulesSelected;
    },
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
    UPDATE_MODULESSELECTED: (state) => {
      state.status = 'loading';
    },
    UPDATE_MODULESSELECTED_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.profile.modulesSelected = resp.data;
    },
    UPDATE_MODULESSELECTED_ERROR: (state) => {
      state.status = 'error';
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
    UPDATE_MODULESSELECTED: async ({ commit, rootState }, req) => {
      const userid = rootState.user.id;
      commit('UPDATE_MODULESSELECTED');
      await axios.patch('http://localhost:3000/api/user/modulesSelected/', req, { params: { userid } })
        .then((resp) => {
          commit('UPDATE_MODULESSELECTED_SUCCESS', resp);
          console.log(resp);
        })
        .catch(() => {
          commit('UPDATE_MODULESSELECTED_ERROR');
        });
    },
  },
  modules: {},
});

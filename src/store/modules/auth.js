export default ({
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    AUTH_LOGIN: (state) => {
      state.status = 'loading';
    },
    AUTH_LOGIN_SUCCESS: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    AUTH_LOGIN_ERROR: (state) => {
      state.status = 'error';
    },
    AUTH_REGISTER: (state) => {
      state.status = 'loading';
    },
    AUTH_REGISTER_SUCCESS: (state) => {
      state.status = 'success';
    },
    AUTH_REGISTER_ERROR: (state) => {
      state.status = 'error';
    },
    AUTH_LOGOUT: (state) => {
      state.token = '';
    },

  },
  actions: {
    AUTH_LOGIN: async ({ commit, dispatch }, user) => {
      let id = '';
      commit('AUTH_LOGIN');
      await axios.post('http://localhost:3000/api/user/login', user)
        .then((resp) => {
          const { authtoken } = resp.data;
          id = resp.data.id;
          localStorage.setItem('user-token', authtoken); // store the token in localstorage
          axios.defaults.headers.common.Authorization = authtoken;
          commit('AUTH_LOGIN_SUCCESS', resp);
        })
        .catch((err) => {
          commit('AUTH_LOGIN_ERROR', err);
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
        });
      await dispatch('USER_REQUEST', id);
    },
    AUTH_REGISTER: async ({ commit }, user) => {
      commit('AUTH_REGISTER');
      await axios.post('http://localhost:3000/api/user/register', user)
        .then((resp) => {
          commit('AUTH_REGISTER_SUCCESS', resp);
        })
        .catch((err) => {
          commit('AUTH_REGISTER_ERROR', err);
        });
    },
    AUTH_LOGOUT: ({ commit }) => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('user-token');
    },
  },
  modules: {

  },
});

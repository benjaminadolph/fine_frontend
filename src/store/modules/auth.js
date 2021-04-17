/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
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
    AUTH_REQUEST: (state) => {
      state.status = 'loading';
    },
    AUTH_SUCCESS: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    AUTH_ERROR: (state) => {
      state.status = 'error';
    },
    AUTH_REQUEST_REGISTER: (state) => {
      state.status = 'loading';
    },
    AUTH_SUCCESS_REGISTER: (state) => {
      state.status = 'success';
    },
    AUTH_ERROR_REGISTER: (state) => {
      state.status = 'error';
    },
    AUTH_LOGOUT: (state) => {
      state.token = '';
    },

  },
  actions: {
    AUTH_REQUEST: ({ commit, dispatch }, user) => new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      commit('AUTH_REQUEST');
      axios.post('http://localhost:3000/api/user/login', user)
        .then((resp) => {
          const { token } = resp.data;
          const { userid } = resp.data;
          localStorage.setItem('user-token', token); // store the token in localstorage
          axios.defaults.headers.common.Authorization = token;
          commit('AUTH_SUCCESS', resp);
          // ToDo User Objekt zurückgeben
          dispatch('USER_REQUEST', userid);
          resolve(resp);
        })
        .catch((err) => {
          commit('AUTH_ERROR', err);
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
          reject(err);
        });
    }),
    AUTH_REGISTER: ({ commit }, user) => new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      commit('AUTH_REQUEST_REGISTER');
      axios.post('http://localhost:3000/api/user/register', user)
        .then((resp) => {
          commit('AUTH_SUCCESS_REGISTER', resp);
          resolve(resp);
        })
        .catch((err) => {
          commit('AUTH_ERROR_REGISTER', err);
          reject(err);
        });
    }),
    AUTH_LOGOUT: ({ commit }) => new Promise((resolve) => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('user-token');
      resolve();
    }),
  },
  modules: {

  },
});

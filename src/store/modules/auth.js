import { GET_USER } from '@/store/modules/user';

// action types
export const AUTH_LOGIN = 'authLogin';
export const AUTH_REGISTER = 'authRegister';
export const AUTH_LOGOUT = 'authLogout';

// mutation types
export const AUTH_LOGIN_START = 'authLoginStart';
export const AUTH_LOGIN_SUCCESS = 'authLoginSuccess';
export const AUTH_LOGIN_ERROR = 'authLoginError';
export const AUTH_REGISTER_START = 'authRegisterStart';
export const AUTH_REGISTER_SUCCESS = 'authRegisterSuccess';
export const AUTH_REGISTER_ERROR = 'authRegisterError';
export const AUTH_LOGOUT_SUCCESS = 'authLogout';

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
    [AUTH_LOGIN_START]: (state) => {
      state.status = 'loading';
    },
    [AUTH_LOGIN_SUCCESS]: (state, token) => {
      state.status = 'success';
      state.token = token;
    },
    [AUTH_LOGIN_ERROR]: (state) => {
      state.status = 'error';
    },
    [AUTH_REGISTER_START]: (state) => {
      state.status = 'loading';
    },
    [AUTH_REGISTER_SUCCESS]: (state) => {
      state.status = 'success';
    },
    [AUTH_REGISTER_ERROR]: (state) => {
      state.status = 'error';
    },
    [AUTH_LOGOUT_SUCCESS]: (state) => {
      state.token = '';
    },

  },
  actions: {
    [AUTH_LOGIN]: async ({ commit, dispatch }, user) => {
      let id = '';
      commit(AUTH_LOGIN_START);
      await axios.post('http://localhost:3000/api/auth/login', user)
        .then((resp) => {
          const { authtoken } = resp.data;
          id = resp.data.id;
          localStorage.setItem('user-token', authtoken); // store the token in localstorage
          axios.defaults.headers.common.Authorization = authtoken;
          commit(AUTH_LOGIN_SUCCESS, resp);
        })
        .catch((err) => {
          commit(AUTH_LOGIN_ERROR, err);
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
        });
      await dispatch(GET_USER, id);
    },
    [AUTH_REGISTER]: async ({ commit }, user) => {
      commit(AUTH_REGISTER_START);
      await axios.post('http://localhost:3000/api/auth/register', user)
        .then((resp) => {
          commit(AUTH_REGISTER_SUCCESS, resp);
        })
        .catch((err) => {
          commit(AUTH_REGISTER_ERROR, err);
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      localStorage.removeItem('user-token');
      delete axios.defaults.headers.common.Authorization;
      commit(AUTH_LOGOUT_SUCCESS);
    },
  },
  modules: {

  },
});

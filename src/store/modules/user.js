// action types
export const GET_USER = 'getUser';
export const UPDATE_USER_MODULESSELECTED = 'updateUserModulesSelected';
export const UPDATE_USER = 'updateUser';
export const DELETE_USER = 'deleteUser';

// mutation types
export const GET_USER_START = 'getUserStart';
export const GET_USER_SUCCESS = 'getUserSuccess';
export const GET_USER_ERROR = 'getUserError';
export const AUTH_LOGOUT = 'authLogout';
export const UPDATE_USER_MODULESSELECTED_START = 'updateUserModulesSelectedStart';
export const UPDATE_USER_MODULESSELECTED_SUCCESS = 'updateUserModulesSelectedSuccess';
export const UPDATE_USER_MODULESSELECTED_ERROR = 'updateUserModulesSelectedError';
export const UPDATE_USER_START = 'updateUserStart';
export const UPDATE_USER_SUCCESS = 'updateUserSuccess';
export const UPDATE_USER_ERROR = 'updateUserError';
export const DELETE_USER_START = 'deleteUserStart';
export const DELETE_USER_SUCCESS = 'deleteUserSuccess';
export const DELETE_USER_ERROR = 'deleteUserError';

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
    [GET_USER_START]: (state) => {
      state.status = 'loading';
    },
    [GET_USER_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.profile = resp.data;
      state.id = resp.data._id;
    },
    [GET_USER_ERROR]: (state) => {
      state.status = 'error';
    },
    [AUTH_LOGOUT]: (state) => {
      state.profile = {};
    },
    [UPDATE_USER_MODULESSELECTED_START]: (state) => {
      state.status = 'loading';
    },
    [UPDATE_USER_MODULESSELECTED_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.profile.modulesSelected = resp.data;
    },
    [UPDATE_USER_MODULESSELECTED_ERROR]: (state) => {
      state.status = 'error';
    },
    [UPDATE_USER_START]: (state) => {
      state.status = 'loading';
    },
    [UPDATE_USER_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.profile = resp.data;
    },
    [UPDATE_USER_ERROR]: (state) => {
      state.status = 'error';
    },
    [DELETE_USER_START]: (state) => {
      state.status = 'loading';
    },
    [DELETE_USER_SUCCESS]: (state) => {
      state.status = 'success';
      state.profile = {};
    },
    [DELETE_USER_ERROR]: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    [GET_USER]: async ({ commit, dispatch }, id) => {
      commit(GET_USER_START);
      await axios.get(`/api/user/${id}`)
        .then((resp) => {
          commit(GET_USER_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_USER_ERROR);
          // if resp is unauthorized, logout
          dispatch(AUTH_LOGOUT);
        });
    },
    [UPDATE_USER_MODULESSELECTED]: async ({ commit, rootState }, req) => {
      const { id } = rootState.user;
      commit(UPDATE_USER_MODULESSELECTED_START);
      await axios.patch(`/api/user/modulesSelected/${id}`, req)
        .then((resp) => {
          commit(UPDATE_USER_MODULESSELECTED_SUCCESS, resp);
          console.log(resp);
        })
        .catch(() => {
          commit(UPDATE_USER_MODULESSELECTED_ERROR);
        });
    },
    [UPDATE_USER]: async ({ commit, rootState }, req) => {
      const { id } = rootState.user;
      commit(UPDATE_USER_START);
      await axios.patch(`/api/user/${id}`, req)
        .then((resp) => {
          commit(UPDATE_USER_SUCCESS, resp);
          console.log(resp);
        })
        .catch(() => {
          commit(UPDATE_USER_ERROR);
        });
    },
    [DELETE_USER]: async ({ commit, rootState }) => {
      const { id } = rootState.user;
      commit(DELETE_USER_START);
      await axios.delete(`/api/user/${id}`)
        .then((resp) => {
          commit(DELETE_USER_SUCCESS, resp);
        })
        .catch(() => {
          commit(DELETE_USER_ERROR);
        });
    },
  },
  modules: {},
});

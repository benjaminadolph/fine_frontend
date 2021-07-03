// action types
export const GET_ALL_SYMPTOMCATEGORIES = 'getAllSymptomCategories';
export const CREATE_SYMPTOMCATEGORY = 'createSymtpomCategory';
export const DELETE_SYMPTOMCATEGORY = 'deleteSymptomCategory';
export const UPDATE_SYMPTOMCATEGORY = 'updateSymptomCategory';
export const GET_SYMPTOMCATEGORY = 'getSymptomCategory';

// mutation types
export const GET_ALL_SYMPTOMCATEGORIES_START = 'getAllSymptomCategoriesStart';
export const GET_ALL_SYMPTOMCATEGORIES_SUCCESS = 'getAllSymptomCategoriesSuccess';
export const GET_ALL_SYMPTOMCATEGORIES_ERROR = 'getAllSymptomCategoriesError';
export const CREATE_SYMPTOMCATEGORY_START = 'createSymptomCategoryStart';
export const CREATE_SYMPTOMCATEGORY_SUCCESS = 'createSymptomCategorySuccess';
export const CREATE_SYMPTOMCATEGORY_ERROR = 'createSymptomCategoryError';
export const DELETE_SYMPTOMCATEGORY_START = 'deleteSymptomCategoryStart';
export const DELETE_SYMPTOMCATEGORY_SUCCESS = 'deleteSymptomCategorySuccess';
export const DELETE_SYMPTOMCATEGORY_ERROR = 'deleteSymptomCategoryError';
export const UPDATE_SYMPTOMCATEGORY_START = 'updateSymptomCategoryStart';
export const UPDATE_SYMPTOMCATEGORY_SUCCESS = 'updateSymptomCategorySuccess';
export const UPDATE_SYMPTOMCATEGORY_ERROR = 'updateSymptomCategoryError';
export const GET_SYMPTOMCATEGORY_START = 'getSymptomCategoryStart';
export const GET_SYMPTOMCATEGORY_SUCCESS = 'getSymptomCategorySuccess';
export const GET_SYMPTOMCATEGORY_ERROR = 'getSymptomCategoryError';

export default ({
  state: {
    status: '',
    symptomCategories: [],
  },
  getters: {
    getUserSymptomCategories(state) {
      return state.symptomCategories;
    },
  },
  mutations: {
    [GET_ALL_SYMPTOMCATEGORIES_START]: (state) => {
      state.status = 'loading';
    },
    [GET_ALL_SYMPTOMCATEGORIES_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    [GET_ALL_SYMPTOMCATEGORIES_ERROR]: (state) => {
      state.status = 'error';
    },
    [CREATE_SYMPTOMCATEGORY_START]: (state) => {
      state.status = 'loading';
    },
    [CREATE_SYMPTOMCATEGORY_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptomCategories.push(resp.data);
    },
    [CREATE_SYMPTOMCATEGORY_ERROR]: (state) => {
      state.status = 'error';
    },
    [DELETE_SYMPTOMCATEGORY_START]: (state) => {
      state.status = 'loading';
    },
    [DELETE_SYMPTOMCATEGORY_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    [DELETE_SYMPTOMCATEGORY_ERROR]: (state) => {
      state.status = 'error';
    },
    [UPDATE_SYMPTOMCATEGORY_START]: (state) => {
      state.status = 'loading';
    },
    [UPDATE_SYMPTOMCATEGORY_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    [UPDATE_SYMPTOMCATEGORY_ERROR]: (state) => {
      state.status = 'error';
    },
    [GET_SYMPTOMCATEGORY_START]: (state) => {
      state.status = 'loading';
    },
    [GET_SYMPTOMCATEGORY_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    [GET_SYMPTOMCATEGORY_ERROR]: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    [GET_ALL_SYMPTOMCATEGORIES]: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit(GET_ALL_SYMPTOMCATEGORIES_START);
      await axios.get('/api/symptomCategories/', { params: { userid } })
        .then((resp) => {
          commit(GET_ALL_SYMPTOMCATEGORIES_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_ALL_SYMPTOMCATEGORIES_ERROR);
        });
    },
    [CREATE_SYMPTOMCATEGORY]: async ({ commit, rootState }, req) => {
      const symptomCategory = req;
      symptomCategory.userid = await rootState.user.id;
      commit(CREATE_SYMPTOMCATEGORY_START);
      await axios.post('/api/symptomCategories/', symptomCategory)
        .then((resp) => {
          commit(CREATE_SYMPTOMCATEGORY_SUCCESS, resp);
        })
        .catch(() => {
          commit(CREATE_SYMPTOMCATEGORY_ERROR);
        });
    },
    [DELETE_SYMPTOMCATEGORY]: async ({ commit, rootState }, req) => {
      const symptomCategoryId = req.symptomCategory_id;
      const userid = rootState.user.id;
      commit(DELETE_SYMPTOMCATEGORY_START);
      await axios.delete(`/api/symptomCategories/${symptomCategoryId}`, { params: { userid } })
        .then((resp) => {
          commit(DELETE_SYMPTOMCATEGORY_SUCCESS, resp);
        })
        .catch(() => {
          commit(DELETE_SYMPTOMCATEGORY_ERROR);
        });
    },
    [UPDATE_SYMPTOMCATEGORY]: async ({ commit, rootState }, req) => {
      const symptomCategoryId = req.symptomCategory_id;
      const userid = rootState.user.id;
      commit('UPDATE_SYMPTOMCATEGORY_START');
      await axios.patch(`/api/symptomCategories/${symptomCategoryId}`, req, { params: { userid } })
        .then((resp) => {
          commit(UPDATE_SYMPTOMCATEGORY_SUCCESS, resp);
        })
        .catch(() => {
          commit(UPDATE_SYMPTOMCATEGORY_ERROR);
        });
    },
    [GET_SYMPTOMCATEGORY]: async ({ commit }, req) => {
      const symptomCategoryId = req.symptomCategory_id;
      commit(GET_SYMPTOMCATEGORY_START);
      await axios.get(`/api/symptomCategories/${symptomCategoryId}`)
        .then((resp) => {
          commit(GET_SYMPTOMCATEGORY_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_SYMPTOMCATEGORY_ERROR);
        });
    },
  },
  modules: {},
});

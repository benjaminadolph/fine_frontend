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
    GET_ALL_SYMPTOMCATEGORIES: (state) => {
      state.status = 'loading';
    },
    GET_ALL_SYMPTOMCATEGORIES_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    GET_ALL_SYMPTOMCATEGORIES_ERROR: (state) => {
      state.status = 'error';
    },
    CREATE_SYMPTOMCATEGORY: (state) => {
      state.status = 'loading';
    },
    CREATE_SYMPTOMCATEGORY_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptomCategories.push(resp.data);
    },
    CREATE_SYMPTOMCATEGORY_ERROR: (state) => {
      state.status = 'error';
    },
    DELETE_SYMPTOMCATEGORY: (state) => {
      state.status = 'loading';
    },
    DELETE_SYMPTOMCATEGORY_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    DELETE_SYMPTOMCATEGORY_ERROR: (state) => {
      state.status = 'error';
    },
    UPDATE_SYMPTOMCATEGORY: (state) => {
      state.status = 'loading';
    },
    UPDATE_SYMPTOMCATEGORY_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    UPDATE_SYMPTOMCATEGORY_ERROR: (state) => {
      state.status = 'error';
    },
    GET_SYMPTOMCATEGORY: (state) => {
      state.status = 'loading';
    },
    GET_SYMPTOMCATEGORY_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptomCategories = resp.data;
    },
    GET_SYMPTOMCATEGORY_ERROR: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    GET_ALL_SYMPTOMCATEGORIES: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit('GET_ALL_SYMPTOMCATEGORIES');
      await axios.get('http://localhost:3000/api/symptomCategories/', { params: { userid } })
        .then((resp) => {
          commit('GET_ALL_SYMPTOMCATEGORIES_SUCCESS', resp);
        })
        .catch(() => {
          commit('GET_ALL_SYMPTOMCATEGORIES_ERROR');
        });
    },
    CREATE_SYMPTOMCATEGORY: async ({ commit, rootState }, req) => {
      const symptomCategory = req;
      symptomCategory.userid = await rootState.user.id;
      commit('CREATE_SYMPTOMCATEGORY');
      await axios.post('http://localhost:3000/api/symptomCategories/', symptomCategory)
        .then((resp) => {
          commit('CREATE_SYMPTOMCATEGORY_SUCCESS', resp);
        })
        .catch(() => {
          commit('CREATE_SYMPTOMCATEGORY_ERROR');
        });
    },
    DELETE_SYMPTOMCATEGORY: async ({ commit, rootState }, req) => {
      const symptomCategoryId = req.symptomCategory_id;
      const userid = rootState.user.id;
      commit('DELETE_SYMPTOMCATEGORY');
      await axios.delete(`http://localhost:3000/api/symptomCategories/${symptomCategoryId}`, { params: { userid } })
        .then((resp) => {
          commit('DELETE_SYMPTOMCATEGORY_SUCCESS', resp);
        })
        .catch(() => {
          commit('DELETE_SYMPTOMCATEGORY_ERROR');
        });
    },
    UPDATE_SYMPTOMCATEGORY: async ({ commit, rootState }, req) => {
      const symptomCategoryId = req.symptomCategory_id;
      const userid = rootState.user.id;
      commit('UPDATE_SYMPTOMCATEGORY');
      await axios.patch(`http://localhost:3000/api/symptomCategories/${symptomCategoryId}`, req, { params: { userid } })
        .then((resp) => {
          commit('UPDATE_SYMPTOMCATEGORY_SUCCESS', resp);
        })
        .catch(() => {
          commit('UPDATE_SYMPTOMCATEGORY_ERROR');
        });
    },
    GET_SYMPTOMCATEGORY: async ({ commit }, req) => {
      const symptomCategoryId = req.symptomCategory_id;
      commit('GET_SYMPTOMCATEGORY');
      await axios.get(`http://localhost:3000/api/symptomCategories/${symptomCategoryId}`)
        .then((resp) => {
          commit('GET_SYMPTOMCATEGORY_SUCCESS', resp);
        })
        .catch(() => {
          commit('GET_SYMPTOMCATEGORY_ERROR');
        });
    },
  },
  modules: {},
});

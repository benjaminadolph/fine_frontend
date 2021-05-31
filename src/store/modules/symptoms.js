export default ({
  state: {
    status: '',
    symptoms: [],
  },
  getters: {
    getUserSymptoms(state) {
      return state.symptoms;
    },
  },
  mutations: {
    GET_ALL_SYMPTOMS: (state) => {
      state.status = 'loading';
    },
    GET_ALL_SYMPTOMS_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    GET_ALL_SYMPTOMS_ERROR: (state) => {
      state.status = 'error';
    },
    CREATE_SYMPTOM: (state) => {
      state.status = 'loading';
    },
    CREATE_SYMPTOM_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptoms.push(resp.data);
    },
    CREATE_SYMPTOM_ERROR: (state) => {
      state.status = 'error';
    },
    DELETE_SYMPTOM: (state) => {
      state.status = 'loading';
    },
    DELETE_SYMPTOM_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    DELETE_SYMPTOM_ERROR: (state) => {
      state.status = 'error';
    },
    UPDATE_SYMPTOM: (state) => {
      state.status = 'loading';
    },
    UPDATE_SYMPTOM_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    UPDATE_SYMPTOM_ERROR: (state) => {
      state.status = 'error';
    },
    GET_SYMPTOM: (state) => {
      state.status = 'loading';
    },
    GET_SYMPTOM_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    GET_SYMPTOM_ERROR: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    GET_ALL_SYMPTOMS: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit('GET_ALL_SYMPTOMS');
      await axios.get('http://localhost:3000/api/symptoms/', { params: { userid } })
        .then((resp) => {
          commit('GET_ALL_SYMPTOMS_SUCCESS', resp);
        })
        .catch(() => {
          commit('GET_ALL_SYMPTOMS_ERROR');
        });
    },
    CREATE_SYMPTOM: async ({ commit, rootState }, req) => {
      const symptom = req;
      symptom.userid = await rootState.user.id;
      commit('CREATE_SYMPTOM');
      await axios.post('http://localhost:3000/api/symptoms/', symptom)
        .then((resp) => {
          commit('CREATE_SYMPTOM_SUCCESS', resp);
        })
        .catch(() => {
          commit('CREATE_SYMPTOM_ERROR');
        });
    },
    DELETE_SYMPTOM: async ({ commit, rootState }, req) => {
      const symptomid = req.symptom_id;
      const userid = rootState.user.id;
      commit('DELETE_SYMPTOM');
      await axios.delete(`http://localhost:3000/api/symptoms/${symptomid}`, { params: { userid } })
        .then((resp) => {
          commit('DELETE_SYMPTOM_SUCCESS', resp);
        })
        .catch(() => {
          commit('DELETE_SYMPTOM_ERROR');
        });
    },
    UPDATE_SYMPTOM: async ({ commit, rootState }, req) => {
      const symptomid = req.symptom_id;
      const userid = rootState.user.id;
      commit('UPDATE_SYMPTOM');
      await axios.patch(`http://localhost:3000/api/symptoms/${symptomid}`, req, { params: { userid } })
        .then((resp) => {
          commit('UPDATE_SYMPTOM_SUCCESS', resp);
        })
        .catch(() => {
          commit('UPDATE_SYMPTOM_ERROR');
        });
    },
    GET_SYMPTOM: async ({ commit }, req) => {
      const symptomid = req.symptom_id;
      commit('GET_SYMPTOM');
      await axios.get(`http://localhost:3000/api/symptoms/${symptomid}`)
        .then((resp) => {
          commit('GET_SYMPTOM_SUCCESS', resp);
        })
        .catch(() => {
          commit('GET_SYMPTOM_ERROR');
        });
    },
  },
  modules: {},
});

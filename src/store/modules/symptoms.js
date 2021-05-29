// action types
export const GET_ALL_SYMPTOMS = 'getAllSymptoms';
export const CREATE_SYMPTOM = 'createSymtpom';
export const DELETE_SYMPTOM = 'deleteSymptom';
export const UPDATE_SYMPTOM = 'updateSymptom';
export const GET_SYMPTOM = 'getSymptom';

// mutation types
export const GET_ALL_SYMPTOMS_START = 'getAllSymptomsStart';
export const GET_ALL_SYMPTOMS_SUCCESS = 'getAllSymptomsSuccess';
export const GET_ALL_SYMPTOMS_ERROR = 'getAllSymptomsError';
export const CREATE_SYMPTOM_START = 'createSymptomStart';
export const CREATE_SYMPTOM_SUCCESS = 'createSymptomSuccess';
export const CREATE_SYMPTOM_ERROR = 'createSymptomError';
export const DELETE_SYMPTOM_START = 'deleteSymptomStart';
export const DELETE_SYMPTOM_SUCCESS = 'deleteSymptomSuccess';
export const DELETE_SYMPTOM_ERROR = 'deleteSymptomError';
export const UPDATE_SYMPTOM_START = 'updateSymptomStart';
export const UPDATE_SYMPTOM_SUCCESS = 'updateSymptomSuccess';
export const UPDATE_SYMPTOM_ERROR = 'updateSymptomError';
export const GET_SYMPTOM_START = 'getSymptomStart';
export const GET_SYMPTOM_SUCCESS = 'getSymptomSuccess';
export const GET_SYMPTOM_ERROR = 'getSymptomError';

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
    [GET_ALL_SYMPTOMS_START]: (state) => {
      state.status = 'loading';
    },
    [GET_ALL_SYMPTOMS_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    [GET_ALL_SYMPTOMS_ERROR]: (state) => {
      state.status = 'error';
    },
    [CREATE_SYMPTOM_START]: (state) => {
      state.status = 'loading';
    },
    [CREATE_SYMPTOM_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptoms.push(resp.data);
    },
    [CREATE_SYMPTOM_ERROR]: (state) => {
      state.status = 'error';
    },
    [DELETE_SYMPTOM_START]: (state) => {
      state.status = 'loading';
    },
    [DELETE_SYMPTOM_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    [DELETE_SYMPTOM_ERROR]: (state) => {
      state.status = 'error';
    },
    [UPDATE_SYMPTOM_START]: (state) => {
      state.status = 'loading';
    },
    [UPDATE_SYMPTOM_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    [UPDATE_SYMPTOM_ERROR]: (state) => {
      state.status = 'error';
    },
    [GET_SYMPTOM_START]: (state) => {
      state.status = 'loading';
    },
    [GET_SYMPTOM_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptoms = resp.data;
    },
    [GET_SYMPTOM_ERROR]: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    [GET_ALL_SYMPTOMS]: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit(GET_ALL_SYMPTOMS_START);
      await axios.get('http://localhost:3000/api/symptoms/', { params: { userid } })
        .then((resp) => {
          commit(GET_ALL_SYMPTOMS_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_ALL_SYMPTOMS_ERROR);
        });
    },
    [CREATE_SYMPTOM]: async ({ commit, rootState }, req) => {
      const symptom = req;
      symptom.userid = await rootState.user.id;
      commit(CREATE_SYMPTOM_START);
      await axios.post('http://localhost:3000/api/symptoms/', symptom)
        .then((resp) => {
          commit(CREATE_SYMPTOM_SUCCESS, resp);
        })
        .catch(() => {
          commit(CREATE_SYMPTOM_ERROR);
        });
    },
    [DELETE_SYMPTOM]: async ({ commit, rootState }, req) => {
      const symptomid = req.symptom_id;
      const userid = rootState.user.id;
      commit(DELETE_SYMPTOM_START);
      await axios.delete(`http://localhost:3000/api/symptoms/${symptomid}`, { params: { userid } })
        .then((resp) => {
          commit(DELETE_SYMPTOM_SUCCESS, resp);
        })
        .catch(() => {
          commit(DELETE_SYMPTOM_ERROR);
        });
    },
    [UPDATE_SYMPTOM]: async ({ commit, rootState }, req) => {
      const symptomid = req.symptom_id;
      const userid = rootState.user.id;
      commit(UPDATE_SYMPTOM_START);
      await axios.patch(`http://localhost:3000/api/symptoms/${symptomid}`, req, { params: { userid } })
        .then((resp) => {
          commit(UPDATE_SYMPTOM_SUCCESS, resp);
        })
        .catch(() => {
          commit(UPDATE_SYMPTOM_ERROR);
        });
    },
    [GET_SYMPTOM]: async ({ commit }, req) => {
      const symptomid = req.symptom_id;
      commit(GET_SYMPTOM_START);
      await axios.get(`http://localhost:3000/api/symptoms/${symptomid}`)
        .then((resp) => {
          commit(GET_SYMPTOM_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_SYMPTOM_ERROR);
        });
    },
  },
  modules: {},
});

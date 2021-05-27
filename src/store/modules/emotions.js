export default ({
  state: {
    status: '',
    emotions: [],
  },
  getters: {
    getUserEmotions(state) {
      return state.emotions;
    },
  },
  mutations: {
    GET_ALL_EMOTIONS: (state) => {
      state.status = 'loading';
    },
    GET_ALL_EMOTIONS_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    GET_ALL_EMOTIONS_ERROR: (state) => {
      state.status = 'error';
    },
    CREATE_EMOTION: (state) => {
      state.status = 'loading';
    },
    CREATE_EMOTION_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.emotions.push(resp.data);
    },
    CREATE_EMOTION_ERROR: (state) => {
      state.status = 'error';
    },
    DELETE_EMOTION: (state) => {
      state.status = 'loading';
    },
    DELETE_EMOTION_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    DELETE_EMOTION_ERROR: (state) => {
      state.status = 'error';
    },
    UPDATE_EMOTION: (state) => {
      state.status = 'loading';
    },
    UPDATE_EMOTION_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    UPDATE_EMOTION_ERROR: (state) => {
      state.status = 'error';
    },
    GET_EMOTION: (state) => {
      state.status = 'loading';
    },
    GET_EMOTION_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    GET_EMOTION_ERROR: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    GET_ALL_EMOTIONS: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit('GET_ALL_EMOTIONS');
      await axios.get('http://localhost:3000/api/emotions/', { params: { userid } })
        .then((resp) => {
          commit('GET_ALL_EMOTIONS_SUCCESS', resp);
        })
        .catch(() => {
          commit('GET_ALL_EMOTIONS_ERROR');
        });
    },
    CREATE_EMOTION: async ({ commit, rootState }, req) => {
      const emotion = req;
      emotion.userid = await rootState.user.id;
      commit('CREATE_EMOTION');
      await axios.post('http://localhost:3000/api/emotions/', emotion)
        .then((resp) => {
          commit('CREATE_EMOTION_SUCCESS', resp);
        })
        .catch(() => {
          commit('CREATE_EMOTION_ERROR');
        });
    },
    DELETE_EMOTION: async ({ commit, rootState }, req) => {
      const emotionid = req.emotion_id;
      const userid = rootState.user.id;
      commit('DELETE_EMOTION');
      await axios.delete(`http://localhost:3000/api/emotions/${emotionid}`, { params: { emotionid, userid } })
        .then((resp) => {
          commit('DELETE_EMOTION_SUCCESS', resp);
        })
        .catch(() => {
          commit('DELETE_EMOTION_ERROR');
        });
    },
    UPDATE_EMOTION: async ({ commit, rootState }, req) => {
      const emotionid = req.emotion_id;
      const userid = rootState.user.id;
      commit('UPDATE_SYMPTOM');
      await axios.patch(`http://localhost:3000/api/emotions/${emotionid}`, req, { params: { userid } })
        .then((resp) => {
          commit('UPDATE_EMOTION_SUCCESS', resp);
        })
        .catch(() => {
          commit('UPDATE_EMOTION_ERROR');
        });
    },
    GET_EMOTION: async ({ commit }, req) => {
      const emotionid = req.emotion_id;
      commit('GET_EMOTION');
      await axios.get(`http://localhost:3000/api/emotions/${emotionid}`)
        .then((resp) => {
          commit('GET_EMOTION_SUCCESS', resp);
        })
        .catch(() => {
          commit('GET_EMOTION_ERROR');
        });
    },
  },
  modules: {},
});

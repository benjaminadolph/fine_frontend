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
  },
  actions: {
    GET_ALL_EMOTIONS: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      console.log(userid);
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
  },
  modules: {},
});

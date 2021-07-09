// action types
export const GET_ALL_EMOTIONS = 'getAllEmotions';
export const CREATE_EMOTION = 'createEmotion';
export const DELETE_EMOTION = 'deleteEmotion';
export const UPDATE_EMOTION = 'updateEmotion';
export const GET_EMOTION = 'getEmotion';
export const GET_LAST_EMOTION = 'getLastEmotion';

// mutation types
export const GET_ALL_EMOTIONS_START = 'getAllEmotionsStart';
export const GET_ALL_EMOTIONS_SUCCESS = 'getAllEmotionsSuccess';
export const GET_ALL_EMOTIONS_ERROR = 'getAllEmotionsError';
export const CREATE_EMOTION_START = 'createEmotionStart';
export const CREATE_EMOTION_SUCCESS = 'createEmotionSuccess';
export const CREATE_EMOTION_ERROR = 'createEmotionError';
export const DELETE_EMOTION_START = 'deleteEmotionStart';
export const DELETE_EMOTION_SUCCESS = 'deleteEmotionSuccess';
export const DELETE_EMOTION_ERROR = 'deleteEmotionError';
export const UPDATE_EMOTION_START = 'updateEmotionStart';
export const UPDATE_EMOTION_SUCCESS = 'updateEmotionSuccess';
export const UPDATE_EMOTION_ERROR = 'updateEmotionError';
export const GET_EMOTION_START = 'getEmotionStart';
export const GET_EMOTION_SUCCESS = 'getEmotionSuccess';
export const GET_EMOTION_ERROR = 'getEmotionError';
export const GET_LAST_EMOTION_START = 'getLastEmotionStart';
export const GET_LAST_EMOTION_SUCCESS = 'getLastEmotionSuccess';
export const GET_LAST_EMOTION_ERROR = 'getLastEmotionError';

export default ({
  state: {
    status: '',
    emotions: [],
    lastEmotion: {},
  },
  getters: {
    getUserEmotions(state) {
      return state.emotions;
    },
    getLastUserEmotion(state) {
      return state.lastEmotion;
    },
  },
  mutations: {
    [GET_ALL_EMOTIONS_START]: (state) => {
      state.status = 'loading';
    },
    [GET_ALL_EMOTIONS_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    [GET_ALL_EMOTIONS_ERROR]: (state) => {
      state.status = 'error';
    },
    [CREATE_EMOTION_START]: (state) => {
      state.status = 'loading';
    },
    [CREATE_EMOTION_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.symptoms.push(resp.data);
      state.latestEmotion = resp.data;
    },
    [CREATE_EMOTION_ERROR]: (state) => {
      state.status = 'error';
    },
    [DELETE_EMOTION_START]: (state) => {
      state.status = 'loading';
    },
    [DELETE_EMOTION_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    [DELETE_EMOTION_ERROR]: (state) => {
      state.status = 'error';
    },
    [UPDATE_EMOTION_START]: (state) => {
      state.status = 'loading';
    },
    [UPDATE_EMOTION_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    [UPDATE_EMOTION_ERROR]: (state) => {
      state.status = 'error';
    },
    [GET_EMOTION_START]: (state) => {
      state.status = 'loading';
    },
    [GET_EMOTION_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.emotions = resp.data;
    },
    [GET_EMOTION_ERROR]: (state) => {
      state.status = 'error';
    },
    [GET_LAST_EMOTION_START]: (state) => {
      state.status = 'loading';
    },
    [GET_LAST_EMOTION_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.lastEmotion = resp.data;
    },
    [GET_LAST_EMOTION_ERROR]: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    [GET_ALL_EMOTIONS]: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit(GET_ALL_EMOTIONS_START);
      await axios.get('/api/emotions/', { params: { userid } })
        .then((resp) => {
          commit(GET_ALL_EMOTIONS_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_ALL_EMOTIONS_ERROR);
        });
    },
    [CREATE_EMOTION]: async ({ commit, rootState }, req) => {
      const emotion = req;
      emotion.userid = await rootState.user.id;
      commit(CREATE_EMOTION_START);
      await axios.post('/api/emotions/', emotion)
        .then((resp) => {
          commit(CREATE_EMOTION_SUCCESS, resp);
        })
        .catch(() => {
          commit(CREATE_EMOTION_ERROR);
        });
    },
    [DELETE_EMOTION]: async ({ commit, rootState }, req) => {
      const emotionid = req.emotion_id;
      const userid = rootState.user.id;
      commit(DELETE_EMOTION_START);
      await axios.delete(`/api/emotions/${emotionid}`, { params: { emotionid, userid } })
        .then((resp) => {
          commit(DELETE_EMOTION_SUCCESS, resp);
        })
        .catch(() => {
          commit(DELETE_EMOTION_ERROR);
        });
    },
    [UPDATE_EMOTION]: async ({ commit, rootState }, req) => {
      const emotionid = req.emotion_id;
      const userid = rootState.user.id;
      commit(UPDATE_SYMPTOM_START);
      await axios.patch(`/api/emotions/${emotionid}`, req, { params: { userid } })
        .then((resp) => {
          commit(UPDATE_EMOTION_SUCCESS, resp);
        })
        .catch(() => {
          commit(UPDATE_EMOTION_ERROR);
        });
    },
    [GET_EMOTION]: async ({ commit }, req) => {
      const emotionid = req.emotion_id;
      commit(GET_EMOTION_START);
      await axios.get(`/api/emotions/${emotionid}`)
        .then((resp) => {
          commit(GET_EMOTION_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_EMOTION_ERROR);
        });
    },
    [GET_LAST_EMOTION]: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit(GET_LAST_EMOTION_START);
      await axios.get('/api/emotions/lastEmotionEntry', { params: { userid } })
        .then((resp) => {
          commit(GET_LAST_EMOTION_SUCCESS, resp);
        })
        .catch(() => {
          commit(GET_LAST_EMOTION_ERROR);
        });
    },
  },
  modules: {},
});

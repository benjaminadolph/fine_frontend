export default ({
  state: {
    status: '',
    posts: [],
  },
  getters: {
    getUserPosts(state) {
      return state.posts;
    },
  },
  mutations: {
    GET_ALL_POSTS: (state) => {
      state.status = 'loading';
    },
    GET_ALL_POSTS_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.posts = resp.data;
    },
    GET_ALL_POSTS_ERROR: (state) => {
      state.status = 'error';
    },
    CREATE_POST: (state) => {
      state.status = 'loading';
    },
    CREATE_POST_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.posts.push(resp.data);
    },
    CREATE_POST_ERROR: (state) => {
      state.status = 'error';
    },
    DELETE_POST: (state) => {
      state.status = 'loading';
    },
    DELETE_POST_SUCCESS: (state, resp) => {
      state.status = 'success';
      state.posts = resp.data;
    },
    DELETE_POST_ERROR: (state) => {
      state.status = 'error';
    },
  },
  actions: {
    GET_ALL_POSTS: async ({ commit, rootState }) => {
      const userid = rootState.user.id;
      commit('GET_ALL_POSTS');
      await axios.get('http://localhost:3000/posts/', { params: { userid } })
        .then((resp) => {
          commit('GET_ALL_POSTS_SUCCESS', resp);
        })
        .catch(() => {
          commit('GET_ALL_POSTS_ERROR');
        });
    },
    CREATE_POST: async ({ commit, rootState }, req) => {
      const post = req;
      post.userid = await rootState.user.id;
      commit('CREATE_POST');
      await axios.post('http://localhost:3000/posts/', post)
        .then((resp) => {
          commit('CREATE_POST_SUCCESS', resp);
        })
        .catch(() => {
          commit('CREATE_POST_ERROR');
        });
    },
    DELETE_POST: async ({ commit, rootState }, req) => {
      const postid = req.post_id;
      const userid = rootState.user.id;
      commit('DELETE_POST');
      await axios.delete(`http://localhost:3000/posts/${postid}`, { params: { postid, userid } })
        .then((resp) => {
          commit('DELETE_POST_SUCCESS', resp);
        })
        .catch(() => {
          commit('DELETE_POST_ERROR');
        });
    },
  },
  modules: {},
});

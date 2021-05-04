import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import User from './modules/user';
import Auth from './modules/auth';
import Post from './modules/post';

export default createStore({
  modules: {
    user: User,
    auth: Auth,
    post: Post,
  },
  /* plugins: [createPersistedState()], */
  plugins: [createPersistedState({
    key: 'vuex',
    reducer(val) {
      if (val.auth.token === '') { // check if usertoken is there, if not delete storage
        return {};
      }
      return val;
    },
  })],
});

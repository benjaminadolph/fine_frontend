import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import User from './modules/user';
import Auth from './modules/auth';
import Posts from './modules/posts';
import Symptoms from './modules/symptoms';
import Emotions from './modules/emotions';

export default createStore({
  modules: {
    user: User,
    auth: Auth,
    post: Posts,
    symptoms: Symptoms,
    emotions: Emotions,
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

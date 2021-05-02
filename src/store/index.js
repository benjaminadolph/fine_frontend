import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import User from './modules/user';
import Auth from './modules/auth';
import module from './modules/module';
import Post from './modules/post';

export default createStore({
  modules: {
    user: User,
    auth: Auth,
    module,
    post: Post,
  },
  plugins: [createPersistedState()],
});

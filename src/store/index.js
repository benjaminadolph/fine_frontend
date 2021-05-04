import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import User from './modules/user';
import Auth from './modules/auth';
import Post from './modules/post';
import Module from './modules/module';

export default createStore({
  modules: {
    user: User,
    auth: Auth,
    post: Post,
    module: Module,
  },
  plugins: [createPersistedState()],
});

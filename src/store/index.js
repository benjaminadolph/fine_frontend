import { createStore } from 'vuex';
import User from './modules/user';
import Auth from './modules/auth';

export default createStore({
  modules: {
    user: User,
    auth: Auth,
  },
});

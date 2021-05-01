import { createStore } from 'vuex';
import User from './modules/user';
import Auth from './modules/auth';
import module from './modules/module';

export default createStore({
  modules: {
    user: User,
    auth: Auth,
    module,
  },
});

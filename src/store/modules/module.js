import modules from '../../module.config.json';

const state = {
  modules: { modules },
};

const getters = {
  allModules: () => state.modules,
};
console.log(modules);

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};

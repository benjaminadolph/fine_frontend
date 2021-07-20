import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store'; // your vuex store

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Register.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/calendar',
    name: 'Kalender',
    component: () => import('../views/Calendar.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/statistics',
    name: 'Statistik',
    component: () => import('../views/Statistics.vue'),
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/module-entry/:module/:id',
    name: 'Module Entry Id',
    component: () => import('../components/entry/ModuleEntry.vue'),
    beforeEnter: ifAuthenticated,
    props: true,
  },
  {
    path: '/module-entry/:entryModule/:id/details',
    name: 'Symptoms Entry Details',
    component: () => import('../components/entry/SymptomsEntryDetails.vue'),
    beforeEnter: ifAuthenticated,
    props: true,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

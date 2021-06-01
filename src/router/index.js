import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
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
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated,
  },
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
    path: '/dashboard',
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
    path: '/module-entry/:module',
    name: 'Module Entry',
    component: () => import('../components/entry/ModuleEntry.vue'),
    beforeEnter: ifAuthenticated,
    props: true,
  },
  {
    path: '/module-entry/:entryModule/:id/details',
    name: 'Module Entry Details',
    component: () => import('../components/entry/ModuleEntryDetails.vue'),
    beforeEnter: ifAuthenticated,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/exampleview',
    name: 'ExampleView',
    component: () => import('../views/ExampleView.vue'),
    beforeEnter: ifAuthenticated,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

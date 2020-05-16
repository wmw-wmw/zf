import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login'
  },

  {
    name: 'login',
    path: '/login',
    component: () => import('components/login/')
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('components/home/')
  },
  {
    name: 'my',
    path: '/my',
    component: () => import('components/home/')
  }
];

const router = new VueRouter({
  routes
});

export default router;
